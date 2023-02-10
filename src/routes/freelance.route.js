const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const freelance = require('../controllers/freelance.controller')
const { checkName, checkMail, checkFreelanceData, checkPassword, validation } = require('../middlewares/validators');
const verifyIsFreelance = require('../middlewares/verifyIsFreelance');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, verifyIsFreelance);
router.get('/profil', verifyToken, verifyIsFreelance, freelance.getProfil);
router.put('/profil', checkPassword, validation, verifyToken, verifyIsFreelance, freelance.updateProfil);
router.put('/forget', freelance.forgetPassword);

router.post('/register', checkName, checkMail, checkPassword, checkFreelanceData, validation, auth.registerFreelance);
router.post("/login", checkMail, checkPassword, validation, auth.loginFreelance);


module.exports = router;