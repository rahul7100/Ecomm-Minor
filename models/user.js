const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    hash_pass: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    order: {
        type: Array,
        default: []
    }
},{timestamp: true});

const user = mongoose.model("users", userSchema);
module.exports = user;

