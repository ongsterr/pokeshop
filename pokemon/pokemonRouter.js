const express = require('express');
const Pokemon = require('./Pokemon');
const router = express.Router();

router.get('/', (req, res) => {
  Pokemon.find()
  .then(pokemon => {
    res.status(200).json(pokemon)
  })
  .catch(err => {
    res.status(500).json({error: err.message})
  })
})

module.exports = router;