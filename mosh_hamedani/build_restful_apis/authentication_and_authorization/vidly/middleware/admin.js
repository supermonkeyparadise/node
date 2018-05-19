module.exports = function(req, res, next) {
  // 401 Unauthorized (沒有 web token)
  // 403 Forbidden (有 web token，但沒有權限)

  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
};
