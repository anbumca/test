// const jwt = require("jsonwebtoken");
const ProjectInfo = require("../../models/widget/project_information");

exports.add = async (req, res) => {
  if (!req.body.address) {
    return res.status(422).json({
      address: "address is required",
      latitude:"Latitude is required",
      longitude:"Longitude is required"
    });
  }
  const projectInfo = new ProjectInfo(req.body);

  ProjectInfo.add(projectInfo, function (err, projectInfo) {
    if (err) {
      return res.status(403).send(err);
    }
    res.status(200).json({
      message: "project Information added successfully",
      status_code: 1
    });
  });
};

exports.read = async (req, res) => {
  if (!req.params.installer_id) {
    return res.status(422).json({
      userId: "installer_id is required"
    });
  }
  ProjectInfo.read(req.params.installer_id, function (err, projectInfo) {
    if (err) {
      return res.status(403).send(err);
    }
    if (projectInfo.length === 0) {
      res.json({message: "no project information"});
    } else {
      res.json(projectInfo);
    }
  });
};

exports.user_read = async (req, res) => {
  if (!req.params.user_id) {
    return res.status(422).json({
      userId: "userId is required"
    });
  }
  ProjectInfo.user_read(req.params.user_id, function (err, projectInfo) {
    if (err) {
      return res.status(403).send(err);
    }
    if (projectInfo.length === 0) {
      res.json({message: "no project information"});
    } else {
      res.json(projectInfo);
    }
  });
};

exports.readInvites = async (req, res) => {
  if (!req.params.installer_id) {
    return res.status(422).json({
      userId: "userId is required"
    });
  }
  ProjectInfo.readInvites(req.params.installer_id, function (err, projectInfo) {
    if (err) {
      return res.status(403).send(err);
    }
    if(projectInfo.length === 0) {
      res.json({message: "No project information"});
    } else {
      
      res.json(projectInfo);
    }
  });
};

exports.getImages = async (req, res) => {
  if (!req.params.project_id) {
    return res.status(422).json({
      project_id: "project id is required"
    });
  }
  ProjectInfo.getImages(req.params.project_id, function (err, projectInfo) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(projectInfo);
  });
};

exports.imagePdf = async (req, res) => {
  const id = req.params.project_id;
  if (!id) {
    return res.status(422).json({
      userId: "userId is required"
    });
  }
  // const projectInfo = new ProjectInfo(user_id);
  if (req.files.image) {
    const Image = req.files.image;
    Image.mv(`./public/image/${Image.name}`, function (err) {
      if (err) {
        return res.status(500).send({ msg: "Error occured" });
      }
    });
    ProjectInfo.imageUpload(`/image/${Image.name}`, id, function (err, projectInfo) {
      if (err) {
        return res.status(403).send(err);
      }
      res.json({
        message: "Document uploaded successfully"
      });
    });
  } 
  if (req.files.pdf) {
    const pdf = req.files.pdf;
    pdf.mv(`./public/pdf/${pdf.name}`, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
      }
    });
    ProjectInfo.PDFUpload(`/pdf/${pdf.name}`, id, function (err, projectInfo) {
      if (err) {
        return res.status(403).send(err);
      }
      res.json({
        message: "Document uploaded successfully"
      });
    });
  } 
};

exports.declineproject = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(422).json({
      project_id: "Project Id is required",
      user_id:"User Id is required"
    });
  }
  const ProjectInfoData = new ProjectInfo(req.body);
  ProjectInfo.updateprojectstatus(ProjectInfoData, function (err, ProjectInfoData) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json({
      message: "Project was updated successfully"
    });
  });
};


exports.projectread = async (req, res) => {
  if (!req.body.project_id || !req.body.installer_id) {
    return res.status(422).json({
      project_id: "Project Id required is required",
      installer_id: "Installer Id is required"
    });
  }
  ProjectInfo.projectread(req.body, function (err, projectInfo) {
    if (err) {
      return res.status(403).send(err);
    }
    if (projectInfo.length === 0) {
      res.json({message: "no project information"});
    } else {
      res.json(projectInfo);
    }
  });
};


exports.panelimagePdf = async (req, res) => {
  const id = req.params.project_id;
  if (!id) {
    return res.status(422).json({
      userId: "userId is required"
    });
  }
  // const projectInfo = new ProjectInfo(user_id);
  if (req.files.image) {
    const Image = req.files.image;
    Image.mv(`./public/image/${Image.name}`, function (err) {
      if (err) {
        return res.status(500).send({ msg: "Error occured" });
      }
    });
    ProjectInfo.panelimageUpload(`/image/${Image.name}`, id, function (err, projectInfo) {
      if (err) {
        return res.status(403).send(err);
      }
      res.json({
        message: "Document uploaded successfully"
      });
    });
  } 
  if (req.files.pdf) {
    const pdf = req.files.pdf;
    pdf.mv(`./public/pdf/${pdf.name}`, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
      }
    });
    ProjectInfo.panelPDFUpload(`/pdf/${pdf.name}`, id, function (err, projectInfo) {
      if (err) {
        return res.status(403).send(err);
      }
      res.json({
        message: "Document uploaded successfully"
      });
    });
  } 
};

exports.projectdelete = async (req, res) => {
  //console.log(req.body);
  if (!req.params.project_id) {
    return res.status(422).json({
      project_id: "Project Id is required"
    });
  }
  //const ProjectInfoData = new ProjectInfo(req.body);
  ProjectInfo.projectdelete(req.params.project_id, function (err, ProjectInfoData) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json({
      message: "Project Deleted successfully"
    });
  });
};


exports.biddetails = async (req, res) => {
  if (!req.params.project_id) {
    return res.status(422).json({
      ProjectId: "Project Id is required"
    });
  }
  ProjectInfo.biddetails(req.params.project_id, function (err, projectInfo) {
    if (err) {
      return res.status(403).send(err);
    }
    if (projectInfo.length === 0) {
      res.json({message: "no project information"});
    } else {
      res.json(projectInfo);
    }
  });
};

exports.projectstatusupdate =async (req, res) => {
  if (!req.body.project_id) {
    return res.status(422).json({
      ProjectId: "Project Id is required"
    });
  }
  const projectstatus = new ProjectInfo(req.body);
  const projectid = projectstatus.project_id;
  const status =projectstatus.status;
  ProjectInfo.projectstatusupdate(projectid,status, function (err, projectInfo) {
    if (err) {
      return res.status(403).send(err);
    }
    res.status(200).json({
      message: "project Status Updated successfully",
      status_code: 1
    });
  });
};


