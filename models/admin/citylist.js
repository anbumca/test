"user strict";

const citylist = function (citylist) {
  this.city_name = citylist.cityname,
  this.state_name= citylist.statename,
  this.country_name = citylist.countryname,
  this.zipcode = citylist.zipcode,
  this.status = citylist.status || 1;
};

citylist.addData = function (citylistData, result) {
console.log(citylistData);
  connection.query("Select * from ss_zipcode where city_name=?",[citylistData.city_name],function(err,res){
    if (err) {
      result(err, null);
    }else{
      console.log(res.length);
      if(res.length === 0 )
      {
        
        connection.query("INSERT INTO ss_zipcode set ?", citylistData, function (err, res) {
          if (err) {
            result(err, null);
          } else {
            result(null, res);
          }
        });
      }else{
        result(null, 'Yes');
      }
    }
  });
  
};

citylist.editData = function (id, citylistData, result) {
  
  connection.query("UPDATE ss_zipcode SET ? WHERE id = ?", [citylistData, id], function (
    err,
    res
  ) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


citylist.delete = function (id, result) {
  connection.query("UPDATE ss_zipcode SET status=0 WHERE id = ?", [id], function (
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

citylist.readdata = function (result) {
  connection.query("SELECT * FROM ss_zipcode", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = citylist;
