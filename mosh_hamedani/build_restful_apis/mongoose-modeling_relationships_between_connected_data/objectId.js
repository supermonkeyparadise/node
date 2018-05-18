// _id: 5afd1d80377c580c6d93588b  ===> 幾乎是唯一值
// _id 不是由 mongoDB 產生的，而是由 mongoDB driver 產生的
// 所以一個 driver 可以對多個 mongoDB instance

// 12 bytes
// 4 bytes: timestamp
// 3 bytes: machine identifier
// 2 bytes: process identifier
// 3 bytes: counter

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log('## id:', id);
console.log('## tiemstamp:', id.getTimestamp());

// 判斷 objectId 的合法性
const isValid = mongoose.Types.ObjectId.isValid('5afbec73d585c621cc153f36');
console.log('## isValid:', isValid);
