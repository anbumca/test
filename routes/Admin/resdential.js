const express = require("express");
const router = express.Router();
const {
    addData,
    editData,
    deleteData,
    readdata
} = require("../../controllers/Admin/resdential");
//const authorize = require("../../_middleware/authorize");

router.post("/add",  addData);
router.post("/edit/:id", editData);
router.post("/delete/:id", deleteData);
router.get("/get/details",readdata);

module.exports = router;

