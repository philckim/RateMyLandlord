const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'manager',
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  properties: [
      {
          propertyType: {
              type: Enumerator,
              required: true 
          },
          streetAddress: {
              type: String,
              required: true
          },
          city: {
              type: String,
              required: true
          },
          state: {
              type: Enumerator,
              required: true
          },
          zipCode: {
              type: Int8Array,
              required: true
          }
      }
  ],
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  }
});

module.exports = mongoose.model('profile', ProfileSchema);