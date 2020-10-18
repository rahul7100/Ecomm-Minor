const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    }
},{timestamp: true});

const user = new mongoose.model("categories", categorySchema);
module.exports = user;

