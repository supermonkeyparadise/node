// 沒有 window 物件，因為不在 browser 內執行
// console.log(window);

// 等價於 console.log('123');
global.console.log('123');

const message = '456';
console.log(global.message); // undefined

// variable & function 的 scope 都屬於這個檔案之中
// 不會加在 global 造成 overwrite 的問題

console.log(module);
