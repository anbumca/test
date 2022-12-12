"user strict";

const Bidlist = function (bidlist) {
    this.id = bidlist.bid_id;
    this.approval_status = bidlist.approval_status || 0;
     this.energy_advisor = bidlist.user_id;
     this.comments = bidlist.comments;
  };

  Bidlist.updatebidstatus = function (bidlistdata,result) {
    console.log(bidlistdata);
    connection.query("Update ss_bit_plan set ? where id = ?",[bidlistdata,bidlistdata.id], (err, res) => {
      console.log(err);
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };


  module.exports = Bidlist;