const express = require("express");
const router = express.Router();
const {
  search
} = require("../../controllers/widget/search");
const authorize = require("../../_middleware/authorize");

router.post("/", search);

module.exports = router;
