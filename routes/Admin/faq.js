const express = require("express");
const router = express.Router();
const { faq,addData ,deleteData, editData, getFaq} = require("../../controllers/admin/faq");

router.get("/:id", faq);
router.post("/add", addData);
router.post("/edit/:id",  editData);
router.post("/delete/:id", deleteData);
router.post("/get", getFaq);


module.exports = router;
