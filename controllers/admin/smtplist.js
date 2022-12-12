//const jwt = require("jsonwebtoken");
const Smtplist = require("../../models/admin/smtplist");

exports.addData = async (req, res) => {
  if (!req.body) {
    return res.status(422).json({
      smtp_host: "Host is required",
      smtp_port: "Port is required",
      smtp_username:"Emailis required",
      smtp_password: "Password is required",
      smtp_status: "Statusis required"
    });
  }
  const SmtplistData = new Smtplist(req.body);
  
  Smtplist.validatesettings(SmtplistData, function (err, generalsettingsData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully added settings",
        status_code: 1
      });
    }
  });
};
exports.readdata = async (req, res) => {
 
  Smtplist.readdata( function (err, smtplist) {
    if (err) {
      return res.status(403).send(err);
    }
    if (smtplist.length === 0) {
      res.json({message: "No Settings information"});
    } else {
      res.json(smtplist);
    }
  });
};