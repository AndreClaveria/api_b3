const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {

  //Admin
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTM5N2VmNzcwNmJiMGY2M2ZlNzIyMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTg2MDAwOH0.u8P2EQTsS-lyTTQGCMu7DQ_XdB2Ony3y-DUzjm0ZvYg";
  //Company
  //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTNhMzg0OWY2ZTc2NzVlNzU0NDBmNyIsImlzQWRtaW4iOmZhbHNlLCJhY2NvdW50VHlwZSI6IkNvbXBhbnkiLCJpYXQiOjE2NzU4NjI5Mzl9.beTko4jshpPGquNo7KB2KRu_yQgF40PYDvxZyT2JRjc"
  //Freelance
  //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTNhNDFlYWI4MTgxOWFhMTc5NTAzMyIsImlzQWRtaW4iOmZhbHNlLCJhY2NvdW50VHlwZSI6IkZyZWVsYW5jZSIsImlhdCI6MTY3NTg2MzExOH0.BtchUTN_r5HtWEILKdUy18VjdktyBqFW6SnKxjBbWqc"
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