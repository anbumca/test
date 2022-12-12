"user strict";

const useraddress = function (useraddress) {
  this.address=useraddress.address;
  this.latitude = useraddress.latitude;
  this.longitude = useraddress.longitude;
  
};

useraddress.addaddress = function (email,useraddress, result) {
  // TODO: need to update proper SQL query, [search.city, search.zipcode]
  connection.query("SELECT * FROM ss_users WHERE user_type = 3 and email =?",[email], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if(res.length === 1)
      {
        console.log(res[0].id);
        const id =res[0].id;
        useraddress.user_id = id;
        connection.query("INSERT INTO ss_project_information set ?", useraddress, function (err, res) {
          if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });
      }
    }
  });
};



module.exports = useraddress;
