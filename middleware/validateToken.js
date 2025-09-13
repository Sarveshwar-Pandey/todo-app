const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Middleware to validate JWT
const validateToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  // If no token, block request
  if (!token) {
    res.status(401);
    throw new Error("User is not authorized (token missing)");
  }

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    //user info gets stored in req.user
    req.user = decoded.user;

    //Allow request to continue
    next();
  } catch (err) {
    res.status(401);
    throw new Error("User is not authorized (invalid token)");
  }
});

module.exports = validateToken;
