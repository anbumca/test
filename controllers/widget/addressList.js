// const jwt = require("jsonwebtoken");
const addressList = require("../../models/widget/addressList");

exports.addAddress = async (req, res) => {
  if (!req.body.city_name || !req.body.state_name || !req.body.country_name || !req.body.zipcode) {
    return res.status(422).json({
      city_name: "city_name is required",
      state_name: "state_name is required",
      country_name: "country_name is required",
      zipcode: "zipcode is required"
    });
  }
  const installer = new addressList(req.body);
  addressList.add(installer, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "City list successfully added",
        status_code: 1
      });
    }
  });
};

exports.getAddress = async (req, res) => {
  addressList.read(function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(Installer);
  });
};
