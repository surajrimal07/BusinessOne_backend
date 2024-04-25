const router = require("express").Router();
const CompanyController = require("../controllers/companyController");

router.post("/create_company", CompanyController.createCompany);
router.get(`/view_details_of_company/:name`, CompanyController.viewCompany);


module.exports = router;
