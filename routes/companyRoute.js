const router = require("express").Router();
const CompanyController = require("../controllers/companyController");
const uploadImage = require("../helpers/uploadHelper.js");
const { authGuardAdmin } = require("../middleware/authGuard");

router.post(
  "/create_company",
  authGuardAdmin,
  uploadImage.fields([
    { name: "companyImage", maxCount: 1 },
    { name: "productImages", maxCount: 10 },
    { name: "timelineImages", maxCount: 10 },
  ]),
  CompanyController.createCompany
);
router.get(`/view_details_of_company/:id`, CompanyController.viewCompany);

router.get("/get_all_company", CompanyController.viewAllCompany);
router.get("/get_category_company", CompanyController.viewCompanyByCategory);
router.get("/get_new_company", CompanyController.viewNewAddedCompany);
router.put(
  "/admin_delete_company/:id",
  authGuardAdmin,
  CompanyController.deleteCompany
);
router.put(
  "/admin_update_company/:id",
  authGuardAdmin,
  uploadImage.fields([
    { name: "companyImage", maxCount: 1 },
    { name: "productImages", maxCount: 10 },
    { name: "timelineImages", maxCount: 10 },
  ]),
  CompanyController.updateCompany
);
module.exports = router;
