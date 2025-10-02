# Community Platform

A full-stack community platform built with React (frontend) and Node.js/Express (backend) with MySQL database.

## Features

- User authentication (register/login)
- Create and view community problems
- Add solutions to problems
- Upvote solutions
- Comment system
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios for API calls
- Tailwind CSS for styling
- Vite for build tooling

### Backend
- Node.js with Express
- Sequelize ORM
- MySQL database
- JWT authentication
- bcryptjs for password hashing

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=community_platform
JWT_SECRET=your_jwt_secret_key
```

4. Create the MySQL database:
```sql
CREATE DATABASE community_platform;
```

5. Start the development servers:

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

## Deployment on Vercel

### Prerequisites
- Vercel account
- GitHub repository
- MySQL database (you can use PlanetScale, Railway, or any cloud MySQL provider)

### Steps

1. **Prepare your database:**
   - Set up a cloud MySQL database (PlanetScale, Railway, etc.)
   - Note down the connection details

2. **Update the API base URL:**
   - In `frontend/src/api/api.js`, replace `'https://your-vercel-app.vercel.app'` with your actual Vercel app URL

3. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the `vercel.json` configuration
   - Set up environment variables in Vercel dashboard:
     - `DB_HOST`: Your database host
     - `DB_USER`: Your database username
     - `DB_PASS`: Your database password
     - `DB_NAME`: Your database name
     - `JWT_SECRET`: Your JWT secret key
     - `NODE_ENV`: production

4. **Deploy:**
   - Push your code to GitHub
   - Vercel will automatically build and deploy your application

### Environment Variables for Production

In your Vercel dashboard, add these environment variables:

```
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASS=your_production_db_password
DB_NAME=your_production_db_name
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

### Important Notes

- The application uses a monorepo structure with both frontend and backend
- The `vercel.json` file configures routing to handle both API calls and frontend routes
- Make sure your database allows connections from Vercel's IP ranges
- The frontend will automatically use the production API URL when deployed

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get a specific problem
- `POST /api/problems` - Create a new problem (requires auth)

### Solutions
- `GET /api/problems/:problemId/solutions` - Get solutions for a problem
- `POST /api/problems/:problemId/solutions` - Add a solution (requires auth)
- `POST /api/solutions/:solutionId/upvote` - Upvote a solution (requires auth)

### Comments
- `GET /api/comments/:solutionId` - Get comments for a solution
- `POST /api/comments` - Add a comment (requires auth)

## Project Structure

```
PRO/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── vercel.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.