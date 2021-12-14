const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/roleAuth");
const {postEmail, postAccountEmail} = require("../controllers/emailController");
const {validationAccountEmail, validationSendEmail} = require("../validators/accountValidator");

router.post("/emails", validationSendEmail, postEmail); 

router.post("/emails/account", checkAuth, checkRoleAuth(["manager"]), validationAccountEmail, postAccountEmail); 

module.exports = router;
