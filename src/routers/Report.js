const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/roleAuth");
const { getReports, postReport, getReport, getReportsFilters } = require("../controllers/reportController");
const { validationReport, validationReportFilters, validationCriterion, validationReportId } = require("../validators/reportValidator");
const { validateExistsAccounts } = require("../controllers/accountController");
const {cacheInit} = require("../middleware/cache");

router.get("/reports/:filter/:criterion", checkAuth, checkRoleAuth(["manager"]), validationReportFilters, validationCriterion, getReportsFilters);

router.get("/reports", checkAuth, checkRoleAuth(["manager"]),cacheInit, getReports);

router.get("/reports/:reportID", checkRoleAuth(["manager"]), checkAuth, validationReportId, cacheInit, getReport);

router.post("/reports", checkAuth, checkRoleAuth(["manager","user"]), validationReport, validateExistsAccounts, postReport);


module.exports = router;



