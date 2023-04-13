const signupRoute = require('express').Router();
const signupController = require('../Controllers/signupController');
const signupValidator = require('../Validators/Signup');

signupRoute.post('/signup', signupValidator.signupValidator, signupController.signupUser);

module.exports = signupRoute;