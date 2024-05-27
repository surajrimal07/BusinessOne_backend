

const router = require("express").Router();

const userController = require("../controllers/usercontroller");


router.post("/login", userController.loginUser);
router.post("/signup", userController.signupUser);


module.exports = router;