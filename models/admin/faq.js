"user strict";

const faq = function (faq) {
  this.general_inquire_id = faq.general_inquire_id;
  this.questions = faq.questions;
  this.answer = faq.answer;
  this.faq_user_type = faq.faq_user_type;
  this.status = faq.status || 1;
};

faq.read = function (id, result) {
  connection.query("SELECT * FROM ss_faq WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

faq.addData = function (faq, result) {
  console.log(faq);
  connection.query("INSERT INTO ss_faq set ?", faq, function (err, res) {
    if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

faq.editData = function (id, faqData, result) {
  connection.query("UPDATE ss_faq SET ? WHERE id = ?", [faqData, id], function (
      err,
      res
    ) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };

faq.delete = function (id, result) {
  connection.query("DELETE FROM ss_faq WHERE id = ?", [id], function (err,res) {
      if (err) {
          result(null, err);
        } else {
          result(null, res);
        }
      });
    };

faq.fetch = function (faq,result) {
  connection.query("SELECT * FROM ss_faq",faq, (err, res) => {
    if (err) {
      result(err, null);
    } else {
        result(null, res);
        }
      });
    };    

module.exports = faq;
