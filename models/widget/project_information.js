"user strict";


const projectInfo = function (projectInfo) {
  this.user_id = projectInfo.user_id;
  this.address = projectInfo.address;
  this.longitude= projectInfo.longitude;
  this.latitude = projectInfo.latitude;
  this.project_type = 0.00;
  this.available_rebates = 0.00;
  this.new_energy_bill = 0.00;
  this.old_energy_bill = 0.0;
  this.lifetime_saving = 0.0;
  this.upload_utility_graph = "";
  this.utility_graph_status = 0;
  this.upload_panel_box = '';
  this.panel_box_status = 0;
  this.average_electric_bill = "2";
  this.status = 1;
  this.dummy_project_id = projectInfo.project_id || 0;
};

projectInfo.add = function (projectInfo, result) {
  connection.query("INSERT INTO ss_project_information set ?", projectInfo, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

projectInfo.read = function (projectInfo, result) {
  connection.query("SELECT * FROM ss_installer_bit_product INNER JOIN ss_project_information ON ss_installer_bit_product.project_id=ss_project_information.id INNER JOIN ss_users ON ss_project_information.user_id=ss_users.id WHERE ss_installer_bit_product.status != 0 and ss_installer_bit_product.installer_id = ?", [projectInfo], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

projectInfo.user_read = function (projectInfo, result) {
  connection.query("SELECT * FROM ss_project_information WHERE status = 1 and user_id = ?", [projectInfo], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

projectInfo.readInvites = function (projectInfo, result) {
  //console.log('projectInfoprojectInfoprojectInfoprojectInfoprojectInfoprojectInfoprojectInfoprojectInfoprojectInfoprojectInfo');
  //console.log(projectInfo);
  connection.query("SELECT * FROM ss_installer_bit_product INNER JOIN ss_project_information ON ss_installer_bit_product.project_id=ss_project_information.id INNER JOIN ss_users ON ss_project_information.user_id=ss_users.id WHERE ss_installer_bit_product.status != 0 and ss_installer_bit_product.installer_id = ?", [projectInfo], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

projectInfo.getImages = function (projectInfo, result) {
  connection.query("SELECT upload_utility_graph,upload_panel_box,panel_box_status,utility_graph_status FROM ss_project_information WHERE id = ?", [projectInfo], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

projectInfo.imageUpload = function (projectInfo, id, result) {
  connection.query("UPDATE ss_project_information SET upload_utility_graph = ?  WHERE id = ?", [projectInfo, id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

projectInfo.PDFUpload = function (projectInfo, id, result) {
  connection.query("UPDATE ss_project_information SET upload_utility_graph = ?  WHERE id = ?", [projectInfo, id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


projectInfo.panelimageUpload = function (projectInfo, id, result) {
  connection.query("UPDATE ss_project_information SET upload_panel_box = ?  WHERE id = ?", [projectInfo, id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

projectInfo.panelPDFUpload = function (projectInfo, id, result) {
  connection.query("UPDATE ss_project_information SET upload_panel_box = ?  WHERE id = ?", [projectInfo, id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};



projectInfo.updateprojectstatus = function(projectInfo,result){
  console.log(projectInfo);
  connection.query("UPDATE ss_installer_bit_product SET status =0 WHERE project_id = ? and installer_id =?", [projectInfo.dummy_project_id,projectInfo.user_id], function (
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

projectInfo.projectread = function (projectInfo, result) {
  connection.query("SELECT * FROM ss_project_information INNER JOIN ss_installer_bit_product ON ss_project_information.id = ss_installer_bit_product.project_id  WHERE ss_project_information.id = ? and ss_installer_bit_product.installer_id =?", [projectInfo.project_id,projectInfo.installer_id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

projectInfo.projectdelete = function(id,result){
  //console.log(projectInfo);
  connection.query("UPDATE ss_project_information SET status =0 WHERE id = ?", [id], function (
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

projectInfo.biddetails = function (projectInfo, result) {
  connection.query("SELECT * FROM ss_bit_plan where project_id = ?", [projectInfo], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

projectInfo.projectstatusupdate = function(projectid,status,result){
  connection.query("UPDATE ss_project_information SET project_status =? where id = ?",[status,projectid],function(err,res){
  if(err)
  {
    result(err,null);
  }else{
    result(null,res);
  }
  });
}

module.exports = projectInfo;
