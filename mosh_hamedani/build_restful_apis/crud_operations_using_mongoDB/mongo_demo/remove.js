const mongoose = require('mongoose');

// playground ===> database
// 如果 db 不存在，會自行建置
// return Promise
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// collection ===> table(關聯式)
//     documents ===> row(關聯式)
//         schema ===> 規定 key value 的樣式
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// Classes, objects
// Course,   nodeCourse

// 1. 利用 schema 得到 class *** class 第一個字大寫 ***
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
  // 2. 利用 class 得到 一個 object
  const course = Course({
    name: 'React Course',
    author: 'Mosh',
    tags: ['react', 'frontend'],
    isPublished: false
  });

  const result = await course.save();
  console.log(result);
}

async function getCourse() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: 'Mosh', isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) // 1 ===> 升冪; -1 ===> 降冪
    .select({ name: 1, tags: 1 }); // 設定要回傳的 properties

  console.log(courses);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  //   const result = await Course.deleteMany({ _id: id });
  //   const course = await Course.findByIdAndRemove(id);

  console.log(result);
}

// createCourse();
// getCourse();
removeCourse('5af415625ea0b216f650307b');
