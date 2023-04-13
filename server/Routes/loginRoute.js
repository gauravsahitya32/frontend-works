const logiRoutes = require('express').Router();
const loginController = require('../Controllers/loginController');
const Middlewares = require('../Middlewares/index');

logiRoutes.post('/login', loginController.loginUser);
logiRoutes.post('/logout', Middlewares.isAuthenticatedRequest, loginController.logoutUser);
logiRoutes.post('/verify', loginController.verifyAccount);

logiRoutes.get('/refresh', loginController.tokenRefresher);

module.exports = logiRoutes;