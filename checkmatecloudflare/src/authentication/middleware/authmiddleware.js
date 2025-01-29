// Authentication middleware to ensure that the user is logged in
const authMiddleware = (req, res, next) => {
  // Check if the user is authenticated by verifying the session userId
  if (!req.session.userId) {
    // If not authenticated, send a 403 response with an access denied message
    return res.status(403).json({ message: 'Access denied. Not authenticated.' });
  }

  // Attach user information from session to the request object for future middleware or route handlers
  req.user = {
    id: req.session.userId,      // The user’s unique ID
    username: req.session.username,  // The user’s username
  };

  // Proceed to the next middleware or route handler
  next(); 
};

module.exports = authMiddleware;
