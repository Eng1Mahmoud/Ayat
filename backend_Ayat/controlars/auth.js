const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = token ? verifyToken(token) : null;
  if (!decoded) {
    return res.json({ error: "Unauthorized", verified: false });
  }
  req.user = decoded;
  next();
};

// Verify token function
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return null;
  }
};

  module.exports = authMiddleware