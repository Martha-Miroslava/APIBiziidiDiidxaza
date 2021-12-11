const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const { getReports, postReport, getReport, getReportsFilters } = require("../controllers/report-controller");
const { validationReport, validationReportFilters, validationCriterion, validationReportId } = require("../validators/report-validator");
const { validateExistsAccounts } = require("../controllers/account-controller");
const {cacheInit} = require("../middleware/cache");

router.get("/reports/:filter/:criterion", checkAuth, checkRoleAuth(["manager"]), validationReportFilters, validationCriterion, getReportsFilters);

router.get("/reports", checkAuth, checkRoleAuth(["manager"]),cacheInit, getReports);

router.get("/reports/:reportID", checkRoleAuth(["manager"]), checkAuth, validationReportId, cacheInit, getReport);

router.post("/reports", checkAuth, checkRoleAuth(["manager","user"]), validationReport, validateExistsAccounts, postReport);


module.exports = router;



