const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.admin = decoded.admin;
    req.user = decoded.user;
    req.payment = decoded.payment;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};



//check if not token for the users
