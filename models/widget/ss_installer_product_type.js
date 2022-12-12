"user strict";

const InstallerProductType = function (InstallerProductType) {
  this.id = InstallerProductType.id;
  this.product_type_id = InstallerProductType.product_type_id;
  this.installer_id = InstallerProductType.installer_id;
  this.status = InstallerProductType.status;

}

InstallerProductType.addProductType = function (installer, result) {
  connection.query("INSERT INTO ss_installer_product_list set ?", installer, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}


InstallerProductType.addMultipleProductType = function (installer, result) {
  var sql = "INSERT INTO ss_installer_product_list (installer_id, product_type_id, status) VALUES ?";
  var values = installer;
  connection.query(sql, [values], function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}


InstallerProductType.read = function (result) {
  connection.query("SELECT * FROM ss_installer_product_list", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

InstallerProductType.deleteProductType = function (id, result) {
  connection.query("DELETE FROM ss_installer_product_list WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      console.log(res)
      result(null, res);
    }
  });
};

InstallerProductType.updateProductType = function (ProductType, result) {
  connection.query("UPDATE ss_installer_product_list SET ?", ProductType, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = InstallerProductType;
