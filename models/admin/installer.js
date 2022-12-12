"user strict";

const installer = function (installer) {
 this.installer_id= installer.installer_id;
 this.status = installer.status || 0;
 this.project_id =installer.project_id ||0;
 this.first_name = installer.first_name;
 this.last_name =installer.last_name;
 this.phone_number = installer.phonenumber;
 this.profile_address = installer.address;
};

installer.readdata = function (result) {
  connection.query("SELECT  u.id,u.first_name,u.last_name,u.email,u.phone_number,u.status,i.company_name,i.headquater_address from ss_users as u inner join ss_installer as i ON u.id = i.user_id where u.user_type =2 order by u.id DESC", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


installer.activeinstaller = function(installerlistdata,result){
 //console.log(installerlistdata);
  connection.query("UPDATE ss_users SET status = ? where id= ?",[installerlistdata.status,installerlistdata.installer_id], function(
    err, 
    res) {

    if(err)
    {
      result(err,null);
    }else{
      if(installerlistdata.status === '1')
      {
        
        result(null,"yes");
      }else{
        
        result(null,"no");
      }
      
    }
  });
};

installer.getuser = function (id,result){

  connection.query("Select id,first_name,last_name,email from ss_users where id=?",[id], (err, res) => {
    if(err)
    {
      result(err,null);
    }else{
      result(null,res);
    }
  });
};

installer.getprojectlist = function (result) {
  connection.query("SELECT pi.id,pi.address,pi.latitude,pi.longitude,pi.status,u.first_name,u.last_name FROM ss_project_information as pi INNER JOIN ss_users as u ON u.id = pi.user_id", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

installer.assignproject = function  (installerdata,result){
  connection.query("SELECT * from ss_installer_bit_product where project_id= ? and installer_id = ?",[installerdata.project_id,installerdata.installer_id],(err,res)=>{
    if(err){
      result(err,null);
    }else{
      //console.log(res);
      if(res.length === 1)
      {
        result(null,"yes");
      }else{
        connection.query("INSERT INTO ss_installer_bit_product SET installer_id =?, status =?,project_id=?",[installerdata.installer_id,installerdata.status,installerdata.project_id],function(err,res){
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

installer.getinstallerdetails = function  (id,result){
 connection.query("Select u.id,u.first_name,u.last_name,u.email,u.phone_number,i.company_name,i.headquater_address,i.website,i.licence_number from ss_users as u inner join ss_installer as i ON u.id = i.user_id where u.id =?",id,function(err,res){
    if(err)
    {
      result(err,null);
    }else{
      result(null,res);
    }
 });
};


installer.editinstaller = function  (installerdata,result){
  //console.log(installerdata);
  connection.query("UPDATE ss_users SET first_name=? , last_name =? , phone_number =?, profile_address = ? where id = ? ",[installerdata.first_name,installerdata.last_name,installerdata.phone_number,installerdata.profile_address,installerdata.installer_id],function(err,res){

    if(err)
    {
      result(err,null);
    }else{
      result(null,res);
    }
  });
};
module.exports = installer;
