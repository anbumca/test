const faq = require("../../models/widget/faq");

exports.faq = async (req, res) => {
  if (!req.body) {
    return res.status(422).json({
      generalid: "id is required",
      usertype:"usertype id is required"
    });
  }
  const faqlistdata = new faq(req.body);
  faq.read(faqlistdata, function (err, faq) {
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
