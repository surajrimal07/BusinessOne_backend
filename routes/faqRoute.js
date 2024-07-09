const router = require("express").Router();

const faqController = require("../controllers/faqController");

router.post("/createfaq", faqController.createFaq);
router.get("/getallfaq", faqController.viewAllFaq);

module.exports = router;