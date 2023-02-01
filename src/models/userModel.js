const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        trim: false,
        lowercase: false,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },

    token: { type: String },
    role: { type: String, required: true, enum: ['USER', 'SUPER ADMIN'] }
})

module.exports = mongoose.model("User", userSchema)