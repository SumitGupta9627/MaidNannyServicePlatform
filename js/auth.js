// Authentication & Authorization
// Handles login, registration, and session management

// Decode Google JWT (frontend demo only - not cryptographically verified)
function decodeGoogleCredential(credential) {
  try {
    const base64Url = credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error decoding Google credential:', e);
    return null;
  }
}

// Initialize Google Login
function initializeGoogleLogin() {
  // Only initialize if Client ID is configured (not placeholder)
  if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
    // Remove Google button and note
    const googleBtn = document.querySelector('.google-signin-button');
    const googleNote = document.querySelector('.google-note');
    if (googleBtn) googleBtn.remove();
    if (googleNote) googleNote.remove();
    return;
  }

  if (window.google && window.google.accounts) {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCredential
    });
    
    const button = document.querySelector('.google-signin-button');
    if (button) {
      google.accounts.id.renderButton(button, {
        theme: 'outline',
        size: 'large',
        width: '300'
      });
    }
  }
}

// Handle Google credential
function handleGoogleCredential(response) {
  const payload = decodeGoogleCredential(response.credential);
  
  if (!payload || !payload.email_verified) {
    showMessage('Email not verified by Google', 'error');
    return;
  }

  let user = findUserByEmail(payload.email);
  
  if (!user) {
    // Create new user from Google
    user = createUser({
      name: payload.name || payload.email.split('@')[0],
      email: payload.email,
      password: 'google-auth', // Placeholder
      role: 'household'
    });
  }

  // Login
  completeLogin(user, {
    picture: payload.picture
  });
}

// Complete login process
function completeLogin(user, options = {}) {
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: normalizeRole(user.role || 'household'),
    isLoggedIn: true,
    picture: options.picture || null,
    loginTime: new Date().toISOString()
  };

  setCurrentUser(session);
  writeStore('isLoggedIn', true);

  // Get next page from URL or redirect by role
  const params = new URLSearchParams(window.location.search);
  const nextPage = params.get('next');

  if (session.role === 'admin') {
    window.location.href = 'admin.html';
  } else if (nextPage) {
    window.location.href = nextPage;
  } else {
    window.location.href = 'dashboard.html';
  }
}

// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
  // Load Google script
  if (document.querySelector('script[src*="accounts.google.com"]') === null) {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleLogin;
    document.head.appendChild(script);
  }

  // Email Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('login-email')?.value || '';
      const password = document.getElementById('login-password')?.value || '';

      if (!email || !password) {
        showMessage('Email and password required', 'error');
        return;
      }

      // Admin check
      if (email.toLowerCase() === ADMIN_EMAIL) {
        const session = {
          id: 'admin-001',
          name: 'Administrator',
          email: ADMIN_EMAIL,
          role: 'admin',
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        };
        setCurrentUser(session);
        writeStore('isLoggedIn', true);
        window.location.href = 'admin.html';
        return;
      }

      const user = authenticateUser(email, password);

      if (user) {
        completeLogin(user);
      } else {
        showMessage('Invalid email or password', 'error');
      }
    });
  }

  // Registration Form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('register-name')?.value || '';
      const email = document.getElementById('register-email')?.value || '';
      const password = document.getElementById('register-password')?.value || '';
      const role = document.getElementById('register-role')?.value || 'household';

      // Validation
      if (!name || !email || !password) {
        showMessage('All fields required', 'error');
        return;
      }

      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Invalid email format', 'error');
        return;
      }

      // Check if email already exists
      if (findUserByEmail(email)) {
        showMessage('Email already registered', 'error');
        return;
      }

      // Role-specific fields
      if (role === 'helper') {
        const serviceType = document.getElementById('register-service-type')?.value;
        const experience = document.getElementById('register-experience')?.value;
        
        if (!serviceType || !experience) {
          showMessage('Service type and experience required for helpers', 'error');
          return;
        }

        // Create user
        const user = createUser({
          name: name,
          email: email,
          password: password,
          role: 'helper'
        });

        // Create helper profile
        createHelperProfile({
          name: name,
          gender: document.getElementById('register-gender')?.value || 'Not specified',
          serviceType: serviceType,
          experience: experience,
          location: document.getElementById('register-location')?.value || 'Delhi',
          availability: document.getElementById('register-availability')?.value || 'Full-time',
          phone: document.getElementById('register-phone')?.value || '',
          description: document.getElementById('register-description')?.value || '',
          skills: (document.getElementById('register-skills')?.value || '').split(',').map(s => s.trim()).filter(s => s),
          languages: (document.getElementById('register-languages')?.value || 'Hindi,English').split(',').map(s => s.trim()),
          hourlyRate: parseInt(document.getElementById('register-hourly-rate')?.value) || 250,
          monthlyRate: parseInt(document.getElementById('register-monthly-rate')?.value) || 6000,
          yearlyRate: parseInt(document.getElementById('register-yearly-rate')?.value) || 70000
        });

        showMessage('Helper profile created. Awaiting verification.', 'success');
        setTimeout(() => window.location.href = 'login.html', 2000);
      } else {
        // Create household user
        const user = createUser({
          name: name,
          email: email,
          password: password,
          role: 'household'
        });

        // Create household profile
        createHouseholdProfile({
          userId: user.id,
          name: name,
          email: email,
          phone: document.getElementById('register-phone')?.value || '',
          city: document.getElementById('register-city')?.value || 'Delhi',
          address: document.getElementById('register-address')?.value || ''
        });

        showMessage('Registration successful. Please login.', 'success');
        setTimeout(() => window.location.href = 'login.html', 2000);
      }
    });
  }
});

// Logout
function logout() {
  writeStore('currentUser', null);
  writeStore('isLoggedIn', false);
  window.location.href = 'index.html';
}
