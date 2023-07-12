const express = require("express");
const { adminController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// router.get("/", categoryController.fetchAllCategories);
router.post("/login", adminController.login);
router.post("/check-login", verifyToken, adminController.checkLoginAdmin);
router.get("/branch", adminController.fetchAllBranch);
router.post("/createAdmin", adminController.createAdminBranch);

router.get(
  "/fetchTransactionByBranch",
  verifyToken,
  adminController.fetchTransactionByBranch
);
router.patch("/cancelTransaction/:id", adminController.cancelTransaction);
router.patch("/sendTransaction/:id", adminController.sendTransaction);

module.exports = router;
