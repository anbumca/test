const express = require("express");
const router = express.Router();
const {
    addData,
    readdata
    
} = require("../../controllers/Admin/generalsettings");
const authorize = require("../../_middleware/authorize");

router.post("/addgeneralsettings", addData);
router.get("/get/details",readdata);


module.exports = router;