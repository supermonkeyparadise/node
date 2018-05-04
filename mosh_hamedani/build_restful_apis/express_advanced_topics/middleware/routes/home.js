const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  res.render('index', { Title: 'My Express App', message: 'Hello' });
});

module.exports = route;
