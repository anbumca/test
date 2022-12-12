// const jwt = require("jsonwebtoken");
const Userroles = require("../../models/Admin/userroles");

exports.addData = async (req, res) => {
  if (!req.body.name) {
    return res.status(422).json({
      name: "Name is required",
      //status: "status is required"
    });
  }
  const UserrolesData = new Userroles(req.body); 
  Userroles.addData(UserrolesData, function (err, UserrolesData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "UserRoles Successfully Added ",
        status_code: 1
      });
    }
  });
};
exports.editData = async (req, res) => {
  if (!req.body.name) {
    return res.status(422).json({
      name: "Name is required",
      //status: "status is required"
    });
  }
  const userroleData = new Userroles(req.body); 
  const id = req.params.id;
  Userroles.editData(id, userroleData, function (err, userroleData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "UserRoles Successfully updated",
        status_code: 1
      });
    }
  });
};
exports.deleteData = async (req, res) => {
  const id = req.params.id;
  Userroles.delete(id, function (err, userroleData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Userroles Successfully deleted",
        status_code: 1
      });
    }
  });
};

exports.readdata = async (req, res) => {
 
  Userroles.readdata( function (err, userRoles) {
    if (err) {
      return res.status(403).send(err);
    }
    if (userRoles.length === 0) {
      res.json({message: "no project information"});
    } else {
      res.json(userRoles);
    }
  });
};

exports.getuserdata = async (req, res) => {
  const id = req.params.id;
  Userroles.getuserroles(id, function (err, userroleData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.json(userroleData);
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
  // if (!req.body.status) {
  //   return res.status(422).json({
  //     status: "Status is required",
  //     //status: "status is required"
  //   });
  // }
  const status = req.body.status; 
  const id = req.body.id;
  Userroles.activeData(id, status, function (err, userroleData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      if (userroleData === 'yes')
      {
        res.status(200).json({
          message: "UserRoles Successfully Deactivated",
          status_code: 1
        });
      }else{
        res.status(200).json({
          message: "UserRoles Successfully Activated",
          status_code: 1
        });
      }
      
    }
  });
};