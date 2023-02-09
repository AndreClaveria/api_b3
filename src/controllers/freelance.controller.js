const Freelance = require("../models/freelance.model");
const Mission = require("../models/mission.model");
const Company= require("../models/company.model");
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