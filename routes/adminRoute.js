const router = require("express").Router();
const adminController = require("../controllers/adminController");
const {authGuardAdmin} = require("../middleware/authGuard");

router.post("/create",authGuardAdmin, adminController.createAdmin);

router.post("/login", adminController.loginAdmin);

module.exports = router;
