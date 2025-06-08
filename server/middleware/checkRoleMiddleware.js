const jwt = require('jsonwebtoken');

module.exports = function (requiredRole) {
  return function (req, res, next) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "User is unauthorized (no token)" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied (no permission)" });
      }

      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({ message: "User is unauthorized (invalid token)" });
    }
  };
};