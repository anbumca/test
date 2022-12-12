const express = require("express");
const router = express.Router();
const {
    read
} = require("../../controllers/widget/resdential");
const authorize = require("../../_middleware/authorize");

router.get("/", read);

module.exports = router;

