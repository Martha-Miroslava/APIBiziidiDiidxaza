const router = require("express").Router();
const checkAuth = require("../middleware/Auth");
const checkRoleAuth = require("../middleware/RoleAuth");
const {postEmail, postAccountEmail} = require("../controllers/EmailController");
const {validationAccountEmail, validationSendEmail} = require("../validators/AccountValidator");

router.post("/emails", validationSendEmail, postEmail); 

router.post("/emails/account", checkAuth, checkRoleAuth(["manager"]), validationAccountEmail, postAccountEmail); 

module.exports = router;
