const express = require("express");
const router = express.Router();
const {
  addedNewProduct,
  getProducts
} = require("../../controllers/widget/product_list");

router.post("/add", addedNewProduct);

router.post("/getProduct", getProducts);

module.exports = router;
