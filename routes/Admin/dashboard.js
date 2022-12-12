const express = require("express");
const router = express.Router();
const {getProject, getBit,getbiddetails,getbidoverview} = require("../../controllers/admin/dashboard");

router.post("/getproject", getProject);
router.post("/invites", getBit);
router.post("/getbiddetails/:id",getbiddetails);
router.post("/getbidoverview/:id",getbidoverview);


module.exports = router;
