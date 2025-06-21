# Online Voting System

A modern, full-stack online voting application built with React 18, Node.js, Express, and MongoDB.

## Features

- 🔐 User authentication with JWT
- 📊 Real-time poll creation and voting
- 📈 Interactive charts and statistics
- 🎨 Modern, responsive UI
- 🔒 Secure voting system
- 📱 Mobile-friendly design

## Tech Stack

### Frontend
- React 18 with Hooks
- Redux for state management
- React Router v6 for navigation
- Chart.js v4 for data visualization
- FontAwesome for icons
- Modern CSS with custom properties

### Backend
- Node.js with Express
- MongoDB with Mongoose v7
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd online-voting-system
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=4000
   DATABASE=mongodb://localhost:27017/voting-system
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the DATABASE URL in the `.env` file.

## Running the Application

### Development Mode
```bash
# Start both client and server concurrently
npm run dev

# Or start them separately
npm run server  # Starts the backend server
npm run client  # Starts the React development server
```

### Production Build
```bash
npm run build
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Polls
- `GET /api/polls` - Get all polls
- `POST /api/polls` - Create a new poll (requires auth)
- `GET /api/polls/:id` - Get a specific poll
- `POST /api/polls/:id` - Vote on a poll (requires auth)
- `DELETE /api/polls/:id` - Delete a poll (requires auth)

## Recent Fixes Applied

### Security & Dependencies
- ✅ Updated React from v16 to v18
- ✅ Updated React Router from v4 to v6
- ✅ Updated Chart.js from v2 to v4
- ✅ Updated all dependencies to latest secure versions
- ✅ Fixed JWT decode usage for v3
- ✅ Removed incorrect unique constraint from password field

### Backend Improvements
- ✅ Updated Mongoose from v5 to v7
- ✅ Fixed deprecated pre-remove middleware
- ✅ Improved database connection with error handling
- ✅ Added proper environment configuration

### Frontend Improvements
- ✅ Updated React rendering to use createRoot API
- ✅ Fixed Chart.js component registration
- ✅ Updated React Router syntax for v6
- ✅ Added proper error boundaries

### Development Experience
- ✅ Added concurrent development scripts
- ✅ Improved project structure
- ✅ Added comprehensive documentation
- ✅ Added proper environment setup instructions

## Project Structure

```
online-voting-system/
├── client/                 # React frontend
│   ├── public/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   ├── services/      # API services
│   │   └── styles/        # CSS files
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── handlers/          # Route handlers
│   ├── middleware/        # Custom middleware
│   └── package.json
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## About Me

I'm Saurabh,a BCA student studying Computer Science at LN Mishra College, Muzaffarpur with an active interest in building web application and competetive programming. Do checkout my portfolio and connect with me on LinkedIn.

### Connect with me :

[![gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sk09608425982@gmail.com)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/saurav-kumar-44649a2b8)