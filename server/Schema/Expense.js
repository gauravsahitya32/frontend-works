const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Signup`,
        required: true
    },
    expense_title: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    expense_amount: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    expense_category: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    budget: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    photo_url: {
        type: mongoose.Schema.Types.String,
        default: `none`
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    }
});

module.exports = expenseSchema;