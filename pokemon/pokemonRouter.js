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

router.post('/', (req, res) => {
  const pokemon = new Pokemon(req.body)
  pokemon.save()
  .then(() => {
    res.status(201).json(pokemon)
  })
  .catch(err => {
    res.status(500).json({err: err.message})
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Pokemon.findByIdAndRemove(id)
  .then(() => {
    res.status(204).json({
      deleted: true
    })
    .catch(err => {
      res.status(500).json({err: err.message})
    })
  })
})
module.exports = router;