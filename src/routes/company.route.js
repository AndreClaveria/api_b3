const express = require('express');
const router = express.Router();
const authRouter = require("./company.auth.route");

router.use("/auth", authRouter);

module.exports = router;