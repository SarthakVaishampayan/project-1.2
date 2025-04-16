const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const errorHandler = require('./middleware/error');
const authRoutes = require('./routes/auth');
const gamingParlourRoutes = require('./routes/gamingParlour');
const bookingRoutes = require('./routes/booking');
const userProfileRoutes = require('./routes/userProfile');
const devices = require('./routes/device');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://bookyourgame.vercel.app',
  'https://bookyourgame-git-main-sarthak-vaishampayans-projects.vercel.app',
  'https://bookyourgame-n2ynujvdb-sarthak-vaishampayans-projects.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/parlours', gamingParlourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userProfileRoutes);
app.use('/api/devices', devices);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Gaming Console Booking API' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; 