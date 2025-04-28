const jwt = require("jsonwebtoken");
const SECRET_KEY = "abc123xyz"; // Replace with your actual secret key
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Access Denied" });

  const token = authHeader.split(" ")[1];
  console.log("Token received:", token); // Debug

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token decoded:", decoded); // Debug
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token:", error.message);
    return res.status(403).json({ error: "Invalid Token" });
  }
};

module.exports = { verifyToken };
