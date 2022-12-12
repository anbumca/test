// const jwt = require("jsonwebtoken");
const Customerlist = require("../../models/Admin/customer");
const Bidstatus = require("../../models/Admin/bidslist");

exports.readdata = async (req, res) => {
 
  Customerlist.readdata( function (err, customerData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (customerData.length === 0) {
      res.json({message: "No Customer available"});
    } else {
      res.json(customerData);
    }
  });
};

exports.getcustomer = async (req, res) => {
  if (!req.params.id) {
    return res.status(422).json({
      Id: "Id is required"
    });
  }
  Customerlist.getcustomer(req.params.id, function (err, Customer) {
    if (err) {
      return res.status(403).send(err);
    }
    if (Customer.length === 0) {
      res.json({message: "No Project available for the customer"});
    } else {
      res.json(Customer);
    }
  });
};

exports.editcustomer = async (req, res) => {
  
  if (!req.params.id ) {
    return res.status(422).json({
      Id: "Id is required"
  });
  }

  if (!req.body.first_name) {
    return res.status(422).json({
      Firstname: "First Name is required"
  });
  }
  if (!req.body.last_name) {
    return res.status(422).json({
      lastname: "Last Name is required"
  });
  }
  if (!req.body.email ) {
    return res.status(422).json({
      Email: "Email is required"
  });
  }
  const customerlistdata = new Customerlist(req.body); 
  const id = req.params.id;
  Customerlist.updatecustomer(id,customerlistdata, function (err, Customer) {
    if (err) {
      return res.status(403).send(err);
    }
    if (Customer.length === 0) {
      res.json({message: "No Customer details available"});
    } else {
      res.status(200).json({
        message: "Successfully Cusotmer details updated",
        status_code: 1
      });
    }
  });
};

exports.deletecustomer = async (req, res) => {
  if (!req.params.id) {
    return res.status(422).json({
      Id: "Id is required"
    });
  }
  Customerlist.deletecustomer(req.params.id, function (err, Customer) {
    if (err) {
      return res.status(403).send(err);
    }
    if (Customer.length === 0) {
      res.json({message: "No Customer details available"});
    } else {
      res.status(200).json({
        message: "Successfully Cusotmer details deleted",
        status_code: 1
      });
    }
  });
};

exports.activecustomer = async (req, res) => {
  if (!req.params.id) {
    return res.status(422).json({
      Id: "Id is required"
    });
  }

  if (!req.body.status) {
    return res.status(422).json({
      Status: "Status is required"
    });
  }
  Customerlist.activecustomer(req.params.id,req.body.status, function (err, Customer) {
    if (err) {
      return res.status(403).send(err);
    }
    if (Customer.length === 0) {
      res.json({message: "No Customer Details available"});
    } else {
      if(Customer ==='yes')
      {
        res.status(200).json({
          message: "Successfully Cusotmer details actived",
          status_code: 1
        });
      }else{
        res.status(200).json({
          message: "Successfully Cusotmer details deactived",
          status_code: 1
        });
      }
    }
  });
};

