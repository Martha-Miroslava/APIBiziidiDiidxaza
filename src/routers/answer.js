const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {getAnswers} = require("../controllers/answer-controller");
const {validationQuestionID} = require("../validators/answer-validator");

router.get("/answers/:questionID", checkAuth, checkRoleAuth(["manager","user"]), validationQuestionID, getAnswers);

module.exports = router;