const Freelance = require("../models/freelance.model");
const Mission = require("../models/mission.model");
const Company = require("../models/company.model");
const bcrypt = require("bcrypt");

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

//CREATE MISSION

exports.createMission = (req, res) => {
    Mission.create({
        missionCreator: "12312",
        startingDate: req.body.startingDate,
        endingDate: req.body.endingDate,
        missionPrice: req.body.missionPrice,
        missionDescription: req.body.missionDescription,
        missionTitle: req.body.missionTitle,
        missionProfessions: req.body.missionProfessions,
        missionSkills: req.body.missionSkills,
        missionPeople: req.body.missionPeople,
    }).then((mission) => {
        if(mission.missionSkills === 0) {
            return res.status(400).send({
                message: `You have to choose Freelancer make go on profil`
            })
        }
        if(mission.missionPeople > 3) {
            return res.status(400).send({
                message: "You can just put 3 freelances at max !",
            });
        } else {
          console.log("Task : " + mission.missionTitle + " created !");
          res.send(mission);
        }
    }).catch((err) => res.status(400).send(err));
}

