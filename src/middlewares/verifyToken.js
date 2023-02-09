const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {

  //Admin
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTM5N2VmNzcwNmJiMGY2M2ZlNzIyMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTk0MTYxNX0.B-itAqIJVitBTTiv1menbKH8q50m1f2jjaKIcI2crPI";
  //Company
  //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTRkN2U2Y2MwOThhZDkyNTc0NjYwNiIsImlzQWRtaW4iOmZhbHNlLCJhY2NvdW50VHlwZSI6IkNvbXBhbnkiLCJpYXQiOjE2NzU5NDE4ODV9.d-fl9mb1sOP8n--5XVjxZmsC_t3F-2gCt_2KVO3jif0"
  //Freelance
  //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTRkOTczYjNhZDg0OTFjYThmMDhhNCIsImlzQWRtaW4iOmZhbHNlLCJhY2NvdW50VHlwZSI6IkZyZWVsYW5jZSIsImlhdCI6MTY3NTk0MjI5NX0.JZ3pKi8JPdfoTWdjllZL1B6pvPcribRWiHDTenn5YRE"
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