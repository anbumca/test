const express = require("express");
const router = express.Router();
const {
    addData,
    editData,
    deleteData,
    readdata
} = require("../../controllers/admin/citylist");
const authorize = require("../../_middleware/authorize");

router.post("/addcity", addData);
router.post("/editcity/:id",editData);
router.post("/deletecity/:id", deleteData);
router.get("/get/details",readdata);

module.exports = router;