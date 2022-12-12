const express = require("express");
const router = express.Router();
const {
    readdata,
    activeinstaller,
    assignproject,
    getprojectlist,
    getinstallerdetails,
    editinstaller,
    getinstdetails
} = require("../../controllers/admin/installer");
const authorize = require("../../_middleware/authorize");

//router.post("/addcity", addData);
//router.post("/editcity/:id",editData);
//router.post("/deletecity/:id", deleteData);

router.get("/get/details",readdata);
router.get("/getprojectlist",getprojectlist);
router.post("/activeinstaller",activeinstaller);
router.post("/assignproject",assignproject);
router.post("/getinstallerdetails/:id",getinstallerdetails);
router.post("/editinstaller",editinstaller);

module.exports = router;