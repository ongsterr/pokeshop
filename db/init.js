const mongoose = require('mongoose');

const url = 'mongodb://localhost/pokeshop';

mongoose.connect(url);

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('established connection to mogodb');
})

module.exports = mongoose;