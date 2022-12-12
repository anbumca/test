"user strict";

const installerBitProduct = function (installerBitProduct) {
  this.user_id = installerBitProduct.user_id;
  this.installer_id = installerBitProduct.installer_id;
  this.project_id = installerBitProduct.project_id;
  this.new_energy_bill = installerBitProduct.new_energy_bill;
  this.payback_period = installerBitProduct.payback_period;
  this.lifetime_saving = installerBitProduct.lifetime_saving;
  this.system_size = installerBitProduct.system_size;
  this.add_to_cart = installerBitProduct.add_to_cart;
  this.total_price = installerBitProduct.total_price;
  this.charities = installerBitProduct.charities;
  this.agreement = installerBitProduct.agreement;
  this.payment_type = installerBitProduct.payment_type;
  this.status = installerBitProduct.status;
  this.solar_system = installerBitProduct.solar_system;
  this.performance = installerBitProduct.performance;
  this.panels = installerBitProduct.panels;
  this.inventors = installerBitProduct.inventors;
}

installerBitProduct.addBitProduc = function (installer, result) {
  console.log(installer);
  connection.query("INSERT INTO ss_bit_plan set ?", installer, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      connection.query("UPDATE ss_installer_bit_product SET admin_approval =2 WHERE installer_id = ? and project_id = ?",[installer.installer_id,installer.project_id], function (
        err,
        res
      ) {
        if(err)
        {
          result(err,null);
        }else{
          result(null, res);
        }

      });
    }
  });
}

installerBitProduct.readBitProduc = function (ids, result) {
  connection.query("SELECT * FROM ss_bit_plan WHERE project_id = ?", ids, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = installerBitProduct;
