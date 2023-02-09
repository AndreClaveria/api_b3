const Admin = require("../models/admin.model")
const Company = require("../models/company.model");
const Freelance = require("../models/freelance.model");
const Skill = require("../models/skills.model");
const Profession = require("../models/profession.model");
const Mission = require("../models/mission.model");
const bcrypt = require("bcrypt");

//PROFIL CHANGE
exports.getProfil = (req, res) => {
  Admin.findById(req.userToken.id).then((admin) => {
      res.send(admin);
      console.log(admin);
  }).catch((err) => res.status(400).send(err));
}

exports.updateProfil = (req, res) => {
  Admin.findById(req.userToken.id).then((admin) => {
      let passwordValid = bcrypt.compareSync(req.body.userPassword, admin.userPassword);
      if(!passwordValid) {
          const hashedPassword = bcrypt.hashSync(req.body.userPassword, 10);
          req.body.userPassword = hashedPassword;
      }
      Admin.findOne({ userMail: req.body.userMail}).then((mail) => {
          if(mail) {
              console.log("ALREADY USED");
              return res.status(404).send({
                  message: mail.userMail + " is already used"
              })
          } else {
              Admin.findByIdAndUpdate(req.userToken.id, req.body).then((profil) => {
                  res.status(200).send({
                      message: "Your profil changed"
                  });
              }).catch((err) => res.status(400).send(err));
          }
      })
  })
}

exports.forgetPassword = (req, res) => {
  Admin.findOne({userMail: req.body.userMail}).then((admin) => {
      if(!Admin) {
          return res.status(404).send({
              message:"mail not found"
          })
      } else {
          const hashedPassword = bcrypt.hashSync(req.body.userPassword, 10);
          req.body.userPassword = hashedPassword;

          Admin.updateOne({userPassword : admin.userPassword} , {userPassword : req.body.userPassword}).then((profil) => {
              res.status(200).send({
                  message: "Your password changed"
              });

          }).catch((err) => res.status(400).send(err));
      }
  })
}

//GET
exports.getCompanies = (req, res) => {
  Company.find().then((companies) => {
    res.send(companies);
    console.log(companies);
  }).catch((err) => res.status(400).send(err));
};

exports.getOneCompany = (req, res) => {
  Company.findById(req.params.id).then((company) => {
    res.send(company);
    console.log(company);
  }).catch((err) => res.status(400).send(err));
};

exports.getFreelances = (req, res) => {
  Freelance.find().then((freelances) => {
    res.send(freelances);
    console.log(freelances);
  }).catch((err) => res.status(400).send(err));
};

exports.getOneFreelance = (req, res) => {
  Freelance.findById(req.params.id).then((freelance) => {
    res.send(freelance);
    console.log(freelance);
  }).catch((err) => res.status(400).send(err));
};

exports.getSkills = (req, res) => {
  Skill.find().then((skills) => {
    res.send(skills);
    console.log(skills);
  }).catch((err) => res.status(400).send(err));
};

exports.getOneSkill = (req, res) => {
  Skill.findById(req.params.id).then((skill) => {
    res.send(skill);
    console.log(skill);
  }).catch((err) => res.status(400).send(err));
};

exports.getProfessions = (req, res) => {
  Profession.find().then((professions) => {
    res.send(professions);
    console.log(professions);
  }).catch((err) => res.status(400).send(err));
};

exports.getOneProfession = (req, res) => {
  Profession.findById(req.params.id).then((profession) => {
    res.send(profession);
    console.log(profession);
  }).catch((err) => res.status(400).send(err));
};

exports.getMissions = (req, res) => {
  Profession.find().then((professions) => {
    res.send(professions);
    console.log(professions);
  }).catch((err) => res.status(400).send(err));
};

exports.getOneProfession = (req, res) => {
  Profession.findById(req.params.id).then((profession) => {
    res.send(profession);
    console.log(profession);
  }).catch((err) => res.status(400).send(err));
};

//CREATE
exports.createSkill = (req, res) => {
  const newSkill = new Skill(req.body);
  newSkill.save().then((skill) => {
    res.status(201).send({
      message: "Skill : " + skill.skillName + " is now registered.",
    });
    console.log("Skill : " + skill.skillName + " is now registered.");
  })
  .catch(() => {
    res.status(400).send({
      message: "Skill : " + req.body.skillName + " is already registered."
      
    });
    console.log("Skill : " + req.body.skillName + " is already registered.")
  })
}

