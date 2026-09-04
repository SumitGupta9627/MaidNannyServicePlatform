// Core Data Layer - Maid & Nanny Service Management Platform
// All data stored in localStorage

// Constants
const SERVICE_TYPES = ['Maid', 'Nanny', 'Babysitter', 'Cook', 'Driver', 'Cleaner', 'Caregiver', 'Elderly Care', 'Patient Care Assistant', 'Gardener', 'Housekeeper', 'Home Tutor', 'Pet Care'];
const SERVICE_CITIES = ['Aligarh', 'Delhi', 'Noida', 'Gurgaon', 'Agra', 'Lucknow', 'Ghaziabad', 'Greater Noida'];
const EXPERIENCE_LEVELS = ['Fresher', '1-2 Years', '2-5 Years', '5+ Years'];
const AVAILABILITY_OPTIONS = ['Full-time', 'Part-time', 'Flexible'];
const PLAN_TYPES = ['Hourly', 'Monthly', 'Yearly'];
const VERIFICATION_STATUSES = ['Unverified', 'Pending', 'Approved', 'Rejected'];

// localStorage Helpers
function readStore(key, fallback = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
    return false;
  }
}

// Unique ID Generation
function createId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// User Session Management
function getCurrentUser() {
  return readStore('currentUser', null);
}

function setCurrentUser(user) {
  return writeStore('currentUser', user);
}

function isLoggedIn() {
  return readStore('isLoggedIn', false);
}

function getUserRole() {
  const user = getCurrentUser();
  return user ? normalizeRole(user.role) : 'guest';
}

// Role normalization
function normalizeRole(role) {
  const roleMap = {
    'customer': 'household',
    'household_member': 'household',
    'worker': 'helper',
    'helper': 'helper',
    'admin': 'admin'
  };
  return roleMap[role] || role;
}

// Access Control
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = `login.html?next=${encodeURIComponent(window.location.href)}`;
    return false;
  }
  return true;
}

function requireRole(requiredRole) {
  if (!isLoggedIn()) {
    window.location.href = `login.html?next=${encodeURIComponent(window.location.href)}`;
    return false;
  }
  const role = getUserRole();
  if (role !== requiredRole) {
    window.location.href = 'dashboard.html';
    return false;
  }
  return true;
}

function requireAnyRole(roles) {
  if (!isLoggedIn()) {
    window.location.href = `login.html?next=${encodeURIComponent(window.location.href)}`;
    return false;
  }
  const role = getUserRole();
  if (!roles.includes(role)) {
    window.location.href = 'dashboard.html';
    return false;
  }
  return true;
}

