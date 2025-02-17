const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized " });
  }

  jwt.verify(token, "secretkeyofnotesapp@18", (err, decode) => {
    if (err) {
      return res.send({
        message: "Token is not valid please login",
        status: 2,
      });
    }
    if (decode) {
      req.user = decode.userId;
      next();
    } else {
      res.send({
        message: "Token is not valid please login",
        status: 2,
      });
    }
  });
}

module.exports = authenticator;
