require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

const db = mongoose.model('db', {
    input: String
});

module.exports = db;