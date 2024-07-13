const companyClaimsController = require("../controllers/ClaimedCompanyController");
const router = require("express").Router();
const uploadImage = require("../helpers/uploadHelper.js");
const {newAuthGuard,authGuardAdmin} = require("../middleware/authGuard");


// Routes
router.post(
  "/company-claims",
  uploadImage.fields([
    { name: "document1", maxCount: 1 },
    { name: "document2", maxCount: 1 },
  ]),newAuthGuard,
  companyClaimsController.createCompanyClaim
);
router.get('/claims', companyClaimsController.getAllClaims);
router.put(`/verify-claim/:claimId`, authGuardAdmin, companyClaimsController.verifyClaim);
router.put(`/reject-claim/:claimId`, authGuardAdmin, companyClaimsController.rejectClaim);


module.exports = router