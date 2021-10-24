const {Router} = require("express");
const router = Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {getQuestions} = require("../controllers/question-controller");
const {validationLessonID} = require("../validators/lesson-validator");

router.get("/questions/:lessonID", checkAuth, checkRoleAuth(["user"]), validationLessonID, getQuestions);


module.exports = router;