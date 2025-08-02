# InternFund - Fundraising Platform

A gamified fundraising platform that allows users to track their donations, compete on leaderboards, and unlock achievements based on their fundraising milestones.

## Live Demo



## 🌟 Features

### 📊 User Dashboard
- **Personal Profile Management**: View and manage user information
- **Donation Tracking**: Add, edit, and delete donation entries with proof images
- **Real-time Statistics**: Track total amount raised with live updates
- **Referral System**: Unique referral codes for each user

### 🏆 Gamification
- **Achievement System**: Unlock badges based on fundraising milestones
  - Welcome Badge (automatic upon registration)
  - ₹500 Milestone Badge
  - Top 10 Fundraiser Badge
  - ₹1000 Champion Badge
- **Leaderboard**: Real-time ranking of all fundraisers
- **Progress Tracking**: Visual indicators for locked/unlocked rewards

### 💼 Donation Management
- **Detailed Entry System**: Record amount, details, date, and proof images
- **File Upload Support**: Attach proof images to donation entries
- **Edit/Delete Functionality**: Full CRUD operations for donation records
- **Running Totals**: Automatic calculation of total funds raised

### 🔐 Authentication
- **User Registration**: Secure signup with email validation
- **Login System**: Persistent login sessions
- **Demo Data**: Pre-populated sample users for testing

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for file uploads)

### Installation

1. **Clone or download** the project files
2. **Ensure all files are in the same directory**:
   ```
   internfund/
   ├── index.html
   ├── scripts.js
   ├── style.css
   └── image.avif (background image)
   ```

3. **Open the application**:
   - **Option 1**: Double-click `index.html` to open in your browser
   - **Option 2**: Use a local server for better file upload functionality:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     
     # Using Live Server (VS Code extension)
     Right-click index.html → "Open with Live Server"
     ```

4. **Access the application** at `http://localhost:8000` (if using local server)

## 📱 Usage

### First Time Setup
1. **Visit the application** - you'll see the login page
2. **Create an account** by clicking "Sign up here"
3. **Fill in your details** and submit the form
4. **You'll be automatically logged in** and redirected to your dashboard

### Demo Accounts
The application comes with pre-populated demo data. You can login with:
- **Email**: `alice@demo.com`, **Password**: `demo123` (₹1,250 raised)
- **Email**: `bob@demo.com`, **Password**: `demo123` (₹950 raised)
- **Email**: `carol@demo.com`, **Password**: `demo123` (₹1,800 raised)
- **Email**: `david@demo.com`, **Password**: `demo123` (₹750 raised)
- **Email**: `emma@demo.com`, **Password**: `demo123` (₹1,100 raised)

### Managing Donations
1. **Navigate to Dashboard** after logging in
2. **Scroll to "Donation Management"** section
3. **Fill in the form**:
   - Amount (required)
   - Details of how funds were raised (required)
   - Date (required)
   - Proof image (optional)
4. **Click "Add Entry"** to save
5. **View your donations** in the table below
6. **Edit or delete** entries using the action buttons

### Viewing Achievements
- **Check your progress** in the "Rewards & Unlockables" card
- **Achievements unlock automatically** based on your total raised:
  - Welcome Badge: Unlocked upon registration
  - ₹500 Milestone: Unlock when you raise ₹500+
  - Top 10 Fundraiser: Unlock when you're in top 10 on leaderboard
  - ₹1000 Champion: Unlock when you raise ₹1000+

### Leaderboard Competition
1. **Click "Leaderboard"** in the navigation
2. **View real-time rankings** of all users
3. **Your position is highlighted** in yellow
4. **Rankings update automatically** when you add donations

## 🛠️ Technical Details

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser localStorage (no server required)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Unicode emojis and symbols

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Data Storage
- All data is stored locally in browser's localStorage
- Data persists between browser sessions
- No external database or server required
- Data is automatically synced across the application

### File Structure
```
📁 Project Root
├── 📄 index.html          # Main HTML structure
├── 📄 scripts.js          # JavaScript functionality
├── 📄 style.css           # Styling and layout
├── 🖼️ image.avif          # Background image
└── 📄 README.md           # This file
```

## 🎨 Customization

### Theming
The application uses CSS custom properties for easy theming. Edit the `:root` section in `style.css`:

```css
:root {
  --primary-color: rgb(237, 7, 7);    /* Main brand color */
  --primary-dark: rgb(180, 5, 5);     /* Hover states */
  --secondary-color: #000000;          /* Secondary elements */
  --background: #ffffff;               /* Page background */
  --surface: #f8f8f8;                 /* Card backgrounds */
  /* ... more variables */
}
```

### Adding New Achievement Badges
1. **Add HTML** for new reward in the dashboard section
2. **Update the `updateRewards()` function** in `scripts.js`
3. **Define unlock conditions** based on user data

### Modifying Demo Data
Edit the `seedDemoData()` function in `scripts.js` to change default users and their donation data.

## 🔧 Development

### Key Functions
- `showPage(pageName)` - Navigation between pages
- `loadDashboard()` - Initialize dashboard data
- `addDonation()` - Handle donation form submission
- `updateTotalRaised()` - Recalculate and update totals
- `updateRewards()` - Check and unlock achievements
- `loadLeaderboard()` - Generate leaderboard rankings

### Local Storage Schema
```javascript
// Users array
users: [
  {
    id: "unique_id",
    name: "User Name",
    email: "email@example.com",
    password: "hashed_password",
    referralCode: "unique_code",
    totalRaised: 0,
    donations: [...],
    createdAt: "ISO_date_string"
  }
]

// Current user session
currentUser: { /* user object */ }
```

## 🚨 Important Notes

### Security Considerations
- **This is a demo application** - passwords are stored in plain text
- **Not suitable for production** without proper authentication
- **Local storage data** can be cleared by users
- **No server-side validation** of donation data

### Limitations
- **Single-device storage** - data doesn't sync across devices
- **No real payment processing** - this tracks donations, doesn't process them
- **No user verification** - relies on honor system for donation reporting
- **Limited to browser storage capacity** (typically 5-10MB)

## 📈 Future Enhancements

### Potential Features
- **Cloud synchronization** with Firebase or similar service
- **Payment gateway integration** for actual donation processing
- **Email notifications** for milestones and achievements
- **Social sharing** of achievements and leaderboard positions
- **Team fundraising** with group goals and competitions
- **Export functionality** for donation reports
- **Mobile app** version with responsive design improvements

### Database Migration
To convert to a server-based solution:
1. Replace localStorage calls with API endpoints
2. Implement proper user authentication (JWT tokens)
3. Add server-side validation and security
4. Use a proper database (PostgreSQL, MongoDB, etc.)

## 📞 Support

### Common Issues
- **Data not saving**: Check if localStorage is enabled in your browser
- **Images not displaying**: Ensure you're using a local server for file uploads
- **Leaderboard not updating**: Try refreshing the page or clearing browser cache
- **Login issues**: Use the demo accounts or create a new account

### Browser Storage Limits
- If you encounter storage limits, clear old data or use browser developer tools
- Access localStorage via: `Developer Tools > Application > Local Storage`

---

**InternFund** - Gamifying fundraising to make a difference! 🌟
