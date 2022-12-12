//const jwt = require("jsonwebtoken");
const Generalsettings = require("../../models/admin/generalsettings");

exports.addData = async (req, res) => {
  if (!req.body) {
    return res.status(422).json({
      google_clientid: "Google client id is required",
      google_secret_key: "Google secret key is required",
      google_apikey:"Google API key is required",
      facebook_apikey: "Facebook API key is required",
      facebook_secret_key: "Facebook secret key is required"
    });
  }
  const generalsettingsData = new Generalsettings(req.body);
  
  Generalsettings.validatesettings(generalsettingsData, function (err, generalsettingsData) {
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
 
  Generalsettings.readdata( function (err, generalSettings) {
    if (err) {
      return res.status(403).send(err);
    }
    if (generalSettings.length === 0) {
      res.json({message: "No Settings information"});
    } else {
      res.json(generalSettings);
    }
  });
};