// Sample Helpers Data (50 verified helpers)
const seedHelpers = [
  {
    id: 'hlp-001',
    name: 'Priya Sharma',
    gender: 'Female',
    serviceType: 'Maid',
    experience: '5+ Years',
    location: 'Delhi',
    availability: 'Full-time',
    phone: '9876543210',
    description: 'Experienced maid with excellent cleaning skills. Trustworthy and punctual.',
    skills: ['House Cleaning', 'Laundry', 'Cooking'],
    languages: ['Hindi', 'English'],
    verificationStatus: 'Approved',
    profileCompletion: 100,
    hourlyRate: 300,
    monthlyRate: 8000,
    yearlyRate: 90000,
    rating: 4.8,
    reviews: 127,
    joinedAt: '2023-01-15',
    documents: { aadhar: true, verification: true, background: true }
  },
  {
    id: 'hlp-002',
    name: 'Anjali Patel',
    gender: 'Female',
    serviceType: 'Nanny',
    experience: '2-5 Years',
    location: 'Noida',
    availability: 'Full-time',
    phone: '9876543211',
    description: 'Loving nanny with childcare certification. Excellent with kids of all ages.',
    skills: ['Childcare', 'Tutoring', 'Feeding'],
    languages: ['Hindi', 'English', 'Gujarati'],
    verificationStatus: 'Approved',
    profileCompletion: 100,
    hourlyRate: 350,
    monthlyRate: 10000,
    yearlyRate: 120000,
    rating: 4.9,
    reviews: 98,
    joinedAt: '2023-02-20'
  },
  {
    id: 'hlp-003',
    name: 'Meera Gupta',
    gender: 'Female',
    serviceType: 'Babysitter',
    experience: '1-2 Years',
    location: 'Gurgaon',
    availability: 'Part-time',
    phone: '9876543212',
    description: 'Friendly babysitter. Great with infants and toddlers. First aid certified.',
    skills: ['Baby Care', 'Activity Planning', 'First Aid'],
    languages: ['Hindi', 'English'],
    verificationStatus: 'Approved',
    profileCompletion: 95,
    hourlyRate: 250,
    monthlyRate: 7000,
    yearlyRate: 80000,
    rating: 4.7,
    reviews: 45,
    joinedAt: '2023-06-10'
  },
  {
    id: 'hlp-004',
    name: 'Rajesh Kumar',
    gender: 'Male',
    serviceType: 'Cook',
    experience: '5+ Years',
    location: 'Delhi',
    availability: 'Full-time',
    phone: '9876543213',
    description: 'Professional cook with expertise in Indian, Continental, and Chinese cuisines.',
    skills: ['Indian Cooking', 'Continental', 'Menu Planning'],
    languages: ['Hindi', 'English', 'Punjabi'],
    verificationStatus: 'Approved',
    profileCompletion: 100,
    hourlyRate: 400,
    monthlyRate: 12000,
    yearlyRate: 140000,
    rating: 4.9,
    reviews: 156,
    joinedAt: '2022-11-05'
  },
  {
    id: 'hlp-005',
    name: 'Neha Singh',
    gender: 'Female',
    serviceType: 'Elderly Care',
    experience: '2-5 Years',
    location: 'Agra',
    availability: 'Full-time',
    phone: '9876543214',
    description: 'Compassionate elderly care assistant. Trained in basic nursing.',
    skills: ['Patient Care', 'Medical Support', 'Companionship'],
    languages: ['Hindi', 'English'],
    verificationStatus: 'Approved',
    profileCompletion: 100,
    hourlyRate: 350,
    monthlyRate: 9500,
    yearlyRate: 110000,
    rating: 4.8,
    reviews: 89,
    joinedAt: '2023-03-15'
  },
  {
    id: 'hlp-006',
    name: 'Pooja Sharma',
    gender: 'Female',
    serviceType: 'Home Tutor',
    experience: '1-2 Years',
    location: 'Noida',
    availability: 'Flexible',
    phone: '9876543215',
    description: 'Qualified teacher offering tuition in English, Math, and Science.',
    skills: ['Math', 'English', 'Science'],
    languages: ['Hindi', 'English'],
    verificationStatus: 'Approved',
    profileCompletion: 90,
    hourlyRate: 300,
    monthlyRate: 8000,
    yearlyRate: 85000,
    rating: 4.6,
    reviews: 67,
    joinedAt: '2023-04-20'
  },
  {
    id: 'hlp-007',
    name: 'Rakesh Verma',
    gender: 'Male',
    serviceType: 'Driver',
    experience: '5+ Years',
    location: 'Gurgaon',
    availability: 'Full-time',
    phone: '9876543216',
    description: 'Experienced driver with clean driving record. Available for daily duties.',
    skills: ['Safe Driving', 'Vehicle Maintenance', 'Route Planning'],
    languages: ['Hindi', 'English'],
    verificationStatus: 'Approved',
    profileCompletion: 100,
    hourlyRate: 250,
    monthlyRate: 6000,
    yearlyRate: 70000,
    rating: 4.7,
    reviews: 112,
    joinedAt: '2023-01-10'
  },
  {
    id: 'hlp-008',
    name: 'Divya Nair',
    gender: 'Female',
    serviceType: 'Caregiver',
    experience: '2-5 Years',
    location: 'Lucknow',
    availability: 'Full-time',
    phone: '9876543217',
    description: 'Trained caregiver with experience in home-based care.',
    skills: ['Patient Care', 'Daily Living Support', 'Health Monitoring'],
    languages: ['Hindi', 'English'],
    verificationStatus: 'Approved',
    profileCompletion: 100,
    hourlyRate: 280,
    monthlyRate: 7500,
    yearlyRate: 88000,
    rating: 4.8,
    reviews: 94,
    joinedAt: '2023-05-12'
  },
  {
    id: 'hlp-009',
    name: 'Sanjana Das',
    gender: 'Female',
    serviceType: 'Maid',
    experience: '1-2 Years',
    location: 'Delhi',
    availability: 'Part-time',
    phone: '9876543218',
    description: 'Reliable maid available for part-time cleaning services.',
    skills: ['House Cleaning', 'Organizing', 'Laundry'],
    languages: ['Hindi', 'Bengali'],
    verificationStatus: 'Pending',
    profileCompletion: 75,
    hourlyRate: 250,
    monthlyRate: 6500,
    yearlyRate: 75000,
    rating: 4.5,
    reviews: 23,
    joinedAt: '2023-08-01'
  },
  {
    id: 'hlp-010',
    name: 'Kavya Reddy',
    gender: 'Female',
    serviceType: 'Gardener',
    experience: '2-5 Years',
    location: 'Hyderabad',
    availability: 'Flexible',
    phone: '9876543219',
    description: 'Expert gardener with knowledge of landscaping and plant care.',
    skills: ['Landscaping', 'Plant Care', 'Gardening'],
    languages: ['Hindi', 'Telugu', 'English'],
    verificationStatus: 'Approved',
    profileCompletion: 90,
    hourlyRate: 200,
    monthlyRate: 5000,
    yearlyRate: 60000,
    rating: 4.6,
    reviews: 76,
    joinedAt: '2023-07-15'
  },
  // Additional 40 helpers (abbreviated for space)
  ...generateAdditionalHelpers(40)
];

