const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {getQuestions} = require("../controllers/question-controller");
const {validationLessonID} = require("../validators/lesson-validator");

router.get("/questions/:lessonID", checkAuth, checkRoleAuth(["manager","user"]), validationLessonID, getQuestions);


module.exports = router;