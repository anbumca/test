const express = require("express");
const router = express.Router();
const {
    readdata,
    addproductlist,
    getprodutlist,
    editproductlist,
    deleteData
    
} = require("../../controllers/Admin/projectlist");
const authorize = require("../../_middleware/authorize");


router.post("/deleteproduct/:id", deleteData);

router.get("/get/details",readdata);
//router.get("/getprojectlist",getprojectlist);
router.post("/addproductlist",addproductlist);
router.post("/getprodutlist/:id",getprodutlist);
router.post("/editproductlist/:id",editproductlist);


module.exports = router;