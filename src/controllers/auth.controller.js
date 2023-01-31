const Company = require("../models/company.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

exports.registerCompany = async (req, res) => {
    console.log("Je suis rentré");
    console.log(req.body);
    const newCompany = new Company(req.body);
    console.log(newCompany)
    newCompany.save().then((company) => {
      res.status(201).send({
        message: "Email : " + company.userMail + " from " + company.companyName + " is now registered.",
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message:"user not found"
          })
        }
        let passwordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordValid) {
          return res.status(401).send({
            message: "password not valid",
            auth: false
          })
        }
        let userToken = jwt.sign({
          id: user._id,
          isAdmin:user.isAdmin
          },process.env.JWT_SECRET
        )
        res.send({
          message: "User logged",
          auth: true,
          token:userToken
        })
      })
    .catch(err=>res.Status(400).send(err))
}