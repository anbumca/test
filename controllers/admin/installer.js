// const jwt = require("jsonwebtoken");
const Installer = require("../../models/admin/installer");
const InstallerAddress =require("../../models/admin/installeraddress");
const { sendMail } = require('../../utils/mailService');

exports.readdata = async (req, res) => {
 
  Installer.readdata( function (err, installerData) {
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

exports.activeinstaller = async (req, res) => {
  //console.log(req.body);
  if (!req.body.installer_id ) {
    return res.status(422).json({
      InstallerID: "Id is required",
      //status: "Status is required"
    });
  }
  const InstallerlistData = new Installer(req.body); 
  Installer.activeinstaller(InstallerlistData, function (err, installerData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (installerData.length === 0) {
      res.json({message: "No Installer available"});
    } else {
      if(installerData === "yes")
      {
        //console.log(req.body.installer_id);
        Installer.getuser(req.body.installer_id,function(err,installerlist){

          if(err)
          {
            return res.status(403).send(err);
          }
           if(installerlist.length === 0){
            res.json({message: "No Installer available"});
           }else{
            first_name = installerlist[0].first_name;
            last_name =installerlist[0].last_name;
            user_email =installerlist[0].email;
            user_name = first_name + last_name;
            user_password = "Welcome123!";

            const { 
              REPORT_PROFILE_FROM_EMAIL : senderEmail,
              REPORT_PROFILE_EMAIL_SUBJECT : subject,
              REPORT_PROFILE_HTML_CONTENT : htmlData,
              REPORT_PROFILE_AUTH_EMAIL: authEmail,
              REPORT_PROFILE_AUTH_PASS: authPass
            } = process.env;

            let htmlDatas = htmlData
            // console.log(res);
            htmlDatas = htmlDatas.replace('[ReplaceName]',user_name);
            htmlDatas = htmlDatas.replace('[ReplaceUsername]',user_email);
            htmlDatas = htmlDatas.replace('[ReplacePassword]',user_password);
            //console.log(htmlDatas);
            sendMail(authEmail, authPass, senderEmail, user_email, subject, htmlDatas);
            res.status(200).json({
              message: "Installer Actived Successfully",
              status_code: 1
            });
           }
          

        });
        
        
      }else{
        res.status(200).json({
          message: "Installer Deactived Successfully",
          status_code: 1
        });
      }
     
    }
  });
};

exports.getprojectlist =async(req,res)=>{

Installer.getprojectlist( function (err, installerData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (installerData.length === 0) {
      res.json({message: "No project available"});
    } else {
      res.json(installerData);
    }
  });
};

exports.assignproject = async (req, res) => {
  if(!req.body.installer_id || !req.body.project_id)
  {
    return res.status(422).json({
      InstallerID: "Id is required",
      Projectid: "Project id is required",
      status:"Status is required"
    });
  }
  const installerdata = new Installer(req.body);
  
  Installer.assignproject( installerdata,function (err, installerData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (installerData === "yes") {
      res.json({message: "Selected Project is already assigned to the installer",status_code: -1});
    } else {
      res.status(200).json({
        message: "Project is assigned to the installer Successfully",
        status_code: 1
      });
    }
  });
};

exports.getinstallerdetails = async (req, res) => {
  if(!req.params.id)
  {
    return res.status(422).json({
      InstallerID: "Id is required"
    });
  }
  //const installerdata = new Installer(req.body);
  
  Installer.getinstallerdetails( req.params.id,function (err, installerData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (installerData === 0) {
      res.json({message: "NO installer available"});
    } else {
      res.json(installerData);
    }
  });
};

exports.editinstaller = async (req, res) => {
  if(!req.body.installer_id)
  {
    return res.status(422).json({
      InstallerID: "Id is required"
    });
  }
  const installerdata = new Installer(req.body);
  
  Installer.editinstaller( installerdata,function (err, installerData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (installerData === 0) {
      res.json({message: "NO Update on installer"});
    } else {
      const installeraddress = new InstallerAddress(req.body);
      console.log(installeraddress);
      InstallerAddress.updateinstaller(installeraddress,function (err, installerData) {

        if(err)
        {
          return res.status(403).send(err);
        }

        res.status(200).json({
          message: "Installer updated Sucessfully",
          status_code: 1
        });
      });
     
    }
  });
};