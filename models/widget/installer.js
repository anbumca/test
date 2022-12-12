"user strict";

const Installers = function (installer) {
  this.user_id = installer.user_id;
  this.company_name = installer.company_name;
  this.headquater_address = installer.headquater_address;
  this.city = 'installer.city';
  this.state = installer.state;
  this.zipcode = installer.zipcode;
  this.licence_number = installer.licence_number;
  this.website = installer.website;
  this.review_site_link = installer.review_site_link;
  this.about_electrum = installer.about_electrum;
  this.year_establish = installer.year_establish;
  this.no_residential_install = installer.no_residential_install;
  this.no_comerical_install = installer.no_comerical_install;
  this.workmanship_warrenty = installer.workmanship_warrenty;
  this.no_employee = installer.no_employee;
  this.project_mang_soft = installer.project_mang_soft;
  this.referring_company = installer.referring_company;
};

Installers.add = function (installer, result) {
  connection.query("INSERT INTO ss_installer set ?", installer, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

Installers.read = function (installer, result) {
  connection.query("SELECT * FROM ss_installer WHERE user_id = ?", [installer.user_id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};



module.exports = Installers;
