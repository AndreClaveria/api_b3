const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const admin = require('../controllers/admin.controller')
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const verifyToken = require('../middlewares/verifyToken');
const { checkMail, checkPassword, validation, checkFreelanceData, checkName, checkCompanyData } = require('../middlewares/validators');

//PROFIL
router.get("/", verifyToken, verifyIsAdmin);
router.get('/profil', verifyToken, verifyIsAdmin, admin.getProfil);
router.put('/profil', checkPassword, validation, verifyToken, verifyIsAdmin, admin.updateProfil);
router.put('/forget', admin.forgetPassword);
//GET

router.get("/companies", verifyToken, verifyIsAdmin, admin.getCompanies);
router.get("/freelances", verifyToken, verifyIsAdmin, admin.getFreelances);
router.get("/skills", verifyToken, verifyIsAdmin, admin.getSkills);
router.get("/professions", verifyToken, verifyIsAdmin, admin.getProfessions);
router.get("/missions", verifyToken, verifyIsAdmin, admin.getMissions);
router.get("/companies/:id", verifyToken, verifyIsAdmin, admin.getOneCompany);
router.get("/freelances/:id", verifyToken, verifyIsAdmin, admin.getOneFreelance);
router.get("/skills/:id", verifyToken, verifyIsAdmin, admin.getOneSkill);
router.get("/professions/:id", verifyToken, verifyIsAdmin, admin.getOneProfession);
router.get("/missions/:id", verifyToken, verifyIsAdmin, admin.getOneMission);

//POST
router.post("/register", checkPassword, validation, auth.registerAdmin);
router.post("/login", checkMail, checkPassword, validation, auth.loginAdmin);
router.post("/skills/create", verifyToken, verifyIsAdmin, admin.createSkill);
router.post("/professions/create", verifyToken, verifyIsAdmin, admin.createProfession);

//DELETE
router.delete("/companies/:id", verifyToken, verifyIsAdmin, admin.deleteCompany);
router.delete("/freelances/:id", verifyToken, verifyIsAdmin, admin.deleteFreelance);
router.delete("/skills/:id", verifyToken, verifyIsAdmin, admin.deleteSkill);
router.delete("/professions/:id", verifyToken, verifyIsAdmin, admin.deleteProfession);
//PUT
router.put("/companies/:id", verifyToken, verifyIsAdmin, admin.updateCompany);
router.put("/freelances/:id", verifyToken, verifyIsAdmin, admin.updateFreelance);
router.put("/skills/:id", verifyToken, verifyIsAdmin, admin.updateSkill);
router.put("/professions/:id", verifyToken, verifyIsAdmin, admin.updateProfession);

module.exports = router;