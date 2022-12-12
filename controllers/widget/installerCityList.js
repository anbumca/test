// const jwt = require("jsonwebtoken");
const InstallerCityList = require("../../models/widget/installerCityList");

exports.addCityList = async (req, res) => {
  if (!req.body.installer_id || !req.body.city_id) {
    return res.status(422).json({
      installer_id: "installer_id is required",
      city_id: "city_id is required"
    });
  }
  const installer = new InstallerCityList(req.body);
  InstallerCityList.addCityList(installer, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Installer city list successfully added",
        status_code: 1
      });
    }
  });
};

exports.getCityList = async (req, res) => {
  InstallerCityList.read(function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(Installer);
  });
};

exports.deleteCityList = async (req, res) => {
  if (!req.params.id) {
    return res.status(422).json({
      id: "id is required"
    });
  }
  InstallerCityList.deleteCityList(req.params.id, function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json({
      message: "Installer city list successfully deleted"
    });
  });
};


exports.updateCityList = async (req, res) => {
  if (!req.body.id) {
    return res.status(422).json({
      id: "id is required"
    });
  }
  const installer = new InstallerCityList(req.body);
  InstallerCityList.updateCityList(installer, function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json({
      message: "Installer city list successfully updated"
    });
  });
};
