// const jwt = require("jsonwebtoken");
const Search = require("../../models/widget/searchlist");

exports.search = async (req, res) => {
  // if (!req.body.city) {
  //   return res.status(422).json({
  //     //city: "city is required"
  //   });
  // }
  const searchData = new Search(req.body);
  Search.read(searchData, function (err, Search) {
    if (err) {
      return res.status(403).send(err);
    }
    if(Search.length == 0)
    {
      return res.status(200).send({"message":"No Record available"});
    }else{
    res.json(Search);
    }
  });
};


exports.updatecommerical = async (req, res) => {
  if (!req.body) {
    return res.status(422).json({
      name: "First Name is required",
      phone:"The Phone Number is required",
      email:"Email is required",
      address:"Address is required"
    });
  }
  const searchlistData = new Search(req.body); 
  Search.updatecommerical(searchlistData, function (err, searchlistData) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully commerical details shared to the admin.",
        status_code: 1
      });
    }
  });
};
