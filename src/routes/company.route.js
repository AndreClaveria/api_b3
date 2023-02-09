const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const company = require('../controllers/company.controller');
const { checkName, checkMail, checkCompanyData, checkPassword, validation } = require('../middlewares/validators');
const verifyIsCompany = require('../middlewares/verifyIsCompany');
const verifyToken = require('../middlewares/verifyToken');


router.get('/profil', verifyToken, verifyIsCompany, company.getProfil);
router.put('/profil', checkPassword, validation, verifyToken, verifyIsCompany, company.updateProfil);
router.put('/forget', company.forgetPassword);

router.get('/', verifyToken, verifyIsCompany);
router.post('/register', checkName, checkMail, checkPassword, checkCompanyData, validation, auth.registerCompany);
router.post('/login', checkMail, checkPassword, validation, auth.loginCompany);
router.post('/missions/create', company.createMission);


module.exports = router;