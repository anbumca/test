"user strict";

//const connection = require("../../database/mysqlDB");

const notificationsettings = function (notificationsettings) {
  this.notification_private_key = notificationsettings.notification_private_key,
  this.notification_public_key = notificationsettings.notification_public_key,
  this.status =notificationsettings.status
 };

notificationsettings.validatesettings = function (notificationsettings, result) {
  connection.query("select * from ss_notification_settings",function(err,res){
     if(err){
      result(null, err);
     }else{
      
      if(res.length === 0)
      {
        connection.query("INSERT INTO ss_notification_settings set ?", notificationsettings, function (err, res) {
          if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });
      }else{
        connection.query("UPDATE ss_notification_settings SET ? ", notificationsettings, function (
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
notificationsettings.readdata = function (result) {
  connection.query("SELECT * FROM ss_notification_settings", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = notificationsettings;
