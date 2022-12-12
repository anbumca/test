const express = require("express");
const router = express.Router();
const {
    addData,
    editData,
    deleteData,
    readdata,
    getcmsdata
} = require("../../controllers/admin/cmsdata");
const authorize = require("../../_middleware/authorize");

router.post("/addcms", addData);
router.post("/editcms/:id",editData);
router.get("/get/details",readdata);
router.get("/getcms/:id",getcmsdata)

module.exports = router;