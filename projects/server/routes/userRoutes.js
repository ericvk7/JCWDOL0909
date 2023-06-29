const express = require("express");
const { userController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/fetchAddress", verifyToken, userController.fetchAddress);
router.get("/fetchMainAddress", verifyToken, userController.fetchMainAddress);
// router.get("/", userController.fetchProduct);
router.patch("/edit", verifyToken, userController.editProfile);
router.post(
  "/uploadProfilePicture",
  verifyToken,
  upload.single("file"),
  userController.uploadProfilePic
);
router.post("/addAddress", verifyToken, userController.addAddress);
router.patch("/setMainAddress", verifyToken, userController.addMainAddress);
router.patch("/editAddress", userController.editAddress);
router.delete("/deleteAddress", userController.deleteAddress);

module.exports = router;
