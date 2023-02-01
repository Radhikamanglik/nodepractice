require("dotenv").config();
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const isSuperAdmin = async (req, res, next) => {
  const data = jwt.decode(req.headers["x-access-token"]);
  if (data.role === "SUPER ADMIN") {
      next();
  }
  else {
      return res.status(404).send("Not valid Role");
  }

}
module.exports = { verifyToken ,isSuperAdmin};