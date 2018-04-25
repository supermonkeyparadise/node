// ＊＊ 這裡定義的 var & func 都是 private ＊＊

// Module code 都被包在 Module Wrapper Function 中
console.log('Module Wrapper Function [ __filename ]:', __filename);
console.log('Module Wrapper Function [ __dirname ]:', __dirname);

const url = 'http://mylogger.io/log';

const log = message => {
  console.log(message);
};

module.exports.log = log;
module.exports.endPoint = url;

// 可以觀察 exports property 的內容，就知道怎麼 exports 的是一個物件，還是其他的東西
console.log(module);
