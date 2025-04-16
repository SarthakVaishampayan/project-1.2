# Gaming Parlour Booking System

A full-stack application for booking gaming parlours and consoles, built with React and Node.js.

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

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the values in `.env` files with your configuration

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

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