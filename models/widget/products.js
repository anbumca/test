"user strict";

const Products = function (Product) {
  this.id = Product.id;
  this.name = Product.name;
  this.status = Product.status;
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

Products.read = function (product, result) {
  connection.query("SELECT * FROM ss_product_list WHERE name = ?", [product.name], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Products;
