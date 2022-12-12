// const jwt = require("jsonwebtoken");
const installerBitProduct = require("../../models/widget/installerBitProduct");

exports.addBitProduc = async (req, res) => {
  if (!req.body.installer_id || !req.body.user_id) {
    return res.status(422).json({
      installer_id: "installer_id is required",
      user_id: "iser_id is required"
    });
  }
  console.log(req.body);
  const installer = new installerBitProduct(req.body);
  installerBitProduct.addBitProduc(installer, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    } else {
      console.log('user...........................');
      console.log(user);
      res.status(200).json({
        message: "Bit successfully added",
        status_code: 1
      });
    }
  });
};

exports.getBitProduc = async (req, res) => {
  if (!req.params.project_id) {
    return res.status(422).json({
      ProjectId: "Proejct Id is required"
    });
  }
  installerBitProduct.readBitProduc(req.params.project_id, function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(Installer);
  });
};
