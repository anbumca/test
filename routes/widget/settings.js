const express = require("express");
const router = express.Router();
const { settings } = require("../../controllers/widget/settings");
const { addAddress, getAddress } = require("../../controllers/widget/addressList");
const authorize = require("../../_middleware/authorize");

router.get("/", authorize, settings);
router.post("/add/address", addAddress);
router.get("/get/address", getAddress);

module.exports = router;
