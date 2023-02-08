const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const admin = require('../controllers/admin.controller')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const verifyToken = require('../middlewares/verifyToken');
const { checkMail, checkPassword, validation } = require('../middlewares/validators');

//GET
router.get("/", verifyToken, verifyIsAdmin);
router.get("/companies", verifyToken, verifyIsAdmin, admin.getCompanies);
router.get("/freelances", verifyToken, verifyIsAdmin, admin.getFreelances);
//POST
router.post("/register", checkPassword, validation, auth.registerAdmin);
router.post("/login", checkMail, checkPassword, validation, auth.loginAdmin);
//DELETE
router.delete("/companies/:cid", verifyToken, verifyIsAdmin, admin.deleteCompany)
module.exports = router;