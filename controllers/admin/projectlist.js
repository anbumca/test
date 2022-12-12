// const jwt = require("jsonwebtoken");
const Productlist = require("../../models/Admin/projectlist");
const { sendMail } = require('../../utils/mailService');
const bcrypt = require('bcrypt');

exports.readdata = async (req, res) => {
 
  Productlist.readdata( function (err, productlistdata) {
    if (err) {
      return res.status(403).send(err);
    }
    if (productlistdata.length === 0) {
      res.json({message: "No products available"});
    } else {
      res.json(productlistdata);
    }
  });
};

exports.addproductlist = async(req,res) =>{

 if(!req.body.name){
  return res.status(422).json({
    Name: "Name is required"
  });
 }
 if(!req.body.description){
  return res.status(422).json({
    description: "Description is required"
  });
 }
 if(!req.body.cost){
  return res.status(422).json({
    cost: "cost is required"
  });
 }
 if(!req.body.quantity){
  return res.status(422).json({
    quantity: "Quantity is required"
  });
 }

 const advisoradd = new Productlist(req.body);
 
 advisoradd.status =1;
 Productlist.addproductlist(advisoradd,function(err,adddata){
    if(err)
    {
      return res.status(403).send(err);
    }

    if(adddata === 'yes')
    {
      res.json({message: "Product already Added"});
    }else{
//console.log(req.files.product_image);
      if (req.files) {
        if (req.files.project_image) {
          const profileImage = req.files.project_image;
          profileImage.mv(`./public/projectimage/${profileImage.name}`, function (err) {
            if (err) {
              console.log(err)
              return res.status(500).send({ msg: "Error occured" });
            }
          });
          Productlist.profileImageUpload(`/projectimage/${profileImage.name}`, adddata.insertId, function (err) {
            if (err) {
              return res.status(403).send(err);
            }
            res.status(200).json({
              message: "Product Added Sucessfully",
              status_code: 1
            });
          });
        }
      } else {
        res.status(200).json({
          message: "Product Added Sucessfully",
          status_code: 1
        });
      }
      
    }
  });
};


exports.getprodutlist = async (req, res) => {
  if(!req.params.id)
  {
    return res.status(422).json({
      id:"Id is required"
    });
  }
 
  Productlist.getprodutlist( req.params.id,function (err, productlistdata) {
    if (err) {
      return res.status(403).send(err);
    }
    if (productlistdata.length === 0) {
      res.json({message: "No products available"});
    } else {
      res.json(productlistdata);
    }
  });
};


exports.editproductlist = async(req,res) =>{

  if(!req.params.id)
  {
    return res.status(422).json({
      Id: "Id is required"
    });
  }
  if(!req.body.name){
   return res.status(422).json({
     Name: "Name is required"
   });
  }
  if(!req.body.description){
   return res.status(422).json({
     description: "Description is required"
   });
  }
  if(!req.body.cost){
   return res.status(422).json({
     cost: "cost is required"
   });
  }
  if(!req.body.quantity){
   return res.status(422).json({
     quantity: "Quantity is required"
   });
  }
 
  const advisoradd = new Productlist(req.body);
  const id= req.params.id;
  
  //advisoradd.status =1;
  Productlist.editproductlist(id,advisoradd,function(err,adddata){
     if(err)
     {
       return res.status(403).send(err);
     }
 
     if(adddata === 'yes')
     {
       res.json({message: "Product already Added"});
     }else{
 
       if (req.files) {
         if (req.files.project_image) {
           const profileImage = req.files.project_image;
           profileImage.mv(`./public/projectimage/${profileImage.name}`, function (err) {
             if (err) {
               console.log(err)
               return res.status(500).send({ msg: "Error occured" });
             }
           });
           Productlist.profileImageUpload(`/projectimage/${profileImage.name}`, req.params.id, function (err) {
             if (err) {
               return res.status(403).send(err);
             }
             res.status(200).json({
               message: "Product Updated Sucessfully",
               status_code: 1
             });
           });
         }
       } else {
         res.status(200).json({
           message: "Product updated Sucessfully",
           status_code: 1
         });
       }
       
     }
   });
 };

 exports.deleteData = async (req, res) => {
  const id = req.params.id;
  const status = 0;
  Productlist.delete(id,status, function (err, productlist) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully Deleted",
        status_code: 1
      });
    }
  });
};

 
