const express = require("express");
const router = express.Router();
const {
  search,
  updatecommerical
} = require("../../controllers/widget/searchlist");
const authorize = require("../../_middleware/authorize");

router.post("/", search);
router.post("/updatecommerical", updatecommerical);

module.exports = router;
