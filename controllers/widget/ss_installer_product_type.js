// const jwt = require("jsonwebtoken");
const InstallerProductType = require("../../models/widget/ss_installer_product_type");

exports.addProductType = async (req, res) => {
  if (!req.body.installer_id || !req.body.product_type_id) {
    return res.status(422).json({
      installer_id: "installer_id is required",
      product_type_id: "product_type_id is required"
    });
  }
  const installer = new InstallerProductType(req.body);
  InstallerProductType.addProductType(installer, function (err, user) {
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

exports.getProductType = async (req, res) => {
  InstallerProductType.read(function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(Installer);
  });
};

exports.deleteProductType = async (req, res) => {
  if (!req.params.id) {
    return res.status(422).json({
      id: "id is required"
    });
  }
  InstallerProductType.deleteProductType(req.params.id, function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json({
      message: "Installer city list successfully deleted"
    });
  });
};


exports.updateProductType = async (req, res) => {
  if (!req.body.id) {
    return res.status(422).json({
      id: "id is required"
    });
  }
  const installer = new InstallerProductType(req.body);
  InstallerProductType.updateProductType(installer, function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json({
      message: "Installer city list successfully updated"
    });
  });
};
