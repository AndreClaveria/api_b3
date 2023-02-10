const Freelance = require("../models/freelance.model");
const Mission = require("../models/mission.model");
const Company= require("../models/company.model");
const Profession = require("../models/profession.model");
const Skill = require("../models/skills.model");
const bcrypt = require("bcrypt");

//USER PROFIL AND OPTIONS

exports.getProfil = (req, res) => {
    Freelance.findById(req.userToken.id).then((freelance) => {
        res.send(freelance);
        console.log(freelance);
    }).catch((err) => res.status(400).send(err));
}

exports.updateProfil = (req, res) => {
    Freelance.findById(req.userToken.id).then((freelance) => {
        let passwordValid = bcrypt.compareSync(req.body.userPassword, freelance.userPassword);
        if(!passwordValid) {
            const hashedPassword = bcrypt.hashSync(req.body.userPassword, 10);
            req.body.userPassword = hashedPassword;
        }
        Freelance.findOne({ userMail: req.body.userMail}).then((mail) => {
            if(mail) {
                console.log("ALREADY USED");
                return res.status(404).send({
                    message: mail.userMail + " is already used"
                })
            } else {
                Freelance.findByIdAndUpdate(req.userToken.id, req.body).then((profil) => {
                    res.status(200).send({
                        message: "Your profil : " + profil.firstName + " changed"
                    });
                }).catch((err) => res.status(400).send(err));
            }
        })
    })
}

exports.forgetPassword = (req, res) => {
    Freelance.findOne({userMail: req.body.userMail}).then((freelance) => {
        if(!freelance) {
            return res.status(404).send({
                message:"mail not found"
            })
        } else {
            const hashedPassword = bcrypt.hashSync(req.body.userPassword, 10);
            req.body.userPassword = hashedPassword;
            Freelance.updateOne({userPassword : freelance.userPassword} , {userPassword : req.body.userPassword}).then((profil) => {
                res.status(200).send({
                    message: "Your password changed"
                });
                console.log(req.body.userPassword);
            }).catch((err) => res.status(400).send(err));
        }
    })
}

exports.getAllSkills = (req, res) => {
    Skill.find().then((skills) => {
        res.send(skills);
        console.log(skills);
    }).catch((err) => res.status(400).send(err));
}

exports.getAllProfessions = (req, res) => {
    Profession.find().then((professions) => {
        res.send(professions);
        console.log(professions);
    }).catch((err) => res.status(400).send(err));
}

exports.getMyMission = (req, res) => {
    const emptyArr = [];
   
    Freelance.findById(req.userToken.id).then((freelance) => {
        console.log(freelance)
        for (let index = 0; index < freelance.mission.length; index++) {
           emptyArr.push(freelance.mission[index]);
        }
        res.send(emptyArr);
    })
    
}

exports.getOneMission = (req, res) => {
   
    Mission.findById(req.params.id).then((mission) => {
        res.send(mission);
    }).catch((err) => res.status(400).send(err));
    
}