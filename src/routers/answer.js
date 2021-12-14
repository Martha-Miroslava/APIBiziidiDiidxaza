const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/roleAuth");
const {getAnswers} = require("../controllers/answerController");
const {validationQuestionID} = require("../validators/answerValidator");

router.get("/answers/:questionID", checkAuth, checkRoleAuth(["manager","user"]), validationQuestionID, getAnswers);

module.exports = router;
