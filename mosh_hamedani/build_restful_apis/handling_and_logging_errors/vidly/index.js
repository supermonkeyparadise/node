require('express-async-errors');

// LOG
const winston = require('winston');
require('winston-mongodb');

const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const error = require('./middleware/error');

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

// 處理非 request process 的 exception
process.on('uncaughtException', ex => {
  console.log('WE GOT AN UNCAUGHT EXCEPTION');
  winston.error(ex.message, ex);
});
// Write log to file
winston.add(winston.transports.File, { filename: 'logfile.log' });
// Write log to MongoDB
winston.add(winston.transports.MongoDB, {
  db: 'mongodb://localhost/vidly',
  level: 'info'
});

throw new Error('Someting failed during startup');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Error Middleware
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
