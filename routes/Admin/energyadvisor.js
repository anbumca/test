const express = require("express");
const router = express.Router();
const {
    readdata,
    addenergyadvisor,
    getenergyadvisor,
    editenergyadvisor,
    deleteData,
    activeupdate
} = require("../../controllers/Admin/energyadvisor");
const authorize = require("../../_middleware/authorize");

//router.post("/addcity", addData);
//router.post("/editcity/:id",editData);
//router.post("/deletecity/:id", deleteData);

router.get("/getdetails",readdata);
router.post("/get/details/:id",getenergyadvisor);
router.post("/adddetails",addenergyadvisor);
router.post("/editdetails/:id",editenergyadvisor);
router.post("/deletedetails/:id",deleteData);
router.post("/updatestatus/:id",activeupdate);

module.exports = router;