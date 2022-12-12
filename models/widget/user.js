"user strict";
const { sendMail } = require('../../utils/mailService');

const User = function (user) {
  this.first_name = user.first_name || '';
  this.last_name = user.last_name || '';
  this.email = user.email;
  this.password = user.password || 'Welcome123!';
  this.user_type = user.user_type || 3;
  this.google_login_id = user.google_login_id || 0;
  this.google_login_status = user.google_login_status || 0;
  this.facebook_login_id = user.facebook_login_id || 0;
  this.facebook_login_status = user.facebook_login_status || 0;
  this.phone_number = user.phone_number;
  this.remember_me = user.remember_me || 0;
  this.status = user.status || 0;
  // TODO: need to check
  // this.createdAt = new Date();
  // this.updatedAt = new Date();
};

User.validateUsers = function (user, result) {
  connection.query("SELECT * FROM ss_users WHERE email = ?", [user.email], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      console.log(res.length);
      if (res.length === 0) {
        connection.query("INSERT INTO ss_users set ?", user, function (err, res) {
          if (err) {
            result(err, null);
          } else {

          //   if(user.user_type == 2) 
          //   {
          //   const { 
          //     REPORT_PROFILE_FROM_EMAIL : senderEmail,
          //     REPORT_PROFILE_EMAIL_SUBJECT : subject,
          //     REPORT_PROFILE_HTML_CONTENT : htmlData,
          //     REPORT_PROFILE_AUTH_EMAIL: authEmail,
          //     REPORT_PROFILE_AUTH_PASS: authPass
          //   } = process.env;

          //   let htmlDatas = htmlData
          //   // console.log(res);
          //   htmlDatas = htmlDatas.replace('[ReplaceUsername]',user.email);
          //   htmlDatas = htmlDatas.replace('[ReplacePassword]',user.password);
          //   console.log(htmlDatas);
          //   sendMail(authEmail, authPass, senderEmail, user.email, subject, htmlDatas);
          // }
            result(null, res);
          }
        });
      } else {
        result(null, 'yes');
      }
      // result(null, res);
    }
  });
}
// TODO: without Validation
User.create = function (user, result) {
  connection.query("INSERT INTO ss_users set ?", user, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.login = function (user, result) {
  connection.query("SELECT * FROM ss_users WHERE status =1 and email = ?", [user.email], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.google = function (user, result) {
  connection.query("SELECT * FROM ss_users WHERE email = ? and google_login_id = ? ", [user.email, user.google_login_id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.facebook = function (user, result) {
  connection.query("SELECT * FROM ss_users WHERE email = ? and facebook_login_id = ? ", [user.email, user.facebook_login_id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.read = function (id, result) {
  connection.query("SELECT * FROM ss_users WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.readEmail = function (email, result) {
  connection.query("SELECT * FROM ss_users WHERE email = ?", [email], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.profileImageUpload = function (profile_image, id, result) {
  connection.query("UPDATE ss_users SET profile_image = ? WHERE id = ?", [profile_image, id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.update = function (id, user, result) {
  connection.query("UPDATE ss_users SET first_name = ?, last_name= ?, phone_number=?  WHERE id = ?", [user.first_name, user.last_name, user.phone_number, id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.delete = function (id, result) {
  connection.query("DELETE FROM ss_users WHERE id = ?", [id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};


User.forgetpassword = function (user, result) {
  //console.log(user);
  connection.query("SELECT * FROM ss_users WHERE email = ?", [user.email], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      if (res.length === 0) {
        result(null, 'yes');
        
      } else {
        connection.query("UPDATE ss_users SET password = ?  WHERE email = ?", [user.password, user.email], function (err, res) {
          if (err) {
            result(err, null);
          } else {
            
            result(null, res);
          }
        });
      }
      // result(null, res);
    }
  });
}

module.exports = User;
