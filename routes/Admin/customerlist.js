const express = require("express");
const router = express.Router();
const {
    readdata,
    getcustProduc,
    updatecustproduc,
    updateproductinst,
    projectbidlist,
    updatebidstatus,
    getinstdetails,
    getprojectdetails,
    getinstallerdetails
} = require("../../controllers/admin/customerlist");
const authorize = require("../../_middleware/authorize");

//router.post("/addcity", addData);
//router.post("/editcity/:id",editData);
//router.post("/deletecity/:id", deleteData);
router.post("/getproductlist/:user_id", getcustProduc);
router.post("/updateproduct/:proj_id", updatecustproduc);
router.post("/updateproductinst/", updateproductinst);
router.post("/projectbidlist/:proj_id",projectbidlist);
router.post("/updatebidstatus/",updatebidstatus);
router.get("/getinstallerlist/",getinstdetails);
router.get("/get/details",readdata);
router.post("/getprojectdetails/:project_id",getprojectdetails);
router.post("/getinstallerdetails/:project_id",getinstallerdetails);


module.exports = router;