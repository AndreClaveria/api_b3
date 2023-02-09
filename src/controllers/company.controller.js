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
    const newMission = new Mission({
        missionCreator: req.userToken.id,
        startingDate: req.body.startingDate,
        endingDate: req.body.endingDate,
        missionPrice: req.body.missionPrice,
        missionDescription: req.body.missionDescription,
        missionTitle: req.body.missionTitle,
        missionJobs: req.body.missionJobs,
        missionSkills: req.body.missionSkills,
        missionStatus: req.body.missionStatus,
        missionPeople: req.body.missionPeople,
    })
}