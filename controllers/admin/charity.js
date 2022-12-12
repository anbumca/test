// const jwt = require("jsonwebtoken");
const Charity = require("../../models/Admin/charity");

exports.addData = async (req, res) => {
  if (!req.body.charity_name) {
    return res.status(422).json({
      name: "Charity name is required",
      //status: "status is required"
    });
  }
  const charityData = new Charity(req.body); 
  Charity.addData(charityData, function (err, CharityData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully added charity",
        status_code: 1
      });
    }
  });
};
exports.editData = async (req, res) => {
  if (!req.body.charity_name) {
    return res.status(422).json({
      name: "Charity name is required",
      status: "status is required"
    });
  }
  const charityData = new Charity(req.body); 
  const id = req.params.id;
  Charity.editData(id, charityData, function (err, CharityData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully updated",
        status_code: 1
      });
    }
  });
};
exports.deleteData = async (req, res) => {
  const id = req.params.id;
  Charity.delete(id, function (err, CharityData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully deleted",
        status_code: 1
      });
    }
  });
};

exports.readdata = async (req, res) => {
 
  Charity.readdata( function (err, CharityData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (CharityData.length === 0) {
      res.json({message: "No charity information"});
    } else {
      res.json(CharityData);
    }
  });
};


exports.activedata = async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    return res.status(422).json({
      id: "Id is required",
      //status: "status is required"
    });
  }
 
  const status = req.body.status; 
  const id = req.body.id;
  Charity.activeData(id, status, function (err, charityData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      if (charityData === 'yes')
      {
        res.status(200).json({
          message: "Charity Successfully Deactivated",
          status_code: 1
        });
      }else{
        res.status(200).json({
          message: "Charity Successfully Activated",
          status_code: 1
        });
      }
      
    }
  });
};