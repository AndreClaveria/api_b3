function verifyIsCompany(req, res, next) {
    if (req.userToken.accountType !== "Company") {
      return res.status(401).send({
        auth: false,
        message: "You're not an Company",
      });
    }
    next();
  }
  
  module.exports = verifyIsCompany;