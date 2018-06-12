const express = require('express');
const bodyParser = require('body-parser');
const pokemonRouter = require('./pokemon/pokemonRouter');

const app = express();

app.use(bodyParser.json());

app.use('/pokemon', pokemonRouter);

app.get('/', (req, res) => {
  res.redirect('/pokemon');
})



app.listen(3000, () => {
  console.log("Express server listening on port 3000 :D");
})