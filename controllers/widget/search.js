// const jwt = require("jsonwebtoken");
const Search = require("../../models/widget/search");

exports.search = async (req, res) => {
  if (!req.body.city || !req.body.zipcode) {
    return res.status(422).json({
      city: "city is required",
      zipcode: "zipcode is required"
    });
  }
  const searchData = new Search(req.body);
  Search.read(searchData, function (err, Search) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(Search);
  });
};
