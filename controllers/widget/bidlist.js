const Bids = require("../../models/widget/bidlist");

exports.bids = async (req, res) => {
  if (!req.params.project_id) {
    return res.status(422).json({
      bidId: "project_id is required"
    });
  }
  Bids.read(req.params.project_id, function (err, bidInfo) {
    if (err) {
      return res.status(403).send(err);
    }
    if (bidInfo.length === 0) {
      res.json({ message: "no project information" });
    } else {
      res.json(bidInfo);
    }
  });
};

exports.readbid = async (req, res) => {
  if (!req.params.id) {
    return res.status(422).json({
      id: "id is required"
    });
  }
  Bids.readbid(req.params.id, function (err, bidInfo) {
    if (err) {
      return res.status(403).send(err);
    }
    if (bidInfo.length === 0) {
      res.json({
        message: 'no data available'
      });
    }
    else {
      res.json(bidInfo);
    }
  });
};

exports.deletebid = async (req, res) => {
  const id = req.params.id;
  Bids.delete(id, function (err, bid) {
    if (err) {
      return res.status(403).send(err);
    } else {
      res.status(200).json({
        message: "Successfully deleted",
        status_code: 1
      });
    }
  });
};

exports.readCharity = async (req, res) => {
  Bids.readCharity(function (err, CharityData) {
    if (err) {
      return res.status(403).send(err);
    }
    if (CharityData.length === 0) {
      res.json({ message: "No charity information" });
    } else {
      res.json(CharityData);
    }
  });
};


