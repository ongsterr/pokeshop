const mongoose = require('../db/init');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: String,
  species: String,
  type: String,
  cp: Number,
  price: Number
});

const pokemonModel = mongoose.model('pokemon', pokemonSchema);

module.exports = pokemonModel;
