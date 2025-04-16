# Gaming Parlour Booking System

A full-stack application for booking gaming parlours and consoles, built with React and Node.js.

## Project Structure

```
gaming-parlour-booking/
├── backend/           # Node.js/Express backend
│   ├── src/          # Source code
│   ├── routes/       # API routes
│   ├── models/       # Database models
│   ├── middleware/   # Custom middleware
│   └── package.json  # Backend dependencies
│
├── frontend/         # React frontend
│   ├── src/          # Source code
│   ├── public/       # Static files
│   └── package.json  # Frontend dependencies
│
├── .gitignore        # Git ignore rules
├── package.json      # Root project configuration
└── README.md         # Project documentation
```

## Features

- User authentication (register, login, logout)
- Browse gaming parlours
- Book gaming consoles
- View and manage bookings
- User profile management
- Admin dashboard for managing parlours and devices

## Tech Stack

### Frontend
- React.js
- Material-UI
- React Router
- Axios
- Formik & Yup
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose ODM

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gaming-parlour-booking.git
cd gaming-parlour-booking
```

2. Install all dependencies (both frontend and backend)
```bash
npm run install-all
```

3. Set up environment variables
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the values in `.env` files with your configuration

4. Start the development servers
```bash
npm start
```
This will start both the frontend and backend servers concurrently.

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Available Scripts

In the project root directory, you can run:

- `npm run install-all`: Install all dependencies for both frontend and backend
- `npm start`: Start both frontend and backend development servers
- `npm run build`: Build the frontend for production
- `npm test`: Run tests for both frontend and backend
- `npm run lint`: Run linter for both frontend and backend

## Deployment

The application can be deployed on:
- Frontend: Vercel, Netlify, or GitHub Pages
- Backend: Render, Heroku, or Railway

See the deployment guide in the project documentation for detailed instructions.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security

Please report any security issues to the project maintainers.

## Support

For support, please open an issue in the GitHub repository. 