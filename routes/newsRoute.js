const router = require("express").Router();
const newsController = require("../controllers/newsControllers");
const { authGuardAdmin } = require("../middleware/authGuard");

router.post("/createnews", authGuardAdmin, newsController.createNews);

module.exports = router;
