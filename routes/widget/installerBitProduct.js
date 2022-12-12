const express = require("express");
const router = express.Router();
const { addBitProduc, getBitProduc } = require("../../controllers/widget/installerBitProduct");

router.post("/add", addBitProduc);
router.post("/get/:project_id", getBitProduc);

module.exports = router;
