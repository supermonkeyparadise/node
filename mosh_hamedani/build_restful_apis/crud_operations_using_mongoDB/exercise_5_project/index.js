const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

// for Headers [ Content-Type:application/json ]
// 將 json str 轉為 json obj，方便處理！！
app.use(express.json());
// 使用 middleware 分流 request
app.use('/api/genres', genres);
// 使用 middleware 分流 request
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
