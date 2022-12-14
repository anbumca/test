const jwt = require("jsonwebtoken");
const User = require("../../models/widget/user");
const UserAddress =require("../../models/widget/useraddress");
const bcrypt = require('bcrypt');
const { sendMail } = require('../../utils/mailService');

exports.register = async (req, res) => {
  if (!req.body.first_name || !req.body.last_name || !req.body.email) {
    return res.status(422).json({
      first_name: "first_name is required",
      last_name: "last_name is required",
      email: "email is required",
    });
  }
  const user = new User(req.body);
  var pwd = user.password;
  // Hash the password before insert it into the database.
  user.password = bcrypt.hashSync(pwd,10);
  user.status =1;

  User.validateUsers(user, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    if(user === 'yes') {
      res.status(201).json({
        status: "User already exist",
        status_code: 0
      });
    } else {
      if (req.files) {
        if (req.files.profileImage) {
          const profileImage = req.files.profileImage;
          profileImage.mv(`./public/profileImage/${profileImage.name}`, function (err) {
            if (err) {
              console.log(err)
              return res.status(500).send({ msg: "Error occured" });
            }
          });
          User.profileImageUpload(`/profileImage/${profileImage.name}`, user.insertId, function (err) {
            if (err) {
              return res.status(403).send(err);
            }
            res.status(200).json({
              message: "User registered successfully",
              status_code: 1
            });
          });
        }
      } else {
        res.status(200).json({
          message: "User registered successfully",
          status_code: 1
        });
      }
    }
  });
};

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password ) {
    return res.status(422).json({
      email: "email is required",
      password: "The password is required"
      
    });
  }
  const user = new User(req.body);
  User.login(user, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    if(user[0]) {
      if (bcrypt.compareSync(req.body.password, user[0].password)) {
        let token;
        try {
          //Creating jwt token
          token = jwt.sign(
            { userId: user[0].id, email: user[0].email },
            "secretkeyappearshere",
            { expiresIn: "7d" }
          );
        } catch (err) {
          console.log(err);
          const error = new Error("Error! Something went wrong.");
          return next(error);
        }
        console.log(user);
        if(user[0].user_type === 3 && req.body.address!='')
        {
          console.log(req.body.address);
           const useraddreslist = new UserAddress(req.body);
           const email = req.body.email;
  
           UserAddress.addaddress(email,useraddreslist,function(err,useraddreslist){
            if (err) {
              return res.status(403).send(err);
            } else {
              return res.status(200).json({
                message: "success",
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                email: user[0].email,
                remember_me: user[0].remember_me,
                user_type: user[0].user_type,
                status: user[0].status,
                status_code: 1,
                userid: user[0].id,
                token: token
              });
            }
  
           });
          
        }else{
          return res.status(200).json({
            message: "success",
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            email: user[0].email,
            remember_me: user[0].remember_me,
            user_type: user[0].user_type,
            status: user[0].status,
            status_code: 1,
            userid: user[0].id,
            token: token
          });
        }
             
        
      } else {
        return res.status(200).json({
          message: "Username password not match",
          status_code: 0
        });
      }
    } else {
      return res.status(200).json({
        message: "user not found",
        status_code: 0
      });
    }
  });
};

exports.google = async (req, res) => {
  if (!req.body.email || !req.body.google_login_id ) {
    return res.status(422).json({
      email: "email is required",
      google_login_id: "google_login_id is required"
      
    });
  }
  const user = new User(req.body);
  User.google(user, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    if(user[0]) {
      let token;
      try {
        //Creating jwt token
        token = jwt.sign(
          { userId: user[0].id, email: user[0].email },
          "secretkeyappearshere",
          { expiresIn: "1h" }
        );
      } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
      }
      return res.status(200).json({
        message: "success",
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        email: user[0].email,
        remember_me: user[0].remember_me,
        user_type: user[0].user_type,
        status: user[0].status,
        status_code: 1,
        userid: user[0].id,
        token: token
      });
    } else {
      return res.status(200).json({
        message: "user not found",
        status_code: 0
      });
    }
  });
};

