const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../../middlewares/authMiddleware");
const {isDoctor, isAdmin} = require("../../middlewares/checkRole");

router.use("/admin", authMiddleware, isAdmin, require("./adminRoutes"));
router.use("/", authMiddleware, isDoctor, require("./gstRoutes"));

module.exports = router;