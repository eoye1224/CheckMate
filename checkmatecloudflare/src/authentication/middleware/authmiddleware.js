const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(403).json({ message: 'Access denied. Not authenticated.' });
  }

  req.user = {
    id: req.session.userId,
    username: req.session.username,
  };

  next(); // Proceed to the next middleware or route handler
};

module.exports = authMiddleware;
