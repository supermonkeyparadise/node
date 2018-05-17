const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    author: { type: authorSchema, required: true }
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // [ Query first ]
  // const course = await Course.findById(courseId);
  // course.author.name = 'Steven Chou';
  // course.save();

  // [ update first ]
  // const course = await Course.update(
  //   { _id: courseId },
  //   {
  //     $set: {
  //       'author.name': 'John Stock'
  //     }
  //   }
  // );

  // 刪除 embedd author
  const course = await Course.update(
    { _id: courseId },
    {
      $unset: {
        author: ''
      }
    }
  );
}

// createCourse('React Course', new Author({ name: 'Steven' }));
updateAuthor('5afd25243952de0d7dab699b');
