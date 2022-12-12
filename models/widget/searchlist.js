"user strict";

const search = function (search) {
  this.name=search.name;
  this.email = search.email;
  this.phonenumber = search.phonenumber;
  this.address = search.address;
};

search.read = function (search, result) {
  // TODO: need to update proper SQL query, [search.city, search.zipcode]
  connection.query("SELECT * FROM ss_product_list WHERE status != 1", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


search.updatecommerical = function ( searchdata, result) {
  
  connection.query("INSERT INTO ss_usercommerical set ?", searchdata, function (
    err,
    res
  ) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = search;
