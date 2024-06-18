const router = require("express").Router();

const userController = require("../controllers/usercontroller");
const connectionController = require("../controllers/connectionControllers");
const otpController = require("../controllers/otpControllers");


router.post("/login", userController.loginUser);
router.post("/signup", userController.signupUser);
router.post("/updateuser", userController.updateUser);
router.post("/deleteuser", userController.deleteUser);

router.post('/forgotpassword', otpController.sendOTPMail);
router.post('/verify-otp', otpController.verifyOTPMail);


router.post("/createconnection", connectionController.createConnection);
router.get("/viewallconnections", connectionController.viewAllConnections);

module.exports = router;