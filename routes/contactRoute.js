const router = require("express").Router();

const contactController = require("../controllers/contactController");



router.post("/create_contact", contactController.createContact);
router.get("/get_contact", contactController.viewAllContact);

module.exports = router;