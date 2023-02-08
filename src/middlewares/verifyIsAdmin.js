function verifyIsAdmin(req, res, next) {
  console.log("Entrer dans VerifyIsAdmin");
    console.log(req.userToken);
    if (!req.userToken.isAdmin) {
      return res.status(401).send({
        auth: false,
        message: "You're not an Admin"
      })
    } 
    next();
  }
  
  module.exports = verifyIsAdmin;