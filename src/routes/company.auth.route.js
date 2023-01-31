const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { checkMail, checkCompanyData, checkPassword, validation } = require('../middlewares/validators');

router.post('/register', checkMail, checkPassword, checkCompanyData, validation, authController.registerCompany);

module.exports = router;