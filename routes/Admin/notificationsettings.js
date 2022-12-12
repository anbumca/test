const express = require("express");
const router = express.Router();
const {
    addData,
    readdata
    
} = require("../../controllers/admin/notificationsettings");
const authorize = require("../../_middleware/authorize");

router.post("/addnotificationsettings", addData);
router.get("/get/details",readdata);


module.exports = router;