"user strict";

const InstallerCityList = function (installerCityList) {
  this.id = installerCityList.id;
  this.installer_id = installerCityList.installer_id;
  this.city_id = installerCityList.city_id;
  this.status = installerCityList.status || 1;

}

InstallerCityList.addCityList = function (installer, result) {
  var sql = "INSERT INTO ss_installer_city_list (installer_id, city_id, status) VALUES ?";
  var values = installer;
  connection.query(sql, [values], function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

InstallerCityList.read = function (result) {
  connection.query("SELECT * FROM ss_installer_customer_list", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

InstallerCityList.deleteCityList = function (id, result) {
  connection.query("DELETE FROM ss_installer_customer_list WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      console.log(res)
      result(null, res);
    }
  });
};

InstallerCityList.updateCityList = function (citylist, result) {
  connection.query("UPDATE ss_installer_customer_list SET ?", citylist, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = InstallerCityList;
