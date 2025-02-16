const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  address: String,
  coordinates: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  deliveryRange: Number, // in meters
});

locationSchema.index({ coordinates: '2dsphere' }); // Create a 2dsphere index

const Location = mongoose.model('Location', locationSchema);