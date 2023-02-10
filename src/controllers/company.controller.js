const Freelance = require("../models/freelance.model");
const Mission = require("../models/mission.model");
const Company = require("../models/company.model");
const Skill = require("../models/skills.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { search } = require("../routes/company.route");
//USER PROFIL AND OPTIONS

exports.getProfil = (req, res) => {
    Company.findById(req.userToken.id).then((company) => {
        res.send(company);
        console.log(company);
    }).catch((err) => res.status(400).send(err));
}

exports.updateProfil = (req, res) => {
    Company.findById(req.userToken.id).then((company) => {
        let passwordValid = bcrypt.compareSync(req.body.userPassword, company.userPassword);
        if(!passwordValid) {
            const hashedPassword = bcrypt.hashSync(req.body.userPassword, 10);
            req.body.userPassword = hashedPassword;
        }
        Company.findOne({ userMail: req.body.userMail}).then((mail) => {
            if(mail) {
                console.log("ALREADY USED");
                return res.status(404).send({
                    message: mail.userMail + " is already used"
                })
            } else {
                Company.findByIdAndUpdate(req.userToken.id, req.body).then((profil) => {
                    res.status(200).send({
                        message: "Your profil : " + profil.firstName + " changed"
                    });
                }).catch((err) => res.status(400).send(err));
            }
        })
    })
}

exports.forgetPassword = (req, res) => {
    Company.findOne({userMail: req.body.userMail}).then((company) => {
        if(!company) {
            return res.status(404).send({
                message:"mail not found"
            })
        } else {
            
            console.log(req.body.userPassword);
            console.log(company.userPassword);
            const hashedPassword = bcrypt.hashSync(req.body.userPassword, 10);
            req.body.userPassword = hashedPassword;
            console.log(req.body.userPassword);
            Company.updateOne({userPassword : company.userPassword} , {userPassword : req.body.userPassword}).then((profil) => {
                res.status(200).send({
                    message: "Your password changed"
                });
                console.log(req.body.userPassword);
            }).catch((err) => res.status(400).send(err));
        }
    })
}

exports.getFreelanceByCity = (req, res) => {
    const emptyArr = [];
    const searcha = req.body.userCity;
    Freelance.find({$userCity: {$search: searcha}}).then((freelance) => {
        for (let index = 0; index < freelance.length; index++) {
           console.log(freelance[index].userCity);
           console.log(searcha);
           if(freelance[index].userCity === searcha) {
                emptyArr.push(freelance[index]);
           } else {
                console.log("No");
           }
        }
        res.send(emptyArr);
        console.log(emptyArr);
    });
}

exports.getFreelanceBySkill = (req, res) => {
    const emptyArr = [];
    const emptyArr2 = [];
    const searcha = req.body.skillName;
    Skill.find({$skillName: {$search: searcha}}).then((skill) => {
        for (let index = 0; index < skill.length; index++) {
           if(skill[index].skillName == searcha) {
            emptyArr.push(skill[index]._id);
            } else {
             console.log("No");
            }   
        }
        console.log(emptyArr);
        Freelance.find().then((freelance) => {
            for (let i = 0; i < freelance.length; i++) {
                for (let k = 0; k < freelance[i].skills.length; k++) {
                    for (let l = 0; l < emptyArr.length; l++) {
                        console.log("Tentative True : " + emptyArr[l]);
                        console.log(Object.is(`63e413b9e6dc0f8cb14d5358`, freelance[i].skills[k]))
                        console.log("Tentative True 2 : " + freelance[i].skills[k]);
                        console.log((emptyArr[l]) == (freelance[i].skills[k]));
                        if(emptyArr[l] === freelance[i].skills[k]) {
                            emptyArr2.push(freelance[i])
                        } else {
                            console.log("No");
                        }
                    }
                }
            }
            console.log(emptyArr2);
            res.send(emptyArr2)
        })
    })
}

exports.getMyMission = (req, res) => {    
    Mission.find({missionCreator: req.userToken.id}).then((missions) => {
        res.send(missions);
        console.log(missions);
    }).catch((err) => res.status(400).send(err));
}

exports.getFreelanceByTaxe = (req, res) => {
    
}

exports.getAllFreelance = (req, res) => {
    Freelance.find().then((freelance) => {
        res.send(freelance);
        console.log(freelance);
    })
}

//CREATE MISSION

exports.createMission = (req, res) => {
    
    Mission.create({
        missionCreator: req.userToken.id,
        startingDate: req.body.startingDate,
        endingDate: req.body.endingDate,
        missionPrice: req.body.missionPrice,
        missionDescription: req.body.missionDescription,
        missionTitle: req.body.missionTitle,
        missionProfessions: req.body.missionProfessions,
        missionSkills: req.body.missionSkills,
        missionPeople: req.body.missionPeople,
    }).then((mission) => {
        console.log(mission._id);
        if(mission.missionPeople.length === 0) {
            Mission.findByIdAndRemove(mission._id).then((del) => {
                return res.status(400).send({
                    message: `You have to choose Freelancer make go on profil`
                })
            }).catch((err) => res.status(400).send(err));    
        } else if(mission.missionPeople.length > 3) {
            Mission.findByIdAndRemove(mission._id).then((del) => {
                return res.status(400).send({
                    message: "You can just put 3 freelances at max !",
                });
            }).catch((err) => res.status(400).send(err));  
        } else {
          console.log("Task : " + mission.missionTitle + " created !");
  
            for (let index = 0; index < mission.missionPeople.length; index++) {
                console.log(mission.missionPeople[index]);
                Company.findById(req.userToken.id).then((com) => {  
                     Freelance.findByIdAndUpdate({_id: mission.missionPeople[index]}, { $push: {mission: mission._id, status: "pending"}}).then((updated) => {
                        console.log(updated.firstName);
                        console.log(updated.userMail);
                        console.log(com.companyName);
                        console.log(com.userMail);
                        sendMailTo(updated.firstName, updated.userMail, com.companyName,com.userMail)
                    })
                })
            }
            
            res.status(200).send({
                message: "Mission added"
            })  
        }
    }).catch((err) => res.status(400).send(err));
}

exports.modifyMission = (req, res) => {

    if(req.body.missionStatus === "En cours" || req.body.missionStatus === "Cloture" || req.body.missionStatus === undefined )  {
        if(req.body.missionPeople === undefined) {
            Mission.findByIdAndUpdate(req.params.id, req.body).then((mission) => {
                if(mission.missionCreator === req.userToken.id) {
                    if(!mission) {
                        console.log("NOTFOUND");
                          return res.status(404).send({
                            message: "Mission not found"
                          });
                    } 
                    
                    if(mission.missionStatus === "En cours" || mission.missionStatus === "Cloture") {
                        
                        res.status(200).send({
                            message: "Mission : " + mission.missionTitle + " changed"
                        });
                    } else {
                        Mission.findOneAndUpdate({missionStatus : mission.missionStatus}, {missionStatus : "En cours"})
                        res.status(400).send({
                            message: "Your mission has to be En cours ou Cloture"
                        });  
                    }
                    
                } else {
                   
                    res.status(404).send({
                        message: "You're not the owner of this mission"
                    });  
                }
                       
            }).catch(() => res.status(400).send({
                message: "ID: " + req.params.id + " doesn't exist"
            }));
        } else {
            res.status(400).send({
                message: "You can just put your freelance during the creation of the mission"
            }); 
        }
       
    } else {
        res.status(400).send({
            message: "Your mission has to be En cours ou Cloture"
        }); 
    }
    
}

function sendMailTo(userTo, sentTo, companyOf, companyMail) {

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    
      auth: {
          user: 'demo.12345121@gmail.com', 
          pass: 'zhrqbikaolfmsmat'
      },
    });
  
    
      let info = transporter.sendMail({
      from: "'" + companyOf + "'" + "<demo.12345121@gmail.com>",
      to: "'" + userTo + "'" + "<" + sentTo + ">", 
      subject: "You have a new mission!", 
      text: `
      Hello ${userTo}, 
  
      You have been selected to take part on this mission by ${companyOf}, 
      Now you have the choice to accept or decline this mission!
  
      Have a good day!
      
      Our mail : ${companyMail}`, 
      });
      console.log("Message sent: %s", info.messageId);
    

  }
    


