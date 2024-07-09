const companyClaimsController = require("../controllers/ClaimedCompanyController");
const router = require("express").Router();
const uploadImage = require("../helpers/uploadHelper.js");


// Routes
router.post(
  "/company-claims",
  uploadImage.fields([
    { name: "registrationimage", maxCount: 1 },
    { name: "citizenshipimage", maxCount: 1 },
  ]),
  companyClaimsController.createCompanyClaim
);
module.exports = router