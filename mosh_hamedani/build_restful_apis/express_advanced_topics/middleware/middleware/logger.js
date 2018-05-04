const log = (req, res, next) => {
  console.log('Logging...');
  // 將控制權交給下一個 middleware
  // 如果 mark 掉 next()，整個 req cycle 就會 hold 住
  next();
};

module.exports = log;
