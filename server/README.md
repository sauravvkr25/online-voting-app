# Voting System Server

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=4000
   DATABASE=mongodb://localhost:27017/voting-system
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

3. Make sure MongoDB is running on your system

4. Run the development server:
   ```bash
   npm run dev
   ```

5. To seed the database with sample data:
   ```bash
   npm run seed
   ```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/polls` - Get all polls
- `POST /api/polls` - Create a new poll (requires auth)
- `GET /api/polls/:id` - Get a specific poll
- `POST /api/polls/:id` - Vote on a poll (requires auth)
- `DELETE /api/polls/:id` - Delete a poll (requires auth) 