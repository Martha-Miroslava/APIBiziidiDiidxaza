const router = require("express").Router();
const checkAuth = require("../middleware/Auth");
const checkRoleAuth = require("../middleware/RoleAuth");
const {getQuestions} = require("../controllers/QuestionController");
const {validationLessonID} = require("../validators/LessonValidator");

router.get("/questions/:lessonID", checkAuth, checkRoleAuth(["manager","user"]), validationLessonID, getQuestions);


module.exports = router;
