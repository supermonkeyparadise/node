const fs = require('fs');

// ＊＊盡量使用 async，避免使用 sync＊＊

// const files = fs.readdirSync('./');
// console.log('(sync)目前目錄下的檔案：', files);

fs.readdir('./', (err, files) => {
  if (err) console.log('Error', err);
  else console.log(`(async)目前目錄下的檔案： ${files}`);
});
