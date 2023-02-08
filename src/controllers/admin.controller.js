const Company = require("../models/company.model");
const Freelance = require("../models/freelance.model");

//GET
exports.getCompanies = (req, res) => {
  Company.find().then((companies) => {
    res.send(companies);
    console.log(companies);
  }).catch((err) => res.status(400).send(err));
};

exports.getFreelances = (req, res) => {
  Freelance.find().then((freelances) => {
    res.send(freelances);
    console.log(freelances);
  }).catch((err) => res.status(400).send(err));
};


//DELETE
exports.deleteCompany = (req, res) => {
  Company.findByIdAndDelete(req.params.cid).then((company) => {
    console.log("Company : " + company.companyName + " deleted !");
    res.send(company);
  }).catch((err) => res.status(400).send(err));
}

