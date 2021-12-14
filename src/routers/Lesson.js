const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/roleAuth");
const {postLesson, getLessons} = require("../controllers/lessonController");
const {validationLesson} = require("../validators/lessonValidator");
const {cacheInit} = require("../middleware/cache");

router.post("/lessons", checkAuth, checkRoleAuth(["manager"]), validationLesson, postLesson);

router.get("/lessons", checkAuth, checkRoleAuth(["manager","user"]), cacheInit, getLessons);


module.exports = router;
