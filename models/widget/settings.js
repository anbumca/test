"user strict";

const Settings = function (Setting) {
  this.google_client_id = Setting.google_client_id;
  this.google_client_secret_key = Setting.google_client_secret_key;
  this.facebook_api_key = Setting.facebook_api_key;
  this.facebook_api_secret_key = Setting.facebook_api_secret_key;
  this.google_api_key = Setting.google_api_key;
};

Settings.read = function (result) {
  connection.query("SELECT * FROM ss_settings", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Settings;
