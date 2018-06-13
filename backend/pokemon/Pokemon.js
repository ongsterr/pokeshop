const mongoose = require('../db/init');
const Schema = mongoose.Schema;
const fetch = require('node-fetch');

const pokemonSchema = new Schema({
  name: String,
  species: String,
  type: Array,
  sprite: String,
  cp: Number,
  price: Number
});

pokemonSchema.pre('save', async function (next) {
  if (this.isNew) {
    const species = this.species;
    const url = `https://pokeapi.bastionbot.org/v1/pokemon/${species}`;
    await fetch(url)
      .then(res => res.json())
      .then(json => {
        this.type = json[0].types;
        this.sprite = json[0].sprite;
      })
      .catch(err => console.log(err))
  };
  next();
});

const pokemonModel = mongoose.model('pokemon', pokemonSchema);

module.exports = pokemonModel;