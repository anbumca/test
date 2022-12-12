"user strict";

const addressList = function (addressList) {
  this.city_name = addressList.city_name;
  this.state_name = addressList.state_name;
  this.country_name = addressList.country_name;
  this.zipcode = addressList.zipcode;
  this.status = addressList.status || 0;
}

addressList.add = function (installer, result) {
  connection.query("INSERT INTO ss_zipcode set ?", installer, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

addressList.read = function (result) {
  connection.query("SELECT * FROM ss_zipcode", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = addressList;
