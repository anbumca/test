const express = require("express");
const router = express.Router();
const {
  addInstaller,
  getInstaller
} = require("../../controllers/widget/installer");
const { addCityList, getCityList, deleteCityList, updateCityList } = require("../../controllers/widget/installerCityList");
const { addCustomerList, getCustomerList, deleteCustomerList, updateCustomerList } = require("../../controllers/widget/ss_installer_customer_list");
const { addProductType, getProductType, deleteProductType, updateProductType } = require("../../controllers/widget/ss_installer_product_type");
const {updateInstaller,uploadimage,deleteimage} = require("../../controllers/widget/installerUpdate");
const authorize = require("../../_middleware/authorize");

router.post("/add", addInstaller);
router.post("/get/:user_id", getInstaller);

router.post("/updateinstaller",updateInstaller );
router.post("/uploaduserimage/:user_id", uploadimage);
router.post("/deleteprofileimage/:id",deleteimage);

router.post("/add/city/list", addCityList);
router.post("/get/city/list", getCityList);
router.delete("/delete/city/list/:id", deleteCityList);
router.put("/update/city/list", updateCityList);

router.post("/add/customer/list", addCustomerList);
router.post("/get/customer/list", getCustomerList);
router.delete("/delete/customer/list/:id", deleteCustomerList);
router.put("/update/customer/list", updateCustomerList);

router.post("/add/Product/type", addProductType);
router.post("/get/Product/type", getProductType);
router.delete("/delete/Product/type/:id", deleteProductType);
router.put("/update/Product/type", updateProductType);

module.exports = router;
