"user strict";

const faq = function (faq) {
  this.general_inquire_id = faq.general_id;
  this.faq_user_type = faq.faq_user_type; 
  
};

faq.read = function (faqlistdata, result) {
  connection.query("SELECT * FROM ss_faq WHERE general_inquire_id = ? and  faq_user_type = ?", [faqlistdata.general_inquire_id,faqlistdata.faq_user_type], (err, res) => {

    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = faq;
