const mongoose = require('mongoose');
const signupSchema = require('../Schema/Signup');

const Signup = new mongoose.model(`Signup`, signupSchema);

module.exports = Signup;