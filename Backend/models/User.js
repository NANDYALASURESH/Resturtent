const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true }, // optional but recommended
  phone: String,
  address: String,
  password: String
});

// ✅ This registers the model and gives it all the Mongoose methods like findOne, findById, etc.
module.exports = mongoose.model('User', userSchema);
