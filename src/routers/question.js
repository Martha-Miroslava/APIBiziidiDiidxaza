const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/roleAuth");
const {getQuestions} = require("../controllers/questionController");
const {validationLessonID} = require("../validators/lessonValidator");

router.get("/questions/:lessonID", checkAuth, checkRoleAuth(["manager","user"]), validationLessonID, getQuestions);


module.exports = router;
