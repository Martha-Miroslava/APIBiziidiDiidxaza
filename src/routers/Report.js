const router = require("express").Router();
const checkAuth = require("../middleware/Auth");
const checkRoleAuth = require("../middleware/RoleAuth");
const { getReports, postReport, getReport, getReportsFilters } = require("../controllers/ReportController");
const { validationReport, validationReportFilters, validationCriterion, validationReportId } = require("../validators/ReportValidator");
const { validateExistsAccounts } = require("../controllers/AccountController");
const {cacheInit} = require("../middleware/Cache");

router.get("/reports/:filter/:criterion", checkAuth, checkRoleAuth(["manager"]), validationReportFilters, validationCriterion, getReportsFilters);

router.get("/reports", checkAuth, checkRoleAuth(["manager"]),cacheInit, getReports);

router.get("/reports/:reportID", checkRoleAuth(["manager"]), checkAuth, validationReportId, cacheInit, getReport);

router.post("/reports", checkAuth, checkRoleAuth(["manager","user"]), validationReport, validateExistsAccounts, postReport);


module.exports = router;



