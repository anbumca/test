//const jwt = require("jsonwebtoken");
const Notificationsettings = require("../../models/Admin/notificationsettings");

exports.addData = async (req, res) => {
  if (!req.body) {
    return res.status(422).json({
      notification_private_key: "Notification private key is required",
      notification_public_key: "Notification  public key is required",
      status:"status is required"
      
    });
  }
  const notificationsettingsData = new Notificationsettings(req.body);
  
  Notificationsettings.validatesettings(notificationsettingsData, function (err, notificationsettingsData) {
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
 
  Notificationsettings.readdata( function (err, notificationsettings) {
    if (err) {
      return res.status(403).send(err);
    }
    if (notificationsettings.length === 0) {
      res.json({message: "No Settings information"});
    } else {
      res.json(notificationsettings);
    }
  });
};