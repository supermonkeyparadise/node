const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

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
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

// 客製化 middleware
app.use(logger);

app.use((req, res, next) => {
  console.log('Authenticating...');
  next();
});

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

// read api(多筆)
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// read api(單筆)
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (course) {
    return res.send(course);
  } else {
    return res.status(404).send('The course with the given ID was not found!');
  }
});

// route params & queryStr
app.get('/api/posts/:year/:month', (req, res) => {
  res.send({ params: req.params, query: req.query });
});

// create api
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    // 400 Bad Request
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// update api
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found!');
  }

  const { error } = validateCourse(req.body);
  if (error) {
    // 400 Bad Request
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

// delete api
app.delete('/api/courses/:id', (req, res) => {
  // 在原陣列操作，感覺不太好！！
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found!');
  }

  // 物件比對的是 ref
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const validateCourse = course => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
