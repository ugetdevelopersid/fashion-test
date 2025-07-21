# Stylla Fashion App

A React-based fashion app with a multi-step profile setup process.

## Features

- **Welcome Screen**: Email-only sign-in/sign-up
- **Personal Info**: First name, last name, and email collection
- **Profile Details 1/3**: Gender, age group, and measurements
- **Profile Details 2/3**: Skin tone, skin undertone, and eye color
- **Profile Details 3/3**: Hair texture, hair length, and hair color

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Welcome.js          # Welcome screen with email sign-in
│   ├── PersonalInfo.js     # Personal information form
│   ├── ProfileDetails1.js  # Profile details step 1
│   ├── ProfileDetails2.js  # Profile details step 2
│   └── ProfileDetails3.js  # Profile details step 3
├── App.js                  # Main app with routing
├── index.js               # React entry point
└── index.css              # Global styles
```

## Key Changes Made

- **Removed password field** from the welcome screen as requested
- **Email-only authentication** for a simplified sign-in process
- **Multi-step form flow** matching the UI designs shown
- **Responsive design** with clean, modern styling
- **Form validation** to ensure all required fields are completed

## Next Steps

To complete the app, you would typically:

1. Add backend integration to save user data
2. Implement proper authentication
3. Add form validation and error handling
4. Enhance the UI with better styling and animations
5. Add data persistence between form steps 