"user strict";


const productlist = function (productlist) {
 this.name= productlist.name;
 this. description = productlist.description;
 this.cost =productlist.cost;
 this.quantity = productlist.quantity;
 this.status = productlist.status;
 
};

productlist.addproductlist = function (productlist,result) {
  connection.query("SELECT * FROM ss_product_list where status !=0 and name = ?",[productlist.name], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if(res.length=== 1)
      {
        result(null,"yes");
      }else{
        connection.query("INSERT INTO ss_product_list SET ?",productlist,function(err,res){
          if(err)
          {
            result(err,null);
          }else{
            result(null,res);
          }
        });
      }
    }
  });
};

productlist.profileImageUpload = function (profile_image, id, result) {
  console.log(profile_image);
  console.log(id);
  connection.query("UPDATE ss_product_list SET product_image = ? WHERE id = ?", [profile_image, id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

productlist.readdata = function (result) {
  connection.query("SELECT * FROM ss_product_list order by id DESC", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

productlist.getprodutlist = function (id,result) {
  connection.query("SELECT * FROM ss_product_list where status !=0 and id =?",id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

productlist.editproductlist = function (id,productlist,result) {
      
        connection.query("UPDATE ss_product_list SET ? where id=?",[productlist,id],function(err,res){
          if(err)
          {
            result(err,null);
          }else{
            result(null,res);
          }
        });
      
  
};

productlist.delete = function (id,status, result) {
  console.log(id);
  connection.query("UPDATE ss_product_list SET status = ? WHERE id = ?",[status,id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};


module.exports = productlist;
