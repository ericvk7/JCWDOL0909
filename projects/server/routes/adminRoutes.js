const express = require("express");
const { adminController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/multer");

const router = express.Router();

// router.get("/", categoryController.fetchAllCategories);
router.post("/login", adminController.login);
router.post("/check-login", verifyToken, adminController.checkLoginAdmin);
router.get("/branch", adminController.fetchAllBranch);
router.post("/createAdmin", adminController.createAdminBranch);

// Product Route
router.get("/getProduct/:id", adminController.fetchProductByBranchId);
router.post(
  "/addProduct",
  verifyToken,
  upload.single("file"),
  adminController.addProduct
);
router.get("/product/:id", adminController.fetchProductById);
router.patch("/editProduct/:id", verifyToken, adminController.editProduct);
router.delete("/deleteProduct/:id", adminController.deleteProduct);

// Category Route
router.get("/getCategory", adminController.fetchAllCategories);
router.post("/addCategory", verifyToken, adminController.addCategory);
router.delete("/deleteCategory/:id", adminController.deleteCategory);
router.patch("/editCategory/:id", verifyToken, adminController.editCategory);
router.get("/getCategory/:id", adminController.fetchCategoryById);

// Transactions Route
router.get("/admin/transactions/:id", adminController.fetchTransactions);

module.exports = router;
