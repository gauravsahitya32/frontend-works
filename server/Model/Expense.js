const mongoose = require('mongoose');

const expenseSchema = require('../Schema/Expense');

const Expense = new mongoose.model("Expense", expenseSchema);

module.exports = Expense;