// const jwt = require("jsonwebtoken");
const Resdential = require("../../models/Admin/resdential");

exports.addData = async (req, res) => {
  if (!req.body.name) {
    return res.status(422).json({
      name: "resdential name is required",
      //status: "status is required"
    });
  }
  const resdentialData = new Resdential(req.body); 
  Resdential.addData(resdentialData, function (err, resdentialData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully added resdent",
        status_code: 1
      });
    }
  });
};
exports.editData = async (req, res) => {
  if (!req.body.name) {
    return res.status(422).json({
      name: "resdential name is required",
      status: "status is required"
    });
  }
  const resdentialData = new Resdential(req.body); 
  const id = req.params.id;
  Resdential.editData(id, resdentialData, function (err, resdentialData) {
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
  Resdential.delete(id, function (err, resdentialData) {
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
 
  Resdential.readdata( function (err, resdentialData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (resdentialData.length === 0) {
      res.json({message: "No Settings information"});
    } else {
      res.json(resdentialData);
    }
  });
};