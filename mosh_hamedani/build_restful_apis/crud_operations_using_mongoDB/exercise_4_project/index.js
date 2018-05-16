const mongoose = require('mongoose');
const Joi = require('joi');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

// 只有當啟動時，建立 DB 連線
mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch(err => {
    console.error('Could not connect the MongoDB...');
  });

// for Headers [ Content-Type:application/json ]
// 也就是利用 body 傳送 json str
app.use(express.json());
// request entry point
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
