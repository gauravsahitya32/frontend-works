const mongoose = require('mongoose');
const loginSchema = require('../Schema/Login');

const Login = new mongoose.model(`Login`, loginSchema);

module.exports = Login;