const { body, validationResult } = require('express-validator')

exports.checkMail = [
    body('userMail').isEmail().withMessage("Email format is not valid")
];

exports.checkCompanyData = [
  body("companyName").isAlphanumeric().withMessage("Company name format is not valid"),
  body("companyStatus").custom((value) => {
    if (value != "SAS" && value != "SASU" && value != "SARL" && value != "EURL") {
      throw new Error(
        "Company status format is not valid, choose between : SAS, SASU, SARL or EURL"
      );
    }
    return true;
  }),
  body("companySiret").isAlphanumeric().isLength({min: 9, max: 9}).withMessage("Siret format is not valid"),

];

exports.checkPassword = [
    body('userPassword')
    .notEmpty()
    .isLength({ min: 6, max: 30 })
    .matches(/^[A-Za-z0-9 .,'!&(§è!çà)]+$/)
];

exports.validation = (req, res, next) => {
    
  const errors = validationResult(req);
  console.log(validationResult(req))
  if (!errors.isEmpty()) {
    console.log("Why")
    return res.status(400).send({
      errors:errors.array()
    })
  }
  next();
}