const express = require('express');
const router = express.Router();

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

// read api(多筆)
router.get('/', (req, res) => {
  res.send(courses);
});

// read api(單筆)
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (course) {
    return res.send(course);
  } else {
    return res.status(404).send('The course with the given ID was not found!');
  }
});

// route params & queryStr
router.get('/:year/:month', (req, res) => {
  res.send({ params: req.params, query: req.query });
});

// create api
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;
