const router = require("express").Router();
const workDomainController = require("../controllers/workDomainController");

router.post("/create_domain", workDomainController.createWorkDomain);
router.get("/get_all_work_domain", workDomainController.getWorkDomain);


module.exports = router;
