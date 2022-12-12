// const jwt = require("jsonwebtoken");
const Customerlist = require("../../models/Admin/customerlist");
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

exports.getcustProduc = async (req, res) => {
  if (!req.params.user_id) {
    return res.status(422).json({
      userId: "userId is required"
    });
  }
  Customerlist.readcustProduc(req.params.user_id, function (err, Customer) {
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

exports.updatecustproduc = async (req, res) => {
  console.log(req.params.proj_id);
  console.log(req.body.project_status);
  if (!req.params.proj_id ) {
    return res.status(422).json({
      ProjectId: "Project Id is required",
      ProjectStatus:"Select project status"
    });
  }
  const customerlistdata = new Customerlist(req.body); 
  const id = req.params.proj_id;
  Customerlist.updatecustProduc(id,customerlistdata, function (err, Customer) {
    if (err) {
      return res.status(403).send(err);
    }
    if (Customer.length === 0) {
      res.json({message: "No Project available for the customer"});
    } else {
      res.status(200).json({
        message: "Successfully update project status",
        status_code: 1
      });
    }
  });
};

exports.updateproductinst = async (req, res) => {
  //console.log(req.params.proj_id);
  
  if (!req.body) {
    return res.status(422).json({
      ProjectId: "Project Id is required",
      Installer:"Chose any one Installer"
    });
  }
const customerlistdata = new Customerlist(req.body); 
  //const id = req.params.proj_id;
  Customerlist.updateproductinst(customerlistdata, function (err, Customer) {
    if (err) {
      return res.status(403).send(err);
    }
    if (Customer === 'yes')
      {
        res.status(200).json({
          message: "Already selected Installer assigned to the project",
          status_code: 1
        });
      } else {
      res.status(200).json({
        message: "Successfully Installer assigned to the project",
        status_code: 1
      });
    }
  });
};

exports.projectbidlist = async (req, res) => {
  //console.log(req.params.proj_id);
  
  if (!req.params.proj_id) {
    return res.status(422).json({
      ProjectId: "Project Id is required"
    });
  }
//const customerlistdata = new Customerlist(req.body); 
  const id = req.params.proj_id;
  Customerlist.projectbidlist(id, function (err, Customer) {
    if (err) {
      return res.status(403).send(err);
    }
    if (Customer.length === 0) {
      res.json({message: "No Bids available for the projects"});
    } else {
      
        res.json(Customer);
     
    }
  });
};

exports.updatebidstatus = async (req, res) => {
  //console.log(req.params.proj_id);
  
  if (!req.body.bid_id) {
    return res.status(422).json({
      Bidid: "Bid Id is required"
    });
  }
  if(!req.body.user_id)
  {
    return res.status(422).json({
      Userid: "User Id is required"
    });
  }
  // if(!req.body.approval_status)
  // {
  //   return res.status(422).json({
  //     Status: "status is required"
  //   });
  // }
  if(!req.body.comments)
  {
    return res.status(422).json({
      comments: "comments is required"
    });
  }
const customerlistdata = new Bidstatus(req.body); 
  //const id = req.params.bid_id;
  Bidstatus.updatebidstatus(customerlistdata, function (err, Customer) {
    if (err) {
      return res.status(403).send(err);
    }
    if (Customer.length === 0) {
      res.json({message: "No Bids to assign for the customer"});
    } else {
      
      res.status(200).json({
        message: "Successfully Bid Status Updated",
        status_code: 1
      });
     
    }
  });
};

exports.getinstdetails = async (req, res) => {
 
  Customerlist.getinstdetails( function (err, customerData) {
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


exports.getprojectdetails = async (req, res) => {
  //console.log(req.params.proj_id);
  
  if (!req.params.project_id) {
    return res.status(422).json({
      ProjectId: "Project Id is required"
    });
  }
//const customerlistdata = new Customerlist(req.body); 
  const id = req.params.project_id;
  Customerlist.getprojectdetails(id, function (err, Customer) {
    if (err) {
      return res.status(403).send(err);
    }
    if (Customer.length === 0) {
      res.json({message: "No Bids available for the projects"});
    } else {
      
        res.json(Customer);
     
    }
  });
};

exports.getinstallerdetails = async (req, res) => {
  //console.log(req.params.proj_id);
  
  if (!req.params.project_id) {
    return res.status(422).json({
      ProjectId: "Project Id is required"
    });
  }
//const customerlistdata = new Customerlist(req.body); 
  const id = req.params.project_id;
  Customerlist.getinstallerdetails(id, function (err, Customer) {
    if (err) {
      return res.status(403).send(err);
    }
    if (Customer.length === 0) {
      res.json({message: "No Installer available for this id"});
    } else {
      
        res.json(Customer);
     
    }
  });
};
