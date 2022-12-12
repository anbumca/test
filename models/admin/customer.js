"user strict";

const customerlist = function (customerlist) {
  this.first_name = customerlist.first_name;
  this.last_name = customerlist.last_name;
   this.email = customerlist.email;
   this.phone_number = customerlist.phone_number;
};

customerlist.readdata = function (result) {
  connection.query("SELECT * from ss_users where user_type = 3 order by id desc", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

customerlist.getcustomer = function (ids,result) {
  connection.query("SELECT * FROM ss_users where id = ?",ids, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

customerlist.updatecustomer = function (id,customerlistdata,result) {
  
  connection.query("Update ss_users set ? where id = ?",[customerlistdata,id], (err, res) => {
    console.log(err);
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

customerlist.deletecustomer = function (id,result) {
 
  connection.query("Update ss_users set status =0 where id =?",[id], (err, res) => {
    console.log(err);
    if (err) {
      result(err, null);
    } else {
      if(status === '1')
      {
        result(null,'yes');
      }else{
        result(null,res);
      }
      
    }
  });
};

customerlist.projectbidlist = function (ids,result) {
  connection.query("SELECT * FROM ss_bit_plan where project_id = ?",ids, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

customerlist.assignbidcust = function (ids,result) {
  connection.query("UPDATE ss_bit_plan SET user_visible_status = 1 where id =? ",ids, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

customerlist.getinstdetails = function (result) {
  connection.query("SELECT u.id,u.first_name,u.last_name,i.company_name FROM ss_users as u INNER JOIN ss_installer as i ON i.user_id = u.id where user_type = 2 order by u.id DESC", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


customerlist.getprojectdetails = function (ids,result) {
  connection.query("SELECT * FROM ss_project_information where id = ?",ids, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

customerlist.deletecustomer = function (id,result) {
 
  connection.query("Update ss_users set status =0 where id =?",[id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
     
        result(null,res);
      
    }
  });
};

customerlist.activecustomer = function (id,status,result) {
 
  connection.query("Update ss_users set status =? where id =?",[status,id], (err, res) => {
    console.log(err);
    if (err) {
      result(err, null);
    } else {
      if(status === '1')
      {
        result(null,'yes');
      }else{
        result(null,res);
      }
      
    }
  });
};

module.exports = customerlist;
