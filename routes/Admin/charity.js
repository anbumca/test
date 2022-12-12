const express = require("express");
const router = express.Router();
const {
    addData,
    editData,
    deleteData,
    readdata,
    activedata
} = require("../../controllers/Admin/charity");
//const authorize = require("../../_middleware/authorize");

router.post("/add",  addData);
router.post("/edit/:id", editData);
router.post("/delete/:id", deleteData);
router.get("/get/details",readdata);
router.post("/activedata", activedata);
module.exports = router;

