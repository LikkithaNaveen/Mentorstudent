const mongoose = require('mongoose');
const URL = process.env.MONGODB_URL;
mongoose.connect(URL)
console.log("connected")