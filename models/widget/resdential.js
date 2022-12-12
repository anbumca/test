"user strict";

const resdential = function (resdential) {
  this.name = resdential.name,
  this.status = resdential.status
};

resdential.read = function (result) {
  // TODO: need to update proper SQL query
  connection.query("SELECT * FROM ss_residential_list WHERE status != 1", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

resdential.insert = function (resdential, result) {
  connection.query("INSERT INTO ss_residential_list set ?", resdential, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

module.exports = resdential;
