const router = require("express").Router();

const userController = require("../controllers/usercontroller");
const connectionController = require("../controllers/connectionControllers");
const otpController = require("../controllers/otpControllers");
const {authGuard} = require("../middleware/authGuard");


router.post("/login", userController.loginUser);
router.post("/signup", userController.signupUser);
router.post("/updateuser",authGuard, userController.updateUser);
router.post("/deleteuser",authGuard, userController.deleteUser);

router.post('/forgotpassword', otpController.sendOTPMail);
router.post('/verify-otp', otpController.verifyOTPMail);


router.post("/createconnection",authGuard, connectionController.createConnection);
router.get("/viewallconnections", connectionController.viewAllConnections);

module.exports = router;