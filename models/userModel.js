const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Role: {
        type: String,
        require:true,
        enum: ['User', 'Admin'],
        default: 'User',
    },
    userName: {
        type: String,
        required: true
    },
    userImg: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default:false
    }
});

module.exports = mongoose.model('User', UserSchema);
