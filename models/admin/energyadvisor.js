"user strict";


const energyadvisor = function (energyadvisor) {
 this.first_name= energyadvisor.first_name;
 this. last_name = energyadvisor.last_name;
 this.email =energyadvisor.email;
 this.password = energyadvisor.password;
 this.status = energyadvisor.status;
 this.phone_number = energyadvisor.phonenumber;
 this.user_type =1;
};

energyadvisor.addadvisor = function (energyadvisorlist,result) {
  connection.query("SELECT * FROM ss_users where email = ?",[energyadvisorlist.email], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if(res.length=== 1)
      {
        result(null,"yes");
      }else{
        connection.query("INSERT INTO ss_users SET ?",energyadvisorlist,function(err,res){
          if(err)
          {
            result(err,null);
          }else{
            result(null,res);
          }
        });
      }
    }
  });
};

energyadvisor.profileImageUpload = function (profile_image, id, result) {
  console.log(profile_image);
  console.log(id);
  connection.query("UPDATE ss_users SET profile_image = ? WHERE id = ?", [profile_image, id], function (
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

energyadvisor.readdata = function (result) {
  connection.query("SELECT * FROM ss_users where user_type = 1 order by id desc", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


energyadvisor.getenergyadvisor = function (id,result) {
  connection.query("SELECT * FROM ss_users where id = ?",id,function (err, res){
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


energyadvisor.delete = function (id,status,result) {
      
  connection.query("UPDATE ss_users SET status=? where id=?",[status,id],function(err,res){
    if(err)
    {
      result(err,null);
    }else{
      result(null,res);
    }
  });


};


energyadvisor.activeupdate = function (id,status,result) {
      
  connection.query("UPDATE ss_users SET status=? where id=?",[status,id],function(err,res){
    if(err)
    {
      result(err,null);
    }else{
      if(status === '1')
      {
        result(null,'yes');
      }else{
      result(null,res);
        
      }
    }
  });

};
module.exports = energyadvisor;
