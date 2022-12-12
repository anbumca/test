const express = require("express");
const router = express.Router();
const {
  settings,
  readsettings,
  updatesettings,
  
} = require("../controllers/admmin/settings");