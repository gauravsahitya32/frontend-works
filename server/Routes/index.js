const router = require('express').Router();

const signupRoute = require('./signupRoute');
const loginRoute = require('./loginRoute');
const expenseRoute = require('./expenseRoute');

router.use('/user', signupRoute);
router.use('/account', loginRoute);
router.use('/expense', expenseRoute);

module.exports = router;