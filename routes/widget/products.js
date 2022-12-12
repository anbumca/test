const express = require("express");
const router = express.Router();
const {
  addedNewProduct,
  getProducts
} = require("../../controllers/widget/products");
const authorize = require("../../_middleware/authorize");

router.post("/add", authorize, addedNewProduct);

router.post("/getProduct", authorize, getProducts);

module.exports = router;
