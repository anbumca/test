// const jwt = require("jsonwebtoken");
const Energyadvisor = require("../../models/Admin/energyadvisor");
const { sendMail } = require('../../utils/mailService');
const bcrypt = require('bcrypt');
const energyadvisorupdate = require("../../models/Admin/energyadvisorupdate");

exports.readdata = async (req, res) => {
 
  Energyadvisor.readdata( function (err, installerData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (installerData.length === 0) {
      res.json({message: "No Customer available"});
    } else {
      res.json(installerData);
    }
  });
};

exports.addenergyadvisor = async(req,res) =>{
//console.log(req.body);
//console.log(req.files);
 if(!req.body.first_name){
  return res.status(422).json({
    first_name: "First Name is required"
  });
 }
 if(!req.body.last_name){
  return res.status(422).json({
    last_name: "Last Name is required"
  });
 }
 if(!req.body.email){
  return res.status(422).json({
    email: "Email is required"
  });
 }
 if(!req.body.password){
  return res.status(422).json({
    password: "Password is required"
  });
 }
 if(!req.body.phonenumber){
  return res.status(422).json({
    phonenumber: "Phonenumber is required"
  });
 }
 const advisoradd = new Energyadvisor(req.body);
 var pwd = advisoradd.password;
 advisoradd.password = bcrypt.hashSync(pwd,10);
 advisoradd.status =1;
  Energyadvisor.addadvisor(advisoradd,function(err,adddata){
    if(err)
    {
      return res.status(403).send(err);
    }

    if(adddata === 'yes')
    {
      res.json({message: "Energy Advisor already registered"});
    }else{

      if (req.files) {
        if (req.files.profile_image) {
          const profileImage = req.files.profile_image;
          profileImage.mv(`./public/profileImage/${profileImage.name}`, function (err) {
            if (err) {
              console.log(err)
              return res.status(500).send({ msg: "Error occured" });
            }
          });
          Energyadvisor.profileImageUpload(`/profileImage/${profileImage.name}`, adddata.insertId, function (err) {
            if (err) {
              return res.status(403).send(err);
            }
            res.status(200).json({
              message: "Energy Advisor Added Sucessfully",
              status_code: 1
            });
          });
        }
      } else {
        res.status(200).json({
          message: "Energy Advisor Added Sucessfully",
          status_code: 1
        });
      }
      
    }
  });
};


exports.getenergyadvisor = async (req, res) => {
 
  if(!req.params.id){
    return res.status(422).json({
      ID: "Id is required"
    });
   }

  Energyadvisor.getenergyadvisor(req.params.id, function (err, energyData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (energyData.length === 0) {
      res.json({message: "No EnergyAdvisor available"});
    } else {
      res.json(energyData);
    }
  });
};




exports.editenergyadvisor = async(req,res) =>{

  if(!req.params.id)
  {
    return res.status(422).json({
      Id: "Id is required"
    });
  }
  if(!req.body.first_name){
   return res.status(422).json({
     FirstName: "First Name is required"
   });
  }
  if(!req.body.last_name){
   return res.status(422).json({
     last_name: "Last Name is required"
   });
  }
  if(!req.body.email){
   return res.status(422).json({
     email: "Email is required"
   });
  }
 
 
  const advisoradd = new energyadvisorupdate(req.body);
  const id= req.params.id;
  
  //advisoradd.status =1;
  energyadvisorupdate.editenergyadvisor(id,advisoradd,function(err,adddata){
     if(err)
     {
       return res.status(403).send(err);
     }
     //console.log(req.files);
 
     if (req.files) {
         if (req.files.profile_image) {
           const profileImage = req.files.profile_image;
           profileImage.mv(`./public/projectimage/${profileImage.name}`, function (err) {
             if (err) {
               console.log(err)
               return res.status(500).send({ msg: "Error occured" });
             }
           });
           
           energyadvisorupdate.profileImageUpload(`/projectimage/${profileImage.name}`, req.params.id, function (err) {
             if (err) {
               return res.status(403).send(err);
             }
             res.status(200).json({
               message: "Energyadvisor Updated Sucessfully",
               status_code: 1
             });
           });
         }
       } else {
         res.status(200).json({
           message: "Energyadvisor updated Sucessfully",
           status_code: 1
         });
       }
       
     
   });
 };


 exports.deleteData = async (req, res) => {
  const id = req.params.id;
  const status = 0;
  Energyadvisor.delete(id,status, function (err, productlist) {
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

exports.activeupdate = async (req, res) => {

  if(!req.body.status)
  {
    return res.status(422).json({
      Status: "Status is required"
    });
  }
  const datadetails = new Energyadvisor(req.body);
  const id = req.params.id;
  
  Energyadvisor.activeupdate(id,datadetails.status, function (err, energyadvisorlist) {
    if (err) {
      return res.status(403).send(err);
    } else {

      if(energyadvisorlist === 'yes')
      {
        res.status(200).json({
          message: "Successfully Activated",
          status_code: 1
        });

      }else{
        res.status(200).json({
          message: "Successfully Deactived",
          status_code: 1
        });
      }
     
    }
  });
};
