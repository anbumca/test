// const jwt = require("jsonwebtoken");
const Installer = require("../../models/widget/installer");
const User = require("../../models/widget/user");
const InstallerCityList = require("../../models/widget/installerCityList");
const InstallerCustomerList = require("../../models/widget/ss_installer_customer_list");
const InstallerProductType = require("../../models/widget/ss_installer_product_type");
const bcrypt = require('bcrypt');

exports.addInstaller = async (req, res) => {
  if (!req.body.company_name) {
    return res.status(422).json({
      company_name: "company_name is required"
    });
  }
  const user = new User({
    "email": req.body.email,
    "phone_number": req.body.phone_number,
    "user_type": 2,
    "password": bcrypt.hashSync('Welcome123!',10),
    "status": 0
  });
  User.validateUsers(user, function (err, user) {
    console.log(user);
    if (err) {
      return res.status(403).send(err);
    }else{
      if(user === "yes")
      {
        console.log("qwe");
        res.status(200).json({
          message: "Already User Exist!",
          status_code: -1
        });
      }else{

        User.readEmail(req.body.email, function (err, user) {
          if (err) {
            return res.status(403).send(err);
          }
          req.body['user_id'] = user[0].id;
          const installer = new Installer(req.body);
          Installer.add(installer, function (err, responce) {
            if (err) {
              return res.status(403).send(err);
            } else {
              let dataTransfer = [];
              for (const a in req.body.city) {
                dataTransfer.push([responce.insertId, req.body.city[a], 0])
              }
              let CustomerList = [];
              for (const n in req.body.customers) {
                CustomerList.push([responce.insertId, req.body.customers[n], 0])
              }
              let ProductType = [];
              for (const x in req.body.product_offered) {
                ProductType.push([responce.insertId, req.body.product_offered[x], 0])
              }
              InstallerCityList.addCityList(dataTransfer, function (err, user) {
                if (err) {
                  return res.status(403).send(err);
                } else {
                  InstallerCustomerList.addCustomerMultipleList(CustomerList, function (err, user) {
                    if (err) {
                      return res.status(403).send(err);
                    } else {
                      InstallerProductType.addMultipleProductType(ProductType, function (err, user) {
                        if (err) {
                          return res.status(403).send(err);
                        } else {
                          res.status(200).json({
                            message: "Installer successfully added",
                            status_code: 1
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        });
      }
    }

  });
};

exports.getInstaller = async (req, res) => {
  if (!req.params.user_id) {
    return res.status(422).json({
      user_id: "user_id is required"
    });
  }
  const installer = new Installer({user_id: req.params.user_id});
  Installer.read(installer, function (err, Installer) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(Installer);
  });
};


