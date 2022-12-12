"user strict";

//const connection = require("../../database/mysqlDB");

const generalsettings = function (generalsettings) {
  this.google_client_id = generalsettings.google_clientid,
  this.google_client_secret_key = generalsettings.google_secret_key,
  this.facebook_api_key =generalsettings.facebook_apikey,
  this.facebook_api_secret_key=generalsettings.facebook_secret_key,
  this.google_api_key =generalsettings.google_apikey
};

generalsettings.validatesettings = function (generalsettings, result) {
  connection.query("select * from ss_settings",function(err,res){
     if(err){
      result(null, err);
     }else{
      
      if(res.length === 0)
      {
        connection.query("INSERT INTO ss_settings set ?", generalsettings, function (err, res) {
          if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });
      }else{
        connection.query("UPDATE ss_settings SET ? ", generalsettings, function (
          err,
          res
        ) {
          if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });
      }
     }
  })
}
generalsettings.readdata = function (result) {
  connection.query("SELECT * FROM ss_settings", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = generalsettings;