function generateAdditionalHelpers(count) {
  const helpers = [];
  const firstNames = ['Deepak', 'Tanvi', 'Alok', 'Sneha', 'Vikram', 'Sakshi', 'Harsh', 'Nidhi', 'Arjun', 'Bhavna'];
  const lastNames = ['Sharma', 'Singh', 'Patel', 'Kumar', 'Gupta', 'Reddy', 'Verma', 'Nair', 'Das', 'Rao'];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const serviceType = SERVICE_TYPES[Math.floor(Math.random() * SERVICE_TYPES.length)];
    const city = SERVICE_CITIES[Math.floor(Math.random() * SERVICE_CITIES.length)];
    const exp = EXPERIENCE_LEVELS[Math.floor(Math.random() * EXPERIENCE_LEVELS.length)];
    const availability = AVAILABILITY_OPTIONS[Math.floor(Math.random() * AVAILABILITY_OPTIONS.length)];
    const status = Math.random() > 0.2 ? 'Approved' : 'Pending';
    
    helpers.push({
      id: `hlp-${String(11 + i).padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      gender: Math.random() > 0.3 ? 'Female' : 'Male',
      serviceType: serviceType,
      experience: exp,
      location: city,
      availability: availability,
      phone: `98765432${String(20 + i).padStart(2, '0')}`,
      description: `Experienced ${serviceType.toLowerCase()} professional with excellent track record.`,
      skills: [serviceType, 'Reliability', 'Communication'],
      languages: ['Hindi', 'English'],
      verificationStatus: status,
      profileCompletion: status === 'Approved' ? 95 + Math.floor(Math.random() * 5) : 60 + Math.floor(Math.random() * 30),
      hourlyRate: 200 + Math.floor(Math.random() * 300),
      monthlyRate: 5000 + Math.floor(Math.random() * 10000),
      yearlyRate: 60000 + Math.floor(Math.random() * 80000),
      rating: 4.0 + Math.random() * 1.0,
      reviews: Math.floor(Math.random() * 150),
      joinedAt: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
    });
  }
  return helpers;
}

// Get all helpers (seed + registered)
function getAllHelpers() {
  const registered = readStore('registeredHelpers', []);
  const all = [...seedHelpers, ...registered];
  return all.filter(h => h.verificationStatus !== 'Rejected');
}

// Get approved helpers
function getApprovedHelpers() {
  return getAllHelpers().filter(h => h.verificationStatus === 'Approved');
}

// Bookings
function getBookings() {
  return readStore('bookings', []);
}

function getHelperBookings(helperId) {
  return getBookings().filter(b => b.helperId === helperId);
}

function getHouseholdBookings(householdId) {
  return getBookings().filter(b => b.householdId === householdId);
}

function createBooking(data) {
  const booking = {
    id: createId('bkg'),
    householdId: data.householdId,
    helperId: data.helperId,
    helperName: data.helperName,
    serviceType: data.serviceType,
    planType: data.planType, // 'Hourly', 'Monthly', 'Yearly'
    startDate: data.startDate,
    rate: data.rate,
    city: data.city,
    address: data.address,
    status: 'Pending', // Pending, Accepted, Rejected, Active, Completed, Cancelled
    createdAt: new Date().toISOString(),
    feedback: null,
    rating: null
  };
  const bookings = getBookings();
  bookings.push(booking);
  writeStore('bookings', bookings);
  return booking;
}

// Service History
function getServiceHistory() {
  return readStore('serviceHistory', []);
}

function addServiceRecord(helperId, householdId, serviceType, planType, hoursOrMonths, completedAt) {
  const history = getServiceHistory();
  history.push({
    id: createId('srv'),
    helperId: helperId,
    householdId: householdId,
    serviceType: serviceType,
    planType: planType,
    duration: hoursOrMonths,
    completedAt: completedAt,
    timestamp: new Date().toISOString()
  });
  writeStore('serviceHistory', history);
}

// Ratings & Reviews
function getRatings() {
  return readStore('ratings', []);
}

function getRatingsForHelper(helperId) {
  return getRatings().filter(r => r.helperId === helperId);
}

function addRating(helperId, householdId, rating, comment) {
  const ratings = getRatings();
  ratings.push({
    id: createId('rat'),
    helperId: helperId,
    householdId: householdId,
    rating: rating, // 1-5
    comment: comment,
    createdAt: new Date().toISOString()
  });
  writeStore('ratings', ratings);
}

// Verification Documents
function getVerificationDocuments(helperId) {
  return readStore(`docs-${helperId}`, {});
}

function saveVerificationDocuments(helperId, documents) {
  return writeStore(`docs-${helperId}`, documents);
}

// Helper Profile Creation/Update
function createHelperProfile(data) {
  const helper = {
    id: createId('hlp'),
    name: data.name,
    gender: data.gender,
    serviceType: data.serviceType,
    experience: data.experience,
    location: data.location,
    availability: data.availability,
    phone: data.phone,
    description: data.description || '',
    skills: data.skills || [],
    languages: data.languages || ['Hindi', 'English'],
    verificationStatus: 'Pending',
    profileCompletion: 60,
    hourlyRate: data.hourlyRate || 250,
    monthlyRate: data.monthlyRate || 6000,
    yearlyRate: data.yearlyRate || 70000,
    rating: 0,
    reviews: 0,
    joinedAt: new Date().toISOString().split('T')[0],
    documents: {
      aadhar: false,
      verification: false,
      background: false
    }
  };
  
  const registered = readStore('registeredHelpers', []);
  registered.push(helper);
  writeStore('registeredHelpers', registered);
  return helper;
}

// Household Profile
function getHouseholdProfile(householdId) {
  const households = readStore('households', []);
  return households.find(h => h.id === householdId) || null;
}

function createHouseholdProfile(data) {
  const household = {
    id: createId('hsd'),
    userId: data.userId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    city: data.city,
    address: data.address,
    familySize: data.familySize || 1,
    createdAt: new Date().toISOString()
  };
  
  const households = readStore('households', []);
  households.push(household);
  writeStore('households', households);
  return household;
}

// Users
function getUsers() {
  return readStore('users', []);
}

function findUserByEmail(email) {
  return getUsers().find(u => u.email === email.toLowerCase());
}

function createUser(data) {
  const user = {
    id: createId('usr'),
    name: data.name,
    email: data.email.toLowerCase(),
    password: data.password, // Note: passwords should be hashed in production
    role: data.role, // 'household' or 'helper'
    verificationStatus: data.role === 'helper' ? 'Pending' : 'Verified',
    createdAt: new Date().toISOString()
  };
  
  const users = getUsers();
  users.push(user);
  writeStore('users', users);
  return user;
}

function authenticateUser(email, password) {
  email = email.toLowerCase();
  
  // Admin check
  if (email === ADMIN_EMAIL) {
    return {
      id: 'admin-001',
      name: 'Administrator',
      email: ADMIN_EMAIL,
      role: 'admin',
      isAdmin: true
    };
  }
  
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: normalizeRole(user.role)
    };
  }
  return null;
}

// Saved/Favorites
function getSavedHelpers(householdId) {
  return readStore(`saved-${householdId}`, []);
}

function saveHelper(householdId, helperId) {
  const saved = getSavedHelpers(householdId);
  if (!saved.includes(helperId)) {
    saved.push(helperId);
    writeStore(`saved-${householdId}`, saved);
  }
}

function unsaveHelper(householdId, helperId) {
  const saved = getSavedHelpers(householdId);
  const filtered = saved.filter(id => id !== helperId);
  writeStore(`saved-${householdId}`, filtered);
}

function isHelperSaved(householdId, helperId) {
  return getSavedHelpers(householdId).includes(helperId);
}

// Complaints/Disputes
function getComplaints() {
  return readStore('complaints', []);
}

function createComplaint(data) {
  const complaint = {
    id: createId('cmp'),
    householdId: data.householdId,
    helperId: data.helperId,
    bookingId: data.bookingId,
    title: data.title,
    description: data.description,
    status: 'Open', // Open, Under Review, Resolved, Closed
    createdAt: new Date().toISOString(),
    resolution: null
  };
  
  const complaints = getComplaints();
  complaints.push(complaint);
  writeStore('complaints', complaints);
  return complaint;
}

// Admin functions
function getPendingVerifications() {
  return getAllHelpers().filter(h => h.verificationStatus === 'Pending');
}

function approveHelper(helperId) {
  const helpers = getAllHelpers();
  const helper = helpers.find(h => h.id === helperId);
  if (helper) {
    helper.verificationStatus = 'Approved';
    helper.profileCompletion = 100;
    const registered = readStore('registeredHelpers', []);
    const registered_helper = registered.find(h => h.id === helperId);
    if (registered_helper) {
      registered_helper.verificationStatus = 'Approved';
      registered_helper.profileCompletion = 100;
      writeStore('registeredHelpers', registered);
    }
  }
  return helper;
}

function rejectHelper(helperId, reason) {
  const registered = readStore('registeredHelpers', []);
  const helper = registered.find(h => h.id === helperId);
  if (helper) {
    helper.verificationStatus = 'Rejected';
    helper.rejectionReason = reason;
    writeStore('registeredHelpers', registered);
  }
  return helper;
}

// Statistics
function getStatistics() {
  const allHelpers = getAllHelpers();
  const households = readStore('households', []);
  const bookings = getBookings();
  const complaintsList = getComplaints();
  
  return {
    totalHelpers: allHelpers.length,
    approvedHelpers: allHelpers.filter(h => h.verificationStatus === 'Approved').length,
    pendingVerifications: allHelpers.filter(h => h.verificationStatus === 'Pending').length,
    totalHouseholds: households.length,
    totalBookings: bookings.length,
    activeBookings: bookings.filter(b => b.status === 'Active').length,
    completedBookings: bookings.filter(b => b.status === 'Completed').length,
    totalComplaints: complaintsList.length,
    openComplaints: complaintsList.filter(c => c.status === 'Open').length,
    resolvedComplaints: complaintsList.filter(c => c.status === 'Resolved').length
  };
}

// Helper function for showing messages
function showMessage(message, type = 'success') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 15px 20px;
    border-radius: 4px;
    z-index: 9999;
    max-width: 300px;
  `;
  document.body.appendChild(messageDiv);
  setTimeout(() => messageDiv.remove(), 3000);
}
