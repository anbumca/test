// const jwt = require("jsonwebtoken");
const Aurora = require("../../models/widget/aurora");
const User = require("../../models/widget/user");
const bcrypt = require('bcrypt');
const { sendMail } = require('../../utils/mailService');

exports.addAuroraUser = async (req, res) => {
  console.log(req.body);

  const user = new User({
    "email": req.body.email,
    "phone_number": req.body.phone,
    "first_name": req.body.firstName,
    "last_name": req.body.lastName,
    "user_type": 2,
    "password": bcrypt.hashSync('Welcome123',10),
    "status": 0
  });
  User.validateUsers(user, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }else{
      // const aurora = new Aurora(req.body);
      if(user === "yes")
      {
        User.readEmail(req.body.email, function (err, user) {
          if (err) {
            return res.status(403).send(err);
          }
          req.body['user_id'] = user[0].id;
          const aurora = new Aurora(req.body);
          Aurora.add(aurora, function (err, aurora) {
            if (err) {
              return res.status(403).send(err);
            } else {
              res.status(200).json({
                message: "Aurora user added",
                status_code: 1
              });
            }
          });
        });
      }else{
        req.body['user_id'] = user.insertId;
        const aurora = new Aurora(req.body);
        Aurora.add(aurora, function (err, aurora) {
          if (err) {
            return res.status(403).send(err);
          } else {
            const { 
              REPORT_PROFILE_FROM_EMAIL : senderEmail,
              REPORT_PROFILE_EMAIL_SUBJECT : subject,
              REPORT_PROFILE_HTML_CONTENT : htmlData,
              REPORT_PROFILE_AUTH_EMAIL: authEmail,
              REPORT_PROFILE_AUTH_PASS: authPass
            } = process.env;

            let htmlDatas = htmlData
            htmlDatas = htmlDatas.replace('[ReplaceUsername]', req.body.email);
            htmlDatas = htmlDatas.replace('[ReplacePassword]', 'Welcome123!');
            sendMail(authEmail, authPass, senderEmail, req.body.email, subject, htmlDatas);
            res.status(200).json({
              message: "Aurora user added",
              status_code: 1
            });
          }
        });
      }
    }

  });
};

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



