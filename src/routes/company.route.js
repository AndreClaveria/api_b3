const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const company = require('../controllers/company.controller');
const { checkName, checkMail, checkCompanyData, checkPassword, validation } = require('../middlewares/validators');
const verifyIsCompany = require('../middlewares/verifyIsCompany');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, verifyIsCompany);

router.get('/profil', verifyToken, verifyIsCompany, company.getProfil);
router.put('/profil', checkPassword, validation, verifyToken, verifyIsCompany, company.updateProfil);
router.get('/profil/missions', verifyToken, verifyIsCompany, company.getMyMission);
router.get('/freelances', verifyToken, verifyIsCompany, company.getAllFreelance);
router.put('/forget', company.forgetPassword, verifyToken, verifyIsCompany, company.getMyMission);
router.put('/missions/:id', verifyToken, verifyIsCompany, company.modifyMission);
router.post('/freelances/searchName', verifyToken, verifyIsCompany, company.getFreelanceByCity);
router.post('/freelances/searchSkill', verifyToken, verifyIsCompany, company.getFreelanceBySkill);
router.post('/register', checkName, checkMail, checkPassword, checkCompanyData, validation, auth.registerCompany);
router.post('/login', checkMail, checkPassword, validation, auth.loginCompany);
router.post('/missions/create', verifyToken, verifyIsCompany, company.createMission);


module.exports = router;