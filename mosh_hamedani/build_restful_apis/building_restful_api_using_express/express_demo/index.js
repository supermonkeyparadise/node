const Joi = require('joi');
const express = require('express');
const app = express();

// 利用 middleware，解放 body 為 json
app.use(express.json());

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (course) {
    res.send(course);
  } else {
    res.status(404).send('The course with the given ID was not found!');
  }
});

// route params & queryStr
app.get('/api/posts/:year/:month', (req, res) => {
  res.send({ params: req.params, query: req.query });
});

app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  console.log('Joi validate obj:', result);

  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
