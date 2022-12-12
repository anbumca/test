const Faq = require("../../models/admin/faq");

exports.faq = async (req, res) => {
  if (!req.params.id) {
    return res.status(422).json({
      id: "id is required"
    });
  }
  Faq.read(req.params.id, function (err, faq) {
    if (err) {
      return res.status(403).send(err);
    }
    if (faq.length === 0) {
      res.json({
        message: 'no data available'
      });
    } else {
      res.json(faq);
    }
  });
};

exports.addData = async (req, res) => {
  if (!req.body.general_inquire_id) {
    return res.status(422).json({
      general_inquire_id: "general inquire id is required",
      //status: "status is required"
      });
    }
  const faq = new Faq(req.body); 
    Faq.addData(faq, function (err, faq) {
      if (err) {
        return res.status(403).send(err);
      } else {
        res.status(200).json({
          message: "FAQ details Successfully Added",
          status_code: 1
        });
      }
    });
  };

exports.editData = async (req, res) => {
  if (!req.body.general_inquire_id) {
    return res.status(422).json({
      general_inquire_id: "general inquire id is required",
      //status: "status is required"
      });
    }
  const faqData = new Faq(req.body); 
    const id = req.params.id;
    Faq.editData(id, faqData, function (err, faqData) {
      if (err) {
        return res.status(403).send(err);
      } else {
        res.status(200).json({
          message: "FAQ details Successfully Updated",
          status_code: 1
        });
      }
    });
  };
 
exports.deleteData = async (req, res) => {
  const id = req.params.id;
    Faq.delete(id, function (err, faqData) {
      if (err) {
        return res.status(403).send(err);
      } else {
        res.status(200).json({
          message: "FAQ details Successfully deleted",
          status_code: 1
        });
      }
    });
  };

exports.getFaq = async (req, res) => {
  Faq.fetch(function (err, faq) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(faq);
    });
  };
  