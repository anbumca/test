"productlist strict";

const connection = require("../../database/mysqlDB");

const Productlist = function(productlist){
    this.name = productlist.name;
    
}

Productlist.validateusers = function(productlist,result){
    connection.query("SELECT * FROM ss_product_list WHERE name = ?", [productlist.name], function (
        err,
        res
      ){
        if(res.length==0)
        {
            
        }
      });

};