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
    authors: [authorSchema]
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
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

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse('React Course', [
//   new Author({ name: 'Steven' }),
//   new Author({ name: 'Mosh' })
// ]);

// updateAuthor('5afd25243952de0d7dab699b');

// addAuthor('5afd2916fa54de0f807b8aa2', new Author({ name: 'Amy' }));

removeAuthor('5afd2916fa54de0f807b8aa2', '5afd2ac4f2caec0ff95717d3');
