const expenseRoute = require('express').Router();

const expenseValidators = require('../Validators/Expense');
const expenseControllers = require('../Controllers/expenseController');
const middleware = require('../Middlewares/index');
const fileMiddleware = require('../Middlewares/files');

expenseRoute.post('/create', middleware.isAuthenticatedRequest, expenseValidators.expensePayloadValidator, expenseControllers.createNewExpense);
expenseRoute.post('/upload', middleware.isAuthenticatedRequest, fileMiddleware.fileFilter, expenseControllers.uploadFile);

expenseRoute.get('/get', middleware.isAuthenticatedRequest, expenseValidators.getExpensePayloadValidator, expenseControllers.getExpenses);

module.exports = expenseRoute;