"user strict";

const UpdateInstaller = function (installer) {
    this.id = installer.id;
    this.email = installer.email;
    this.password = installer.password;
    this.first_name =installer.firstname;
    this.last_name =installer.lastname;
    this.phonenumber = installer.phonenumber;
    this.address = installer.address;
    this.isPasswordChanged= installer.isPasswordChanged;
  
  };
  
  UpdateInstaller.updateinstaller = function ( installer,result) {
    console.log(installer);
    if(installer.isPasswordChanged === 1)
    {
      connection.query("UPDATE ss_users SET first_name = ?, last_name= ?, phone_number=? ,email=?,password=?,profile_address=? WHERE id = ?", [installer.first_name, installer.last_name, installer.phonenumber,installer.email,installer.password,installer.address,installer.id], function (
        err,
        res
      ) {
        if (err) {
          result(null, err);
        } else {
          result(null, res);
        }
      });
    }else{
      connection.query("UPDATE ss_users SET first_name = ?, last_name= ?, phone_number=? ,email=?,profile_address=? WHERE id = ?", [installer.first_name, installer.last_name, installer.phonenumber,installer.email,installer.address,installer.id], function (
        err,
        res
      ) {
        if (err) {
          result(null, err);
        } else {
          result(null, res);
        }
      });
    }
   
  };

  UpdateInstaller.imageUpload = function (installer, id, result) {
    connection.query("UPDATE ss_users SET profile_image = ?  WHERE id = ?", [installer, id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  UpdateInstaller.deleteimage = function (id, result) {
    connection.query("UPDATE ss_users SET profile_image = ''  WHERE id = ?", [id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  module.exports = UpdateInstaller;
  