const Admin = require("../models/admin.model");
const Company = require("../models/company.model");
const Freelance = require("../models/freelance.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

exports.registerAdmin = async (req, res) => {
    const userTo = req.body.lastName;
    const sentTo = req.body.userMail;
    Admin.find().then((admin) => {
        if(admin) {
            const newAdmin = new Admin({
                adminName: "Admin",
                userMail: "admin@ynov.com",
                userPassword: req.body.userPassword,
            });
          
            newAdmin.save().then((admin) => {
                res.status(201).send({
                    message: "Admin created : : Go on /admin/login with " + admin.userMail,
                });
                const accountType = admin.accountType;
                console.log("Admin created : Go on /admin/login");
                sendMailTo(userTo, sentTo, accountType);
            })
            .catch(() => {
              res.status(400).send({
                message: "Admin already created : Go on /admin/login"
              });
              console.log("Admin already created : Go on /admin/login");
            });      
        }
    }) 
    .catch(err=>res.status(400).send(err))  
}

exports.registerCompany = async (req, res) => {
    const userTo = req.body.lastName;
    const sentTo = req.body.userMail;
    
    const newCompany = new Company(req.body);
    
    newCompany.save().then((company) => {
      res.status(201).send({
        message: "Email : " + company.userMail + " from " + company.companyName + " is now registered.",
      });
      const accountType = company.accountType;
      console.log("Company created");
      sendMailTo(userTo, sentTo, accountType);
    })
    .catch(() => {
      res.status(400).send({
        message: "Email : " + req.body.userMail + " is already in use."
        
      });
      console.log("Email : " + req.body.userMail + " is already in use.")
    })
    
}

exports.registerFreelance = async (req, res) => {
    const userTo = req.body.lastName;
    const sentTo = req.body.userMail;
    const newFreelance = new Freelance(req.body);
    newFreelance.save().then((freelance) => {
      res.status(201).send({
        message: "Email : " + freelance.userMail + " is now registered.",
      });
      console.log("Freelance created");
       const accountType = freelance.accountType;
       sendMailTo(userTo, sentTo, accountType);
    })
    .catch(() => {
      res.status(400).send({
        message: "Email : " + req.body.userMail + " is already in use."
        
      });
      console.log("Email : " + req.body.userMail + " is already in use.")
    })
} 

exports.loginAdmin = async (req, res) => {
    Admin.findOne({ email: req.body.email })
    .then((admin) => {
      if (!admin) {
        return res.status(404).send({
          message:"admin not found"
        })
      }
      let passwordValid = bcrypt.compareSync(req.body.userPassword, admin.userPassword);
      if (!passwordValid) {
        return res.status(401).send({
          message: "password not valid",
          auth: false
        })
      }
      let userToken = jwt.sign({
        id: admin._id,
        isAdmin: admin.isAdmin
        },process.env.JWT_SECRET
      )
      res.send({
        message: "User logged",
        auth: true,
        token:userToken
      })
    })
  .catch(err=>res.status(400).send(err))
}

exports.loginCompany = (req, res) => {
    Company.findOne({ userMail: req.body.userMail })
      .then((company) => {
        if (!company) {
          return res.status(404).send({
            message:"mail not found"
          })
        }
        let passwordValid = bcrypt.compareSync(req.body.userPassword, company.userPassword);
        if (!passwordValid) {
          return res.status(401).send({
            message: "password not valid",
            auth: false
          })
        }
        let userToken = jwt.sign({
          id: company._id,
          isAdmin: company.isAdmin,
          accountType: company.accountType
          },process.env.JWT_SECRET
        )
        res.send({
          message: "User logged",
          auth: true,
          token:userToken
        })
      })
    .catch(err=>res.status(400).send(err))
}

exports.loginFreelance = (req, res) => {
  Freelance.findOne({ userMail: req.body.userMail })
    .then((freelance) => {
      if (!freelance) {
        return res.status(404).send({
          message:"mail not found"
        })
      }
      let passwordValid = bcrypt.compareSync(req.body.userPassword, freelance.userPassword);
        if (!passwordValid) {
          return res.status(401).send({
            message: "password not valid",
            auth: false
          })
        }
      let userToken = jwt.sign({
        id: freelance._id,
        isAdmin:freelance.isAdmin,
        accountType: freelance.accountType
        },process.env.JWT_SECRET
      )
      res.send({
        message: "User logged",
        auth: true,
        token: userToken
      })
  })
  .catch(err=>res.status(400).send(err))
}

function sendMailTo(userTo, sentTo, userAccount) {

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  
    auth: {
        user: 'demo.12345121@gmail.com', 
        pass: 'zhrqbikaolfmsmat'
    },
  });

  if(userAccount === "Admin") {
    let info = transporter.sendMail({
    from: '"Lanceur de liberté" <demo.12345121@gmail.com>', 
    to: "'" + userTo + "'" + "<" + sentTo + ">", 
    subject: "You're now registered!", 
    text: `
    Hello, 

    you are now register on this site, 
    you can connect as ${userAccount}, in /login
    As ${userAccount}, you can have access to all the database,
    Seeing all users, DELETE, MODIFY them.

    Have a good day!`, 
    });
    console.log("Message sent: %s", info.messageId);
  }
  if(userAccount === "Freelance") {
    let info = transporter.sendMail({
    from: '"Lanceur de liberté" <demo.12345121@gmail.com>', 
    to: "'" + userTo + "'" + "<" + sentTo + ">", 
    subject: "You're now registered!", 
    text: `
    Hello, 
    you are now register on this site, 
    you can connect as ${userAccount}, in /login
    As ${userAccount}, you can accept or refusing mission,
    which is sended by some company
        
    Have a good day!`, 
    });
    console.log("Message sent: %s", info.messageId);
  }
  if(userAccount === "Company") {
    let info = transporter.sendMail({
      from: '"Lanceur de liberté" <demo.12345121@gmail.com>', 
      to: "'" + userTo + "'" + "<" + sentTo + ">", 
      subject: "You're now registered!", 
      text: `
      Hello, 

      you are now register on this site, 
      you can connect as ${userAccount}, in /login
      As ${userAccount}, you can CREATE, DELETE, MODIFY missions.
      And invite Freelance for those missions 
        
      Have a good day!`, 
    });
    console.log("Message sent: %s", info.messageId);
  }
}
  