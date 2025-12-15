const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String, // hash later
});

module.exports = mongoose.model('Admin', adminSchema);
