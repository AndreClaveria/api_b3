const express = require('express');
const router = express.Router();
const adminRouter = require("./admin.route")
const companyRouter = require("./company.route");
const freelanceRouter = require("./freelance.route");
const visiter = require("../controllers/guest.controller");
var bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use("/admin", adminRouter);
router.use("/company", companyRouter);
router.use("/freelance", freelanceRouter);
router.get("/search/freelances", visiter.getFreelances);
router.get("/search/freelances/:id", visiter.getOneFreelance);
router.get("/search", visiter.getFreelanceByCity);


module.exports = router;