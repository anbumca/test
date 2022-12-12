const express = require("express");
const router = express.Router();
const {
    addData,
    readdata
    
} = require("../../controllers/admin/smtplist");
const authorize = require("../../_middleware/authorize");

router.post("/adddetails", addData);
router.get("/getdetails",readdata);


module.exports = router;