const router = require("express").Router();
const CompanyController = require("../controllers/companyController");
const uploadImage = require("../helpers/uploadHelper.js");

router.post(
  "/create_company",
  uploadImage.fields([
    { name: "companyImage", maxCount: 1 },
    { name: "productImages", maxCount: 10 },
    { name: "timelineImages", maxCount: 10 },
  ]),
  CompanyController.createCompany
);
router.get(`/view_details_of_company/:name`, CompanyController.viewCompany);

module.exports = router;
