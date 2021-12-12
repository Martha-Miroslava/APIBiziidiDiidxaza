const router = require("express").Router();
const checkAuth = require("../middleware/Auth");
const checkRoleAuth = require("../middleware/RoleAuth");
const {getAnswers} = require("../controllers/AnswerController");
const {validationQuestionID} = require("../validators/AnswerValidator");

router.get("/answers/:questionID", checkAuth, checkRoleAuth(["manager","user"]), validationQuestionID, getAnswers);

module.exports = router;