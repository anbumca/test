const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');

require("dotenv").config();

const connection = require("./database/mysqlDB");

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

// database init
function mysqlConnect() {
  global.connection = mysql.createConnection(connection);

  global.connection.connect(function (err) {
    if (err) {
      console.log(err);
      console.log("error when connecting to db");
      setTimeout(mysqlConnect, 2000);
    }
    console.log("connected to database");
  });
  global.connection.on("error", function (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      mysqlConnect();
    } else {
      throw err;
    }
  });
}

mysqlConnect();

// Routes

// Admin
const resdentialAdmin = require("./routes/admin/resdential");
const generalsettings = require("./routes/admin/generalsettings");
const userroles = require("./routes/admin/userroles");
const citylist = require("./routes/admin/citylist");
const customerlist = require("./routes/admin/customerlist");
const charity = require("./routes/admin/charity");
const faqAdmin = require("./routes/admin/faq");
const installerlist =require("./routes/admin/installer");
const energyadvisor =require("./routes/admin/energyadvisor");
const smtplist =require("./routes/admin/smtplist");
const notificationsettings =require("./routes/admin/notificationsettings");
const dashboard =require("./routes/admin/dashboard");
const hardwarelist =require("./routes/admin/productlist");
const cmsdata =require("./routes/admin/cmsdata");
const customer=require("./routes/admin/customer");

// Widget
const userRoutes = require("./routes/widget/user");
const settingRoutes = require("./routes/widget/settings");
const search = require("./routes/widget/search");
const resdential = require("./routes/widget/resdential");
const product = require("./routes/widget/products");
const projectinformation = require("./routes/widget/project_information");
const searchlist = require("./routes/widget/searchlist");
const faq = require("./routes/widget/faq");
const installer = require("./routes/widget/installer");
const installerBitProduct = require("./routes/widget/installerBitProduct");
const productList = require("./routes/widget/product_list");
const bidlist = require("./routes/widget/bidlist");


// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes admin
app.use("/api/admin/resdential", resdentialAdmin);
app.use("/api/admin/charity", charity);
app.use("/api/admin/generalsettings",generalsettings);
app.use("/api/admin/userroles",userroles);
app.use("/api/admin/citylist",citylist);
app.use("/api/admin/customerlist",customerlist);
app.use("/api/admin/faq", faqAdmin);
app.use("/api/admin/installer",installerlist);
app.use("/api/admin/energyadvisor",energyadvisor);
app.use("/api/admin/smtplist",smtplist);
app.use("/api/admin/notificationsettings",notificationsettings);
app.use("/api/admin/dashboard",dashboard);
app.use("/api/admin/productlist",hardwarelist);
app.use("/api/admin/cmsdata",cmsdata);
app.use("/api/admin/customer",customer);


// Routes widget
app.use("/api", userRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/projectinformation", projectinformation);
app.use("/api/resdential", resdential);
app.use("/api/product", product);
app.use("/api/search", search);
app.use("/api/searchlist", searchlist);
app.use("/api/faq", faq);
app.use("/api/product/List", productList);
app.use("/api/installer", installer);
app.use("/api/bit", installerBitProduct);
app.use("/api/bidlist",bidlist);


// PORT
const port = process.env.PORT || 3000;

const ipaddress = process.env.IP_ADDRESS || '127.0.0.1';

// Starting a server
app.listen(port,ipaddress, () => {
  console.log(`app is running at ${port}`);
});
