// authMiddleware.js
const jwt  = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 
  // Expecting format: "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify token with secret key
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded; // attach payload to request
    next(); // continue to next handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
module.exports = verifyToken 
