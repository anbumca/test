const express = require("express");
const router = express.Router();
const {
    readdata,
    getcustomer,
    editcustomer,
    deletecustomer,
    activecustomer
} = require("../../controllers/Admin/customer");
const authorize = require("../../_middleware/authorize");

//router.post("/addcity", addData);
//router.post("/editcity/:id",editData);
//router.post("/deletecity/:id", deleteData);

router.get("/get/details",readdata);
router.get("/getcustomer/:id",getcustomer);
router.post("/editcustomer/:id",editcustomer);
router.post("/deletecustomer/:id",deletecustomer);
router.post("/activecustomer/:id",activecustomer);



module.exports = router;