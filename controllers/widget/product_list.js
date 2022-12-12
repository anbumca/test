// const jwt = require("jsonwebtoken");
const Products = require("../../models/widget/product_list");

exports.addedNewProduct = async (req, res) => {
  if (!req.body.name || !req.body.status) {
    return res.status(422).json({
      name: "name is required",
      status: "status is required"
    });
  }
  const products = new Products(req.body);
  Products.addedNewProduct(products, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "product successfully added",
        status_code: 1
      });
    }
  });
};

exports.getProducts = async (req, res) => {
  Products.read(function (err, products) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(products);
  });
};
