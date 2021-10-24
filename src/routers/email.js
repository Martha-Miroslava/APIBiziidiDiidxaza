const {Router} = require("express");
const router = Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {postEmail, postAccountEmail} = require("../controllers/email-controller");
const {validationAccountEmail, validationSendEmail} = require("../validators/account-validator");

router.post("/emails", validationSendEmail, postEmail); 

router.post("/emails/account", checkAuth, checkRoleAuth(["manager"]), validationAccountEmail, postAccountEmail); 

module.exports = router;
