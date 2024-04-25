const router = require("express").Router();
const workDomainController = require("../controllers/workDomainController");

router.post("/create_domain", workDomainController.createWorkDomain);


module.exports = router;
