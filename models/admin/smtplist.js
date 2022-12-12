"user strict";

//const connection = require("../../database/mysqlDB");

const smtplist = function (smtplist) {
  this.smtp_host = smtplist.smtp_host,
  this.smtp_port = smtplist.smtp_port,
  this.smtp_username =smtplist.smtp_username,
  this.smtp_password=smtplist.smtp_password,
  this.smtp_status =smtplist.smtp_status,
  this.sendgrid_key = smtplist.sendgrid_key
};

smtplist.validatesettings = function (smtplist, result) {
  connection.query("select * from ss_smtp_settings",function(err,res){
     if(err){
      result(null, err);
     }else{
      
      if(res.length === 0)
      {
        connection.query("INSERT INTO ss_smtp_settings set ?", smtplist, function (err, res) {
          if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });
      }else{
        connection.query("UPDATE ss_smtp_settings SET ? ", smtplist, function (
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
smtplist.readdata = function (result) {
  connection.query("SELECT * FROM ss_smtp_settings", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = smtplist;
