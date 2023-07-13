const express = require("express");
const { adminController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// router.get("/", categoryController.fetchAllCategories);
router.post("/login", adminController.login);
router.post("/check-login", verifyToken, adminController.checkLoginAdmin);
router.get("/branch", adminController.fetchAllBranch);
router.post("/createAdmin", adminController.createAdminBranch);
router.get("/totalrevenuebybranch", adminController.totalRevenueByBranch);

module.exports = router;
