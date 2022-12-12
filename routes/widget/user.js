const express = require("express");
const router = express.Router();
const {
  register,
  readUser,
  updateUser,
  deleteUser,
  login,
  google,
  facebook,
  forgetpassword,adminforgetpassword
} = require("../../controllers/widget/user");
const { addAuroraUser } = require("../../controllers/widget/aurora");
const authorize = require("../../_middleware/authorize");


router.post("/register", register);
router.post("/aurora/user", addAuroraUser);

router.post("/login", login);
router.post("/login/google", google);
router.post("/login/facebook", facebook);

router.get("/userdata/:userId", readUser);

router.post("/user/:userId", authorize, updateUser);

router.delete("/user/:userId", authorize, deleteUser);
router.post("/forgetpassword",forgetpassword);
router.post("/adminforgetpassword",adminforgetpassword);

module.exports = router;
