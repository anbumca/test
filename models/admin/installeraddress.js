"user strict";


const installeraddress = function (installeraddress) {
  this.user_id=installeraddress.installer_id;
  this.company_name = installeraddress.company_name;
  this.headquater_address= installeraddress.address;
  
};

installeraddress.updateinstaller = function (installeraddress, result) {
  //console.log("123");
  //console.log(installeraddress);
  // TODO: need to update proper SQL query, [search.city, search.zipcode]
 connection.query("Update ss_installer SET company_name =? , headquater_address =? where user_id =?",[installeraddress.company_name,installeraddress.headquater_address,installeraddress.user_id],function(err,res){
  if(err){
    result(err,null);
  }else{
    result(null,res);
  }
 });

};



module.exports = installeraddress;
