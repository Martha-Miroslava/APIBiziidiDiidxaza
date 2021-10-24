const router= require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {getReports, postReport, getReport, getReportsFilters} = require("../controllers/report-controller");
const {validationReport, validationReportFilters, validationCriterion, validationReportId}= require("../validators/report-validator");
const {validateExistsAccounts} = require("../controllers/account-controller");

router.get("/reports/:filter/:criterion", checkAuth, checkRoleAuth(["manager"]), validationReportFilters, validationCriterion, getReportsFilters);

router.get("/reports", checkAuth, checkRoleAuth(["manager"]), getReports);

router.get("/reports/:reportID", checkRoleAuth(["manager"]), checkAuth, validationReportId, getReport);

router.post("/reports", checkAuth, checkRoleAuth(["user"]), validationReport, validateExistsAccounts, postReport);


module.exports = router;



