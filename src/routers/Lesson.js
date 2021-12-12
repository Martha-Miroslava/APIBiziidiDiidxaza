const router = require("express").Router();
const checkAuth = require("../middleware/Auth");
const checkRoleAuth = require("../middleware/RoleAuth");
const {postLesson, getLessons} = require("../controllers/LessonController");
const {validationLesson} = require("../validators/LessonValidator");
const {cacheInit} = require("../middleware/Cache");

router.post("/lessons", checkAuth, checkRoleAuth(["manager"]), validationLesson, postLesson);

router.get("/lessons", checkAuth, checkRoleAuth(["manager","user"]), cacheInit, getLessons);


module.exports = router;
