# Maid & Nanny Service Management Platform

A complete web-based platform for connecting households with verified domestic helpers (maids, nannies, babysitters, cooks, drivers, caregivers, etc.).

## Features

### For Households (Customers)
- Browse verified helpers with detailed profiles
- Search and filter by service type, location, experience, and availability
- View helper ratings and reviews
- Book services with flexible plans (Hourly, Monthly, Yearly)
- Save favorite helpers
- Track booking history and service details
- Rate and review helpers
- Dashboard with personalized statistics

### For Helpers (Service Providers)
- Create and manage professional profiles
- Upload verification documents
- Set custom hourly, monthly, and yearly rates
- Accept or reject booking requests
- Track work history and completed services
- View customer ratings and feedback
- Manage availability and skills
- Dashboard with profile completion and verification status

### For Admin
- Verify and approve helper profiles
- Monitor all bookings and transactions
- Handle complaints and disputes
- View platform analytics and reports
- Service distribution statistics
- Real-time platform metrics

## Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (no dependencies)
- **Storage:** Browser localStorage (client-side only, no backend needed)
- **Architecture:** Single Page Application (SPA) with role-based access control
- **Responsive Design:** Mobile-first approach compatible with all devices

## Project Structure

```
unified mentor p1/
├── index.html              # Home page
├── login.html              # User login
├── register.html           # User registration
├── helpers.html            # Browse helpers
├── helper-details.html     # Helper profile
├── book-service.html       # Create booking
├── my-bookings.html        # Manage bookings
├── saved-helpers.html      # Favorite helpers
├── profile.html            # User profile management
├── dashboard.html          # User dashboard
├── work-history.html       # Helper work history
├── my-ratings.html         # Helper ratings
├── admin.html              # Admin dashboard
├── admin-verifications.html # Helper verification
├── admin-bookings.html     # All bookings management
├── admin-complaints.html   # Complaints handling
├── admin-reports.html      # Analytics & reports
├── config.js               # Configuration (Google Client ID, etc.)
├── js/
│   ├── data.js            # Core data layer & API
│   ├── auth.js            # Authentication logic
│   └── main.js            # Navigation & access control
└── css/
    └── style.css          # Complete styling
```

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local development server)

### Setup Instructions

1. **Clone/Download the Project**
   ```bash
   cd "C:\Users\[YourUsername]\OneDrive\Desktop\unified mentor p1"
   ```

2. **Start a Local Server** (Required for full functionality)
   ```bash
   python -m http.server 5500
   ```
   Or for Python 2:
   ```bash
   python -m SimpleHTTPServer 5500
   ```

3. **Open in Browser**
   ```
   http://127.0.0.1:5500/index.html
   ```

### Demo Credentials

#### Household (Customer)
- **Email:** house@example.com
- **Password:** pass123

#### Helper (Service Provider)
- **Email:** helper@example.com
- **Password:** pass123

#### Admin
- **Email:** admin@example.com
- **Password:** (any password works for demo)

## Data Storage

All data is stored in the browser's localStorage with the following keys:
- `users` - All registered users
- `households` - Household profiles
- `registeredHelpers` - Helper profiles
- `bookings` - Service bookings
- `ratings` - Ratings and reviews
- `serviceHistory` - Completed services
- `complaints` - Customer complaints
- `currentUser` - Current session
- `isLoggedIn` - Login status
- `saved-[householdId]` - Saved helper IDs

**Note:** Data persists until you clear browser cache. Each browser/device has separate data.

## Service Categories

- Maid
- Nanny
- Babysitter
- Cook
- Driver
- Cleaner
- Caregiver
- Elderly Care
- Patient Care Assistant
- Gardener
- Housekeeper
- Home Tutor
- Pet Care

## Service Plans

- **Hourly:** Per-hour service plan
- **Monthly:** Monthly subscription
- **Yearly:** Annual subscription

## User Roles

1. **Guest** - Browse helpers without login
2. **Household** - Browse, book, and manage services
3. **Helper** - Provide services and manage bookings
4. **Admin** - Manage platform and verify helpers

## Key Workflows

### Household Member Flow
1. Register as household member
2. Browse available helpers
3. View helper profiles and ratings
4. Save favorite helpers
5. Book services with selected plan
6. Manage active bookings
7. Rate and review completed services

### Helper Flow
1. Register with service details
2. Complete profile information
3. Wait for admin verification
4. Accept/reject booking requests
5. Manage work history
6. View customer ratings

### Admin Flow
1. Login with admin credentials
2. Review pending helper verifications
3. Approve or reject profiles
4. Monitor bookings and complaints
5. View platform analytics
6. Manage disputes

## Features Implemented

- ✅ User authentication (Email/Password)
- ✅ Google Identity Services integration (optional)
- ✅ Role-based access control
- ✅ Helper profile verification workflow
- ✅ Flexible service plans (Hourly/Monthly/Yearly)
- ✅ Booking management system
- ✅ Rating and review system
- ✅ Service history tracking
- ✅ Admin dashboard with analytics
- ✅ Saved helpers / favorites
- ✅ Responsive mobile design
- ✅ Complaint management
- ✅ Real-time statistics

## Optional: Enable Google Sign-In

1. Get a Google OAuth 2.0 Client ID from [Google Cloud Console](https://console.cloud.google.com)
2. Add your Client ID to `config.js`:
   ```javascript
   const GOOGLE_CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID_HERE';
   ```
3. Configure authorized origins in Google Cloud Console:
   ```
   http://127.0.0.1:5500
   ```
4. Google button will automatically appear on login page

Without a valid Client ID, the Google button is gracefully hidden.

## Development Notes

- **No Backend Required:** All data is stored client-side in localStorage
- **No Dependencies:** Uses vanilla JavaScript, no frameworks or libraries
- **Mobile Responsive:** Works seamlessly on phones, tablets, and desktops
- **Role-Based Navigation:** Menus and page access change based on user role
- **Persistent Sessions:** Login sessions persist until logout

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

- Backend database integration (MongoDB/PostgreSQL)
- Online payment processing
- Mobile native apps
- Real-time notifications
- Attendance tracking
- Multi-language support
- Video consultations
- Emergency SOS feature
- Advanced analytics and reporting

## Support & Issues

For issues or questions, refer to the inline code comments throughout the project files.

## License

This is an educational project for Unified Mentor internship program.

---

**Created:** 2024
**Platform:** Maid & Nanny Service Management
**Version:** 1.0
