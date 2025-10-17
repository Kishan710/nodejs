const mongoose = require('mongoose');
const MONGOURI = process.env.MONGOURI || 'mongodb://127.0.0.1:27017/movie_manager';

async function connectDB(){
  await mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB connected');
}

module.exports = { connectDB };
