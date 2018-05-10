const mongoose = require('mongoose');

// playground ===> database
// 如果 db 不存在，會自行建置
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
