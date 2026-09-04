// Main Navigation & Access Control

document.addEventListener('DOMContentLoaded', function() {
  const user = getCurrentUser();
  const role = user ? normalizeRole(user.role) : 'guest';

  // Navigation by role
  const navByRole = {
    guest: `
      <nav class="navbar">
        <div class="nav-left">
          <a href="index.html" class="logo">Maid & Nanny</a>
          <button class="menu-toggle" onclick="document.querySelector('nav').classList.toggle('active')">☰</button>
        </div>
        <div class="nav-menu">
          <a href="index.html">Home</a>
          <a href="helpers.html">Browse Helpers</a>
          <a href="login.html" class="login-link">Login</a>
        </div>
      </nav>
    `,
    household: `
      <nav class="navbar">
        <div class="nav-left">
          <a href="index.html" class="logo">Maid & Nanny</a>
          <button class="menu-toggle" onclick="document.querySelector('nav').classList.toggle('active')">☰</button>
        </div>
        <div class="nav-menu">
          <a href="index.html">Home</a>
          <a href="helpers.html">Browse Helpers</a>
          <a href="my-bookings.html">My Bookings</a>
          <a href="saved-helpers.html">Saved Helpers</a>
          <a href="dashboard.html">Dashboard</a>
          <a href="profile.html">Profile</a>
          <a href="#" class="login-link" onclick="logout(); return false;">Logout</a>
        </div>
      </nav>
    `,
    helper: `
      <nav class="navbar">
        <div class="nav-left">
          <a href="index.html" class="logo">Maid & Nanny</a>
          <button class="menu-toggle" onclick="document.querySelector('nav').classList.toggle('active')">☰</button>
        </div>
        <div class="nav-menu">
          <a href="index.html">Home</a>
          <a href="my-bookings.html">My Bookings</a>
          <a href="work-history.html">Work History</a>
          <a href="dashboard.html">Dashboard</a>
          <a href="profile.html">Profile</a>
          <a href="#" class="login-link" onclick="logout(); return false;">Logout</a>
        </div>
      </nav>
    `,
    admin: `
      <nav class="navbar">
        <div class="nav-left">
          <a href="index.html" class="logo">Maid & Nanny</a>
          <button class="menu-toggle" onclick="document.querySelector('nav').classList.toggle('active')">☰</button>
        </div>
        <div class="nav-menu">
          <a href="admin.html">Admin Dashboard</a>
          <a href="admin-verifications.html">Verifications</a>
          <a href="admin-bookings.html">Bookings</a>
          <a href="admin-complaints.html">Complaints</a>
          <a href="admin-reports.html">Reports</a>
          <a href="#" class="login-link" onclick="logout(); return false;">Logout</a>
        </div>
      </nav>
    `
  };

  // Insert navigation
  const navContainer = document.querySelector('nav') || document.body;
  if (!document.querySelector('nav')) {
    navContainer.insertAdjacentHTML('afterbegin', navByRole[role] || navByRole.guest);
  }

  // Page role requirements
  const pageRoles = {
    'dashboard': ['household', 'helper', 'admin'],
    'profile': ['household', 'helper'],
    'my-bookings': ['household', 'helper'],
    'saved-helpers': ['household'],
    'work-history': ['helper'],
    'admin': ['admin'],
    'admin-verifications': ['admin'],
    'admin-bookings': ['admin'],
    'admin-complaints': ['admin'],
    'admin-reports': ['admin'],
    'booking-details': ['household', 'helper'],
    'helpers': ['guest', 'household']
  };

  // Check page access
  const currentPageElement = document.querySelector('[data-page]');
  if (currentPageElement) {
    const pageName = currentPageElement.dataset.page;
    const requiredRoles = pageRoles[pageName];

    if (requiredRoles && !requiredRoles.includes(role)) {
      if (!isLoggedIn()) {
        window.location.href = `login.html?next=${encodeURIComponent(window.location.href)}`;
      } else {
        window.location.href = 'dashboard.html';
      }
    }
  }

  // Protect elements with data-auth-required
  document.querySelectorAll('[data-auth-required]').forEach(el => {
    el.addEventListener('click', function(e) {
      if (!isLoggedIn()) {
        e.preventDefault();
        window.location.href = `login.html?next=${encodeURIComponent(window.location.href)}`;
      }
    });
  });

  // Mobile menu toggle
  document.querySelectorAll('.menu-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      const nav = this.closest('nav');
      if (nav) {
        nav.classList.toggle('active');
      }
    });
  });
});
