const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup",
        required: true
    },
    isLoggedIn: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
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

module.exports = loginSchema;