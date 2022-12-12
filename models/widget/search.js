"user strict";

const search = function (search) {};

search.read = function (search, result) {
  // TODO: need to update proper SQL query
  connection.query("SELECT * FROM ss_product_list WHERE status != 1", [search.city, search.zipcode], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = search;
