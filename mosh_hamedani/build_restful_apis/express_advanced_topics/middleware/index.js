const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');

const home = require('./routes/home');
const courses = require('./routes/courses');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // 設定路徑

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

// 利用 middleware，解放 body 為 json
// support ajax!!
// Content-Type: application/json
app.use(express.json());

// support form submit!!
// Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 擺放靜態資源 [default: /] ex: http:localhost:3000/readme.txt
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}

// Db work
dbDebugger('Connected to the database...');

// 客製化 middleware
app.use(logger);
app.use((req, res, next) => {
  console.log('Authenticating...');
  next();
});

app.use('/', home);
app.use('/api/courses', courses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
