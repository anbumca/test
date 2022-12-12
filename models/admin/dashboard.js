"user strict";

const dashboard = function (projects) {
  this.project_id = projects.projects.project_id;
};

dashboard.readall = function (project,result) {
  connection.query("SELECT * FROM ss_project_information order by id DESC limit 10",project, (err, res) => {
    if (err) {
      result(err, null);
    } else {
        result(null, res);
        }
      });
    };    

dashboard.read = function (bit, result) {
    connection.query("SELECT bp.id,u.company_name From ss_bit_plan as bp INNER JOIN ss_installer as u ON u.user_id = bp.installer_id order by bp.id desc limit 10", bit, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

dashboard.getbiddetails = function (id, result) {
  connection.query("SELECT pi.address,u.company_name,u.user_id as installer_id,bp.total_price,bp.id as bit_id from ss_bit_plan as bp INNER JOIN ss_project_information as pi ON pi.id = bp.project_id INNER JOIN ss_installer as u ON bp.installer_id = u.user_id where bp.id =?",id, (err, res) => {
      if (err) {
          result(err, null);
      } else {
          result(null, res);
      }
  })
}


dashboard.getbidoverview = function (id, result) {
  connection.query("SELECT * from ss_bit_plan where id =?",id, (err, res) => {
      if (err) {
          result(err, null);
      } else {
          result(null, res);
      }
  })
}


module.exports = dashboard;
