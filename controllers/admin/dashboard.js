const Dashboard = require("../../models/admin/dashboard");

exports.getProject = async (req, res) => {
  Dashboard.readall(function (err, project) {
    if (err) {
      return res.status(403).send(err);
    }
    if (project.length === 0) {
        res.json({message: "No Projectlist avaliable"});
    } else {
        res.json(project);
    }
    });
  };

  exports.getBit = async (req, res) => {
    Dashboard.read(function (err, bit) {
        if(err) {
            return res.status(403).send(err);
        }
        if (bit.length === 0) {
            res.json({message: "No bitlist available"});
          } else {
            res.json(bit);
          }
    })
  }
  
  
  exports.getbiddetails = async (req, res) => {
    Dashboard.getbiddetails( req.params.id,function (err, bit) {
        if(err) {
            return res.status(403).send(err);
        }
        if (bit.length === 0) {
            res.json({message: "No bitlist available"});
          } else {
            res.json(bit);
          }
    })
  }

  exports.getbidoverview = async (req, res) => {
    Dashboard.getbidoverview( req.params.id,function (err, bit) {
        if(err) {
            return res.status(403).send(err);
        }
        if (bit.length === 0) {
            res.json({message: "No bitlist available"});
          } else {
            res.json(bit);
          }
    })
  }