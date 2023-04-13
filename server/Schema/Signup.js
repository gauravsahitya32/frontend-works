const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
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

module.exports = signupSchema;