exports.facebook = async (req, res) => {
  if (!req.body.email || !req.body.facebook_login_id ) {
    return res.status(422).json({
      email: "email is required",
      facebook_login_id: "facebook_login_id is required"
      
    });
  }
  const user = new User(req.body);
  User.login(user, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    if(user[0]) {
      let token;
      try {
        //Creating jwt token
        token = jwt.sign(
          { userId: user[0].id, email: user[0].email },
          "secretkeyappearshere",
          { expiresIn: "1h" }
        );
      } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
      }
      return res.status(200).json({
        message: "success",
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        email: user[0].email,
        remember_me: user[0].remember_me,
        user_type: user[0].user_type,
        status: user[0].status,
        status_code: 1,
        userid: user[0].id,
        token: token
      });
    } else {
      return res.status(200).json({
        message: "user not found",
        status_code: 0
      });
    }
  });
};

exports.readUser = async (req, res) => {
  const id = req.params.userId;
  User.read(id, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(user[0]);
  });
};

exports.updateUser = async (req, res) => {
  const id = req.params.userId;
  User.update(id, new User(req.body), function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    if (req.files) {
      if (req.files.profileImage) {
        const profileImage = req.files.profileImage;
        profileImage.mv(`./public/profileImage/${profileImage.name}`, function (err) {
          if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
          }
        });
        User.profileImageUpload(`/profileImage/${profileImage.name}`,id, function (err) {
          if (err) {
            return res.status(403).send(err);
          }
          res.status(200).json({
            message: "User updated successfully",
            status_code: 1
          });
        });
      }
    } else {
      res.status(200).json({
        message: "User updated successfully",
        status_code: 1
      });
    }
    
  });
};

exports.deleteUser = async (req, res) => {
  const id = req.params.userId;
  User.delete(id, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(user);
  });
};

exports.forgetpassword = async (req, res) => {
  if (!req.body.email) {
    return res.status(422).json({
      email: "email is required",
    });
  }
  const user = new User(req.body);
  
  var pwd = "Welcome123!";
  // Hash the password before insert it into the database.
  user.password = bcrypt.hashSync(pwd,10);
console.log(pwd);
  User.forgetpassword(user, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    if(user === 'yes') {
      res.status(201).json({
        status: "User is not exits",
        status_code: 0
      });
    } else {
      const { 
        REPORT_PROFILE_FROM_EMAIL : senderEmail,
        REPORT_FORGETPASSWORD_EMAIL_SUBJECT : subject,
        REPORT_FORGOTPASSEORD_HTML_CONTENT : htmlData,
        REPORT_PROFILE_AUTH_EMAIL: authEmail,
        REPORT_PROFILE_AUTH_PASS: authPass
      } = process.env;

      let htmlDatas = htmlData
      // console.log(res);
     // htmlDatas = htmlDatas.replace('[ReplaceUsername]',user.email);
      htmlDatas = htmlDatas.replace('[ReplacePassword]',pwd);
      //console.log(htmlDatas);
      console.log(req.body.email);
      sendMail(authEmail, authPass, senderEmail, req.body.email, subject, htmlDatas);
      res.status(200).json({
        message: "Password Shared to your email ID",
        status_code: 1
      });
    }
  });
};



exports.adminforgetpassword = async (req, res) => {
  if (!req.body.email) {
    return res.status(422).json({
      email: "email is required",
    });
  }
  const user = new User(req.body);
  
  var pwd = "admin@123";
  // Hash the password before insert it into the database.
  user.password = bcrypt.hashSync(pwd,10);

  User.forgetpassword(user, function (err, user) {
    if (err) {
      return res.status(403).send(err);
    }
    if(user === 'yes') {
      res.status(201).json({
        status: "User is not exits",
        status_code: 0
      });
    } else {
             
      res.status(200).json({
        message: "Password Shared to your email ID",
        status_code: 1
      });
    }
  });
};

exports.checking = async (req, res) => {
  console.log('Working......................');
  res.status(200).json({
    message: "Working........"
  });
};
