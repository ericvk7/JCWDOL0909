const express = require("express");
const { userController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get("/user/:id", verifyToken, userController.fetchUser);
router.patch("/user/profile/:id", verifyToken, userController.editProfile);
