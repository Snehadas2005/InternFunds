# InternFund - Fundraising Platform

A gamified fundraising platform with donation tracking, leaderboards, and achievement unlocks.

**Live Demo:** [https://internfund.netlify.app/](https://internfund.netlify.app/)

## Features

- **Dashboard**: Personal profile, donation tracking, real-time statistics, referral codes
- **Gamification**: Achievement badges, leaderboard rankings, milestone rewards
- **Donation Management**: Add/edit/delete entries with proof images and running totals
- **Authentication**: User registration and login with demo accounts

### Achievement System
- Welcome Badge (automatic)
- ₹500 Milestone Badge
- Top 10 Fundraiser Badge  
- ₹1000 Champion Badge

## Quick Start

1. **Clone/download** project files
2. **Open `index.html`** in browser or use local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```
3. **Create account** or use demo login: `alice@demo.com` / `demo123`

## Demo Accounts

| Email | Password | Amount Raised |
|-------|----------|---------------|
| alice@demo.com | demo123 | ₹1,250 |
| bob@demo.com | demo123 | ₹950 |
| carol@demo.com | demo123 | ₹1,800 |
| david@demo.com | demo123 | ₹750 |
| emma@demo.com | demo123 | ₹1,100 |

## Usage

1. **Login** → Navigate to Dashboard
2. **Add Donations**: Fill form with amount, details, date, proof image
3. **Track Progress**: View achievements and leaderboard position
4. **Manage Entries**: Edit/delete donations as needed

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser localStorage
- **Compatibility**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## File Structure

```
internfund/
├── index.html          # Main application
├── scripts.js          # Core functionality  
├── style.css           # Styling
└── image.avif          # Background image
```

## Customization

Edit CSS variables in `style.css`:
```css
:root {
  --primary-color: rgb(237, 7, 7);
  --primary-dark: rgb(180, 5, 5);
  /* ... more variables */
}
```

## Important Notes

⚠️ **Demo Application** - Not production-ready
- Passwords stored in plain text
- Data limited to browser localStorage
- No server-side validation
- Honor system for donation reporting

## Future Enhancements

- Cloud synchronization
- Payment gateway integration
- Mobile app version
- Team fundraising features
- Export functionality

---

**InternFund** - Gamifying fundraising to make a difference! 🌟
