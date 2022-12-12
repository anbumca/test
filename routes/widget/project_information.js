const express = require("express");
const router = express.Router();
const {
    add, imagePdf, read, getImages, readInvites, user_read,declineproject,projectread,panelimagePdf,projectdelete,biddetails,projectstatusupdate
} = require("../../controllers/widget/project_information");

router.post("/add", add);
router.post("/get/details/:installer_id", read);
router.post("/get/user/details/:user_id", user_read);
router.post("/get/read/invites/:installer_id", readInvites);
router.post("/upload-panel-box-pictures/:project_id", panelimagePdf);
router.post("/upload-utility-graph/:project_id", imagePdf);
router.post("/get/imagedetail/:project_id", getImages);
router.post("/updateproject",declineproject);
router.post("/get/projectdetails", projectread);
router.post("/deleteproject/:project_id",projectdelete);
router.post("/get/biddetails/:project_id",biddetails);
router.post("/projectstatus",projectstatusupdate);
module.exports = router;

