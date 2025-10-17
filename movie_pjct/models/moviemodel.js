const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String },
  image: { type: String }
}, { timestamps: true });

const moviemodel = mongoose.model('Movie', movieSchema);
module.exports = { moviemodel };
