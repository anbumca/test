const express = require("express");
const router = express.Router();
const { faq } = require("../../controllers/widget/faq");

router.post("/getlist", faq);

module.exports = router;
