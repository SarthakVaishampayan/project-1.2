const mongoose = require('mongoose');

const GamingParlourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price per hour']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  numReviews: {
    type: Number,
    default: 0
  },
  images: [{
    type: String
  }],
  consoles: [{
    type: String,
    required: [true, 'Please provide at least one console']
  }],
  amenities: [{
    type: String
  }],
  availability: {
    monday: { open: Boolean, start: String, end: String },
    tuesday: { open: Boolean, start: String, end: String },
    wednesday: { open: Boolean, start: String, end: String },
    thursday: { open: Boolean, start: String, end: String },
    friday: { open: Boolean, start: String, end: String },
    saturday: { open: Boolean, start: String, end: String },
    sunday: { open: Boolean, start: String, end: String }
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GamingParlour', GamingParlourSchema); 