const jwt = require("jsonwebtoken");
const settings = require("../../models/widget/settings");

exports.settings = async (req, res) => {
  settings.read(function (err, setting) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(setting);
  });
};
