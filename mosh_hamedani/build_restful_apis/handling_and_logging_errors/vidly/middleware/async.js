module.exports = function(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      // 傳給 Error Middleware，因為在 index.js 是最後一個 middleware
      next(ex);
    }
  };
};
