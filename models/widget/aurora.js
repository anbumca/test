"user strict";

const Aurora = function (aurora) {
  this.address = aurora.address;
  this.annualProduction = aurora.annualProduction;
  this.averageMonthlyBill = aurora.averageMonthlyBill;
  this.city = aurora.city;
  this.country = aurora.country;
  this.error  = aurora.error;
  this.homeOwnership = aurora.homeOwnership;
  this.latitude = aurora.latitude;
  this.longitude = aurora.longitude;
  this.moduleCount = aurora.moduleCount;
  this.monthlyOffset = aurora.monthlyOffset;
  this.monthlySavings = aurora.monthlySavings;
  this.orgId = aurora.orgId;
  this.projectId = aurora.projectId;
  this.referrerParams = aurora.referrerParams;
  this.state = aurora.state;
  this.street = aurora.street;
  this.sunlightHours = aurora.sunlightHours;
  this.systemSize = aurora.systemSize;
  this.user_id = aurora.user_id
};



// CREATE TABLE `sunsource_new`.`ss_aurora_user` (
//   `id` INT NOT NULL AUTO_INCREMENT,
//   `address` VARCHAR(200) NULL,
//   `annualProduction` VARCHAR(200) NULL,
//   `averageMonthlyBill` VARCHAR(200) NULL,
//   `city` VARCHAR(200) NULL,
//   `country` VARCHAR(200) NULL,
//   `error` VARCHAR(200) NULL,
//   `homeOwnership` VARCHAR(200) NULL,
//   `latitude` VARCHAR(200) NULL,
//   `longitude` VARCHAR(200) NULL,
//   `moduleCount` VARCHAR(200) NULL,
//   `monthlyOffset` VARCHAR(200) NULL,
//   `monthlySavings` VARCHAR(200) NULL,
//   `orgId` VARCHAR(200) NULL,
//   `projectId` VARCHAR(200) NULL,
//   `referrerParams` VARCHAR(200) NULL,
//   `state` VARCHAR(200) NULL,
//   `street` VARCHAR(200) NULL,
//   `sunlightHours` VARCHAR(200) NULL,
//   `systemSize` VARCHAR(200) NULL,
//   `email` VARCHAR(200) NULL,
//   `firstName` VARCHAR(200) NULL,
//   `lastName` VARCHAR(200) NULL,
//   `phone` VARCHAR(200) NULL,
//   PRIMARY KEY (`id`));

// ALTER TABLE `sunsource_new`.`ss_aurora_user` 
// ADD COLUMN `user_id` INT NOT NULL AFTER `phone`;


Aurora.add = function (aurora, result) {
  connection.query("INSERT INTO ss_project_information1 set ?", aurora, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

Aurora.read = function (aurora, result) {
  connection.query("SELECT * FROM ss_installer WHERE user_id = ?", [aurora.user_id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};



module.exports = Aurora;
