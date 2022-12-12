const express = require("express");
const router = express.Router();
const {
    addData,
    editData,
    deleteData,
    readdata,
    getuserdata,
    activedata
} = require("../../controllers/Admin/userroles");
const authorize = require("../../_middleware/authorize");

router.post("/adduserroles", addData);
router.post("/edituserroles/:id",editData);
router.post("/deleteuserroles/:id", deleteData);
router.get("/get/details",readdata);
router.get("/getuserroles/:id",getuserdata);
router.post("/activedata", activedata);

module.exports = router;