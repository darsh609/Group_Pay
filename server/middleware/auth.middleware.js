const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }

  // const token = authHeader.split(" ")[1];
const token = req.header("Authorization").replace("Bearer ", "")

if (!token) {
  return res.status(401).json({ msg: "Unauthorized" });
}

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