exports.createProfession = (req, res) => {
  const newProfession = new Profession(req.body);
  newProfession.save().then((profession) => {
    res.status(201).send({
      message: "Profession : " + profession.professionName + " is now registered.",
    });
    console.log("Profession : " + profession.professionName + " is now registered.");
  })
  .catch(() => {
    res.status(400).send({
      message: "Profession : " + req.body.professionName + " is already registered."
      
    });
    console.log("Professionl : " + req.body.professionName + " is already registered.")
  })
}

//DELETE
exports.deleteCompany = (req, res) => {
  Company.findByIdAndDelete(req.params.id).then((company) => {
    console.log("Company : " + company.companyName + " deleted");
    res.status(200).send({
      message: "Company : " + company.companyName + " deleted"
    });
  }).catch((err) => res.status(400).send(err));
}

exports.deleteFreelance = (req, res) => {
  Freelance.findByIdAndDelete(req.params.id).then((freelance) => {
    console.log("Freelance : " + freelance.firstName + " deleted");
    res.status(200).send({
      message: "Freelance : " + freelance.firstName + " deleted"
    });
  }).catch((err) => res.status(400).send(err));
}

exports.deleteSkill = (req, res) => {
  Skill.findByIdAndDelete(req.params.id).then((skill) => {
    console.log("Freelance : " + skill.skillName + " deleted");
    res.status(200).send({
      message: "Freelance : " + skill.skillName + " deleted"
    });
  }).catch((err) => res.status(400).send(err));
}

exports.deleteProfession = (req, res) => {
  Profession.findByIdAndDelete(req.params.id).then((profession) => {
    console.log("Skill : " + profession.professionName + " deleted");
    res.status(200).send({
      message: "Skill : " + profession.professionName + " deleted"
    });
  }).catch((err) => res.status(400).send(err));
}

//MODIFY

exports.updateCompany = (req, res) => {
  Company.findOne({userMail: req.body.userMail}).then((mail)=> {
    if(mail) {
      console.log("ALREADY USED");
      return res.status(404).send({
        message: mail.userMail + " is already used"
      })
    } else {
      Company.findByIdAndUpdate(req.params.id, req.body).then((company) => {
        if(!company) {
          console.log("NOTFOUND");
          return res.status(404).send({
            message: "Company not found"
          });
        } else {
          res.status(200).send({
            message: "Company : " + company.companyName + " changed"
          });
        }
        
      }).catch(() => res.status(400).send({
          message: "ID: " + req.params.id + " doesn't exist"
        }
      ));
    }
  }).catch((err) => res.status(400).send(err));
}

exports.updateFreelance = (req, res) => {
  Freelance.findOne({userMail: req.body.userMail}).then((mail)=> {
    if(mail) {
      console.log("ALREADY USED");
      return res.status(404).send({
        message: mail.userMail + " is already used"
      })
    } else {
      Freelance.findByIdAndUpdate(req.params.id, req.body).then((freelance) => {
        if(!freelance) {
          console.log("NOTFOUND");
          return res.status(404).send({
            message: "Freelance not found"
          });
        } else {
          res.status(200).send({
            message: "Freelance : " + freelance.firstName + " changed"
          });
        }
        
      }).catch(() => res.status(400).send({
          message: "ID: " + req.params.id + " doesn't exist"
        }
      ));
    }
  }).catch((err) => res.status(400).send(err));
}

exports.updateSkill = (req, res) => {
  Skill.findOne({skillName: req.body.skillName}).then((skill)=> {
    if(skill) {
      console.log("ALREADY USED");
      return res.status(404).send({
        message: skill.skillMail + " is already used"
      })
    } else {
      Skill.findByIdAndUpdate(req.params.id, req.body).then((skills) => {
        if(!skills) {
          console.log("NOTFOUND");
          return res.status(404).send({
            message: "Skill not found"
          });
        } else {
          res.status(200).send({
            message: "Skill : " + skills.skillName + " changed"
          });
        }
        
      }).catch(() => res.status(400).send({
          message: "ID: " + req.params.id + " doesn't exist"
        }
      ));
    }
  }).catch((err) => res.status(400).send(err));
}

exports.updateProfession = (req, res) => {
  Profession.findOne({professionName: req.body.professionName}).then((profession)=> {
    if(profession) {
      console.log("ALREADY USED");
      return res.status(404).send({
        message: profession.professionName + " is already used"
      })
    } else {
      Profession.findByIdAndUpdate(req.params.id, req.body).then((professions) => {
        if(!professions) {
          console.log("NOTFOUND");
          return res.status(404).send({
            message: "Profession not found"
          });
        } else {
          res.status(200).send({
            message: "Profession : " + professions.professionName + " changed"
          });
        }
        
      }).catch(() => res.status(400).send({
          message: "ID: " + req.params.id + " doesn't exist"
        }
      ));
    }
  }).catch((err) => res.status(400).send(err));
}

