"userroles strict";

const connection = require("../../database/mysqlDB");

const Userroles = function(userroles){
    this.name = userroles.name;
    
}

Userroles.validateusers = function(userroles,result){
    connection.query("SELECT * FROM ss_users_roles WHERE name = ?", [userroles.name], function (
        err,
        res
      ){
        if(res.length==0)
        {
            
        }
      });

};