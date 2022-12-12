"user strict";

const InstallerCustomerList = function (InstallerCustomerList) {
  this.id = InstallerCustomerList.id;
  this.residential_type_id = InstallerCustomerList.residential_type_id;
  this.installer_id = InstallerCustomerList.installer_id;
  this.status = InstallerCustomerList.status;

}

InstallerCustomerList.addCustomerList = function (installer, result) {
  connection.query("INSERT INTO ss_installer_customer_list set ?", installer, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

InstallerCustomerList.addCustomerMultipleList = function (installer, result) {
  var sql = "INSERT INTO ss_installer_customer_list (installer_id, residential_type_id, status) VALUES ?";
  var values = installer;
  connection.query(sql, [values], function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

InstallerCustomerList.read = function (result) {
  connection.query("SELECT * FROM ss_installer_customer_list", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

InstallerCustomerList.deleteCustomerList = function (id, result) {
  connection.query("DELETE FROM ss_installer_customer_list WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      console.log(res)
      result(null, res);
    }
  });
};

InstallerCustomerList.updateCustomerList = function (CustomerList, result) {
  connection.query("UPDATE ss_installer_customer_list SET ?", CustomerList, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = InstallerCustomerList;
