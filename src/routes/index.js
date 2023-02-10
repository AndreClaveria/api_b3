const express = require('express');
const router = express.Router();
const adminRouter = require("./admin.route")
const companyRouter = require("./company.route");
const freelanceRouter = require("./freelance.route");
var bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use("/admin", adminRouter);
router.use("/company", companyRouter);
router.use("/freelance", freelanceRouter);


module.exports = router;