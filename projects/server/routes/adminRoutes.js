const express = require("express");
const { adminController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// router.get("/", categoryController.fetchAllCategories);
router.post("/login", adminController.login);
router.post("/check-login", verifyToken, adminController.checkLoginAdmin);
<<<<<<< HEAD
router.get("/branch", adminController.fetchAllBranch);
router.post("/createAdmin", adminController.createAdminBranch);
router.get("/totaltransactionsbranch",adminController.totalTransactionsBranch)
router.get("/totalproductssoldbranch",adminController.totalProductsSoldBranch)
router.get("/totalusersbranch",adminController.totalUsersBranch)
=======
>>>>>>> Features-FP-22

module.exports = router;
