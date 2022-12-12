const express = require("express");
const router = express.Router();
const { bids, readbid, deletebid, readCharity } = require("../../controllers/widget/bidlist");

router.post("/getproject/:project_id", bids);
router.post("/getbid/:id", readbid);
router.post("/deletebid/:id", deletebid);
router.get("/get/charity", readCharity);

module.exports = router;
