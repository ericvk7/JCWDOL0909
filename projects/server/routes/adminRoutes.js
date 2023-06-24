const express = require("express");
const { adminController } = require("../controllers");

const router = express.Router();

// router.get("/", categoryController.fetchAllCategories);
router.post("/login", adminController.login);

module.exports = router;
