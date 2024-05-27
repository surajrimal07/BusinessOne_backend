

const router = require("express").Router();

const userController = require("../controllers/usercontroller");


router.post("/login", userController.loginUser);
router.post("/signup", userController.signupUser);
router.post("/forgotpassword", userController.forgetPassword);
router.post("/updateuser", userController.updateUser);
router.post("/deleteuser", userController.deleteUser);
router.post("/createconnection", userController.createConnection);

module.exports = router;