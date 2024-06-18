const router = require("express").Router();
const newsController = require("../controllers/newsControllers");

router.post("/createnews", newsController.createNews);

module.exports = router;
