const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const { checkName, checkMail, checkCompanyData, checkPassword, validation } = require('../middlewares/validators');
const verifyIsCompany = require('../middlewares/verifyIsCompany');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', checkName, checkMail, checkPassword, checkCompanyData, validation, auth.registerCompany);
router.post('/login', checkMail, checkPassword, validation, auth.loginCompany)
router.get('/', verifyToken, verifyIsCompany);

module.exports = router;