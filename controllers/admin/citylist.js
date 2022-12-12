// const jwt = require("jsonwebtoken");
const Citylist = require("../../models/Admin/citylist");

exports.addData = async (req, res) => {
  
  if (!req.body.cityname) {
    return res.status(422).json({
      cityname: "City Name is required",
      statename: "State Name is required",
      countryname:"Country Name is required",
      zipcode:"Zipcode is required"
      //status: "status is required"
    });
  }
  const CitylistData = new Citylist(req.body); 
  Citylist.addData(CitylistData, function (err, CitylistData) {
    console.log(CitylistData);
    if (err) {
      return res.status(403).send(err);
    } else {
      console.log(CitylistData);
      if(CitylistData === "Yes")
      {
        res.status(200).json({
          message: "Already City name is available",
          status_code: -1
        });
      }else{
        res.status(200).json({
          message: "Successfully added City",
          status_code: 1
        });
      }
     
    }
  });
};
exports.editData = async (req, res) => {
  if (!req.body.cityname) {
    return res.status(422).json({
      cityname: "City Name is required",
      statename: "State Name is required",
      countryname:"Country Name is required",
      zipcode:"Zipcode is required"
      //status: "status is required"
    });
  }
  const citylistData = new Citylist(req.body); 
  const id = req.params.id;
  Citylist.editData(id, citylistData, function (err, citylistData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully City details updated",
        status_code: 1
      });
    }
  });
};
exports.deleteData = async (req, res) => {
  const id = req.params.id;
  Citylist.delete(id, function (err, citylistData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully Status Updated",
        status_code: 1
      });
    }
  });
};

exports.readdata = async (req, res) => {
 
  Citylist.readdata( function (err, citylistData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (citylistData.length === 0) {
      res.json({message: "No citylist available"});
    } else {
      res.json(citylistData);
    }
  });
};