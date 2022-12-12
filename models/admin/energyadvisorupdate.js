"user strict";


const energyadvisor = function (energyadvisor) {
 this.first_name= energyadvisor.first_name;
 this. last_name = energyadvisor.last_name;
 this.email =energyadvisor.email;
 this.status = energyadvisor.status;
 this.phone_number = energyadvisor.phonenumber;
 this.user_type =1;
};


energyadvisor.editenergyadvisor = function (id,energyadvisorlist,result) {
      //console.log(energyadvisorlist);
  connection.query("UPDATE ss_users SET ? where id=?",[energyadvisorlist,id],function(err,res){
    if(err)
    {
      result(err,null);
    }else{
      console.log(res);
      result(null,res);
    }
  });


};

energyadvisor.profileImageUpload = function (profile_image, id, result) {
  
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


module.exports = energyadvisor;
