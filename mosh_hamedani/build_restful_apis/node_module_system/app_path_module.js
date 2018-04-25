const path = require('path');

// 將路徑資訊解析成物件形式，方便操作
const pathObj = path.parse(__filename);

console.log(pathObj);
