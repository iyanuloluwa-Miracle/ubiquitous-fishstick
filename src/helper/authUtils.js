const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const generateRefreshToken = () => {
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return refreshToken;
};
const verifyToken = (req, res, next) => {
    console.log(req.cookies);
    const authToken = req.cookies.authToken;
  
    console.log(authToken);
  
    if (!authToken) {
      console.log("Invalid token: Token not found");
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  
    try {
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
      console.log('Decoded Token:', decodedToken);
      req.user = decodedToken; 
      next(); 
    } catch (err) {
      console.log("Invalid token: Verification failed");
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
module.exports = {
  generateRefreshToken,
  verifyToken,
};