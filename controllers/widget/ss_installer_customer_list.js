// const jwt = require("jsonwebtoken");
const InstallerCustomerList = require("../../models/widget/ss_installer_customer_list");

exports.addCustomerList = async (req, res) => {
  if (!req.body.installer_id || !req.body.residential_type_id) {
    return res.status(422).json({
      installer_id: "installer_id is required",
      residential_type_id: "residential_type_id is required"
    });
  }
  const installer = new InstallerCustomerList(req.body);
  InstallerCustomerList.addCustomerList(installer, function (err, user) {
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

exports.getCustomerList = async (req, res) => {
  InstallerCustomerList.read(function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(Installer);
  });
};

exports.deleteCustomerList = async (req, res) => {
  if (!req.params.id) {
    return res.status(422).json({
      id: "id is required"
    });
  }
  InstallerCustomerList.deleteCustomerList(req.params.id, function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json({
      message: "Installer city list successfully deleted"
    });
  });
};


exports.updateCustomerList = async (req, res) => {
  if (!req.body.id) {
    return res.status(422).json({
      id: "id is required"
    });
  }
  const installer = new InstallerCustomerList(req.body);
  InstallerCustomerList.updateCustomerList(installer, function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json({
      message: "Installer city list successfully updated"
    });
  });
};
