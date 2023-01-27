const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

exports.connectDB = () => mongoose.connect(process.env.LOCAL_DB_URI);
