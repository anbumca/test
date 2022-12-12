// const jwt = require("jsonwebtoken");
const resdential = require("../../models/widget/resdential");

exports.read = async (req, res) => {
  resdential.read(function (err, resdential) {
    if (err) {
      return res.status(403).send(err);
    }
    res.json(resdential);
  });
};