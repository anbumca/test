"user strict";

const cmsdata = function (cmsdata) {
  this.title =cmsdata.title,
  this.content = cmsdata.content,
  this.status = cmsdata.status || 1;
};

cmsdata.addData = function (cmsdata, result) {
  connection.query("INSERT INTO ss_cms set ?", cmsdata, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

cmsdata.editData = function (id, cmsdata, result) {
  //console.log(userrolesData);
  //console.log(id);
  connection.query("UPDATE ss_cms SET ? WHERE id = ?", [cmsdata, id], function (
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


cmsdata.readdata = function (result) {
  connection.query("SELECT * FROM ss_cms", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

cmsdata.getcmsdata = function (id, result) {
  connection.query("select * FROM ss_cms WHERE id = ?", [id], function (
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

module.exports = cmsdata;
