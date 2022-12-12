"user strict";

const Products = function (Product) {
  this.name = Product.name;
  this.status = Product.status;
  this.description = Product.description;
  this.product_image = Product.product_image;
};

Products.addedNewProduct = function (product, result) {
  connection.query("INSERT INTO ss_product_list set ?", product, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

Products.read = function (result) {
  connection.query("SELECT * FROM ss_product_list", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Products;
