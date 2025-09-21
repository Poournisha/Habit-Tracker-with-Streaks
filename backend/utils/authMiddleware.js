const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  console.log("Auth middleware hit");
  const token = req.header("Authorization");
  console.log("Token:", token);
  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
