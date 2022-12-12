"user strict";

const resdential = function (resdential) {
  this.name = resdential.name,
  this.status = resdential.status || 1;
};

resdential.addData = function (residentialData, result) {
  connection.query("INSERT INTO ss_residential_list set ?", residentialData, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

resdential.editData = function (id, residentialData, result) {
  console.log(residentialData);
  console.log(id);
  connection.query("UPDATE ss_residential_list SET ? WHERE id = ?", [residentialData, id], function (
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


resdential.delete = function (id, result) {
  connection.query("UPDATE ss_residential_list SET status =0 WHERE id = ?", [id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

resdential.readdata = function (result) {
  connection.query("SELECT * FROM ss_residential_list", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
module.exports = resdential;
