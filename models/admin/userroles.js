"user strict";

const userroles = function (userroles) {
  this.name = userroles.name,
  this.status = userroles.status || 1;
};

userroles.addData = function (userrolesData, result) {
  connection.query("INSERT INTO ss_user_roles set ?", userrolesData, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

userroles.editData = function (id, userrolesData, result) {
  console.log(userrolesData);
  console.log(id);
  connection.query("UPDATE ss_user_roles SET ? WHERE id = ?", [userrolesData, id], function (
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


userroles.delete = function (id, result) {
  connection.query("Update ss_user_roles  SET status =0 WHERE id = ?", [id], function (
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

userroles.activeData = function (id,status, result) {
  connection.query("Update ss_user_roles  SET status =? WHERE id = ?", [status,id], function (
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

userroles.readdata = function (result) {
  connection.query("SELECT * FROM ss_user_roles order by id DESC", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

userroles.getuserroles = function (id, result) {
  connection.query("select * FROM ss_user_roles WHERE id = ?", [id], function (
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

module.exports = userroles;
