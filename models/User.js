const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema for user collection to store user when we log in with passport

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('users', userSchema);
