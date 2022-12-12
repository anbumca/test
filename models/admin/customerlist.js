"user strict";


const customerlist = function (customerlist) {
  this.installer_id = customerlist.installer_id;
  this.status = customerlist.project_status || 0;
   this.project_id = customerlist.project_id;
};

customerlist.readdata = function (result) {
  connection.query("SELECT pi.id as project_id,pi.address,pi.latitude,pi.longitude,pi.user_id,pi.project_type,pi.status,pi.bid_Status,u.first_name,u.last_name,i.first_name as installer_firstname,i.last_name as installer_lastname FROM ss_project_information as pi INNER JOIN ss_users  as u ON pi.user_id = u.id  LEFT JOIN ss_users as i on pi.installer_id = i.id order by pi.id desc", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

customerlist.readcustProduc = function (ids,result) {
  connection.query("SELECT * FROM ss_project_information where user_id = ?",ids, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

customerlist.updatecustProduc = function (id,customerlistdata,result) {
  console.log(id);
  console.log(customerlistdata.status);
  connection.query("Update ss_project_information set status=? where id = ?",[customerlistdata.status,id], (err, res) => {
    console.log(err);
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

customerlist.updateproductinst = function (customerlistdata,result) {
  //var sql = "INSERT INTO ss_installer_bit_product (installer_id, status, project_id) VALUES ?";
  //var values = customerlistdata;
  //console.log(customerlistdata);
    connection.query("SELECT * from ss_installer_bit_product where project_id= ? and installer_id = ?",[customerlistdata.project_id,customerlistdata.installer_id],function(err,res){
     if(err){
      result(err,null);
     }else{
       //console.log(res.length);
      if(res.length === 1)
      {
         result(null,'yes');
      }else{
        connection.query("INSERT INTO ss_installer_bit_product set ?",[customerlistdata], (err, res) => {
          //console.log(err);
          if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });
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

customerlist.getinstallerdetails = function (ids,result) {
  connection.query("SELECT u.first_name,u.last_name,lb.project_id,i.company_name FROM ss_installer_bit_product as lb INNER JOIN ss_users as u oN lb.installer_id = u.id  INNER JOIN ss_installer as i ON u.id = i.user_id where lb.project_id = ?",ids, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = customerlist;
