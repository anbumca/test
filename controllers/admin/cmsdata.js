// const jwt = require("jsonwebtoken");
const CmsData = require("../../models/Admin/cmsdata");

exports.addData = async (req, res) => {
  if (!req.body.content) {
    return res.status(422).json({
      content: "content is required",
      //status: "status is required"
    });
  }
  const cmsdata = new CmsData(req.body); 
  CmsData.addData(cmsdata, function (err, cmsdata) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully Content Added",
        status_code: 1
      });
    }
  });
};
exports.editData = async (req, res) => {
  if (!req.body.content) {
    return res.status(422).json({
      name: "Name is required",
      //status: "status is required"
    });
  }
  const cmsdata = new CmsData(req.body); 
  const id = req.params.id;
  CmsData.editData(id, cmsdata, function (err, cmsdata) {
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


exports.readdata = async (req, res) => {
 
  CmsData.readdata( function (err, cmsdata) {
    if (err) {
      return res.status(403).send(err);
    }
    if (cmsdata.length === 0) {
      res.json({message: "no project information"});
    } else {
      res.json(cmsdata);
    }
  });
};

exports.getcmsdata = async (req, res) => {
  const id = req.params.id;
  CmsData.getcmsdata(id, function (err, cmsdata) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.json(cmsdata);
    }
  });
};