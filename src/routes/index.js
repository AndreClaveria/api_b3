const express = require('express');
const router = express.Router();
const companyRouter = require("./company.route");

router.use("/company", companyRouter);

module.exports = router;