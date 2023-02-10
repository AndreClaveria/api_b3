const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken (req, res, next) {

  let token = req.headers.authorization
  //Admin
  //let token = process.env.ADMIN;
  //Company
  //let token = process.env.COMPANY
  //Freelance
  //let token = process.env.FREELANCE
  console.log(token);
  if (!token) {
    return res.status(403).send({
      auth: false,
      token: null,
      message:"Missing token"
    })
  }
  jwt.verify(token, process.env.JWT_SECRET, function (error, jwtDecoded) {
    if (error) {
      return res.status(401).send({
        auth: false,
        token: null,
        message:"none authorized"
      })
    }
    req.userToken = jwtDecoded;
    console.log(jwtDecoded);
    next();
  })
}

module.exports = verifyToken;