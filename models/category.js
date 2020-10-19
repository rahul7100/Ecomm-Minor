const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    }
},{timestamps: true});

const user = mongoose.model("categories", categorySchema);
module.exports = user;

