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
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    // match: /pattern/
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'network'], // 預設允許得值
    required: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200
  }
});

// Classes, objects
// Course,   nodeCourse

// 1. 利用 schema 得到 class *** class 第一個字大寫 ***
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
  // 2. 利用 class 得到 一個 object
  const course = Course({
    name: 'React Course',
    category: 'web',
    author: 'Mosh',
    tags: [],
    isPublished: true,
    price: 15
  });

  try {
    // 另解
    // const isValid = await course.validate();
    // if(!isValid) {}

    // 另解
    // course.validate((err)=>{
    //     if(err){}
    // })

    const result = await course.save();
    console.log(result);
  } catch (err) {
    // [ easy way ]
    // console.log(err.message);

    // [ Complex way ]
    for (field in err.errors) {
      console.log('## err:', err.errors[field].message);
    }
  }
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

createCourse();
