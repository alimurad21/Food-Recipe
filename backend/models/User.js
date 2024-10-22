const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('users', UserSchema)

module.exports = User;