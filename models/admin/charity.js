"user strict";

const charity = function (charity) {
  this.charity_name = charity.charity_name;
  this.start_date = charity.start_date;
  this.end_date = charity.end_date;
  this.charity_percentage = charity.charity_percentage;
  this.charity_total_amount = charity.total_amount;
  this.status = charity.status || 1;
};

charity.addData = function (charityData, result) {
  connection.query("INSERT INTO ss_charity_list set ?", charityData, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

charity.editData = function (id, charityData, result) {
  console.log(charityData);
  console.log(id);
  connection.query("UPDATE ss_charity_list SET ? WHERE id = ?", [charityData, id], function (
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


charity.delete = function (id, result) {
  connection.query("UPDATE ss_charity_list SET status =0 WHERE id = ?", [id], function (
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

charity.readdata = function (result) {
  connection.query("SELECT * FROM ss_charity_list ORDER BY id desc", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


charity.activeData = function (id,status, result) {
  connection.query("Update ss_charity_list  SET status =? WHERE id = ?", [status,id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      if(status === '1')
      {
        result(null, res);
      }else{
        result(null,'yes');
      }
      
    }
  });
};
module.exports = charity;
