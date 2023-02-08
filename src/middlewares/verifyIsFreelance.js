function verifyIsFreelance(req, res, next) {
    if (req.userToken.accountType !== "Freelance") {
      return res.status(401).send({
        auth: false,
        message: "You're not an Freelance",
      });
    }
    next();
}
  
module.exports = verifyIsFreelance;