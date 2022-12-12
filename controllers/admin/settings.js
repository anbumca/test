const admin_settings = require("../models/admin/settings");

exports.generalsettings=async (req, res) => {

    if(!req.body.google_client_id || !req.body.google_client_secret_key || !req.body.facebook_api_key || !req.body.facebook_api_secret_key || !req.body.google_api_key)
    {
        return res.status(422).json({
            google_client_id: "Google Client Id id Required",
            google_client_secret_key: "Google secret key is required",
            facebook_api_key: "Facebook API key is required",
            facebook_api_secret_key:"Facebook Secret Key is required",
            google_api_key:"Google API key is required"
          });
    }
    const generalsettings = new Generalsettings(req.body);
    Generalsettings.generalkey(generalsettings, function (err, generalsettings) {
        if(err)
        {
            return res.status(403).send(err);
        }
        if(generalsettings[0])
        {
            
            return res.status(200).json({
                message: "success",
                google_client_id: generalsettings[0].google_client_id,
                google_client_secret_key: generalsettings[0].google_client_secret_key,
                facebook_api_key: ugeneralsettingsser[0].facebook_api_key,
                facebook_api_secret_key: generalsettings[0].facebook_api_secret_key,
                google_api_key: generalsettings[0].google_api_key,
                status_code: 1,
                
              });
        }else {
            return res.status(200).json({
              message: "user not found",
              status_code: 0
            });
          }
        
    });
};