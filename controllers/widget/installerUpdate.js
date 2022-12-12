const InstallerUpdate = require("../../models/widget/installerUpdate");
const bcrypt = require('bcrypt');

exports.updateInstaller = async (req, res) => {
    if (!req.body) {
      return res.status(422).json({
        Email: "Emailid is required",
        Password:"Password is required",
        Firstname:"First Name is required",
        lastname:"Last Name is required",
        phonenumber:"Phone Number is required",
        address:"Address is required",
        
      });
    }
    console.log(req.body);
    const installer = new InstallerUpdate(req.body);
    var isPasswordChanged = installer.isPasswordChanged;
    var pwd = installer.password;
  // Hash the password before insert it into the database.
  if(isPasswordChanged === 1)
  {
    installer.password = bcrypt.hashSync(pwd,10);
  }
  
    InstallerUpdate.updateinstaller(installer, function (err, Installer) {
      if (err) {
        return res.status(403).send(err);
      }
      res.json({
        message: "Installer updated successfully"
      });
    });
  };


  exports.uploadimage = async (req, res) => {
    const id = req.params.user_id;
    console.log(id);
    if (!id) {
      return res.status(422).json({
        userId: "userId is required"
      });
    }
    // const projectInfo = new ProjectInfo(user_id);
    if (req?.files?.image) {
      const Image = req.files.image;
      Image.mv(`./public/profileimage/${Image.name}`, function (err) {
        if (err) {
          return res.status(500).send({ msg: "Error occured" });
        }
      });
      InstallerUpdate.imageUpload(`/profileimage/${Image.name}`, id, function (err, projectInfo) {
        if (err) {
          return res.status(403).send(err);
        }
        res.json({
          message: "ProfileImage  uploaded successfully"
        });
      });
    } 

  };

  exports.deleteimage = async (req, res) => {
    if (!req.params.id) {
      return res.status(422).json({
        id: "id is required"
      });
    }
    InstallerUpdate.deleteimage(req.params.id, function (err, Installer) {
      if (err) {
        return res.status(403).send(err);
      }
      res.json({
        message: "Image Deleted successfully"
      });
    });
  };
  
  