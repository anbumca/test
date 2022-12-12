"user strict";

const bids = function (bids) {
    this.project = bids.project_id;

};

bids.read = function (biddata, result) {
    connection.query("SELECT * FROM ss_project_information WHERE id = ?", [biddata], (err, res) => {

        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

bids.readbid = function (biddata, result) {
    connection.query("SELECT * FROM ss_bit_plan WHERE id = ?", [biddata], (err, res) => {

        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


bids.delete = function (id, result) {
    connection.query("DELETE FROM ss_bit_plan WHERE id = ?", [id], function (err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

bids.readCharity = function (result) {
    connection.query("SELECT * FROM ss_charity_list", (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = bids;
