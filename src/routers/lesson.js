const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {postLesson, getLessons} = require("../controllers/lesson-controller");
const {validationLesson} = require("../validators/lesson-validator");
const {cacheInit} = require("../middleware/cache");

router.post("/lessons", checkAuth, checkRoleAuth(["manager"]), validationLesson, postLesson);

router.get("/lessons", checkAuth, checkRoleAuth(["manager","user"]), cacheInit, getLessons);


module.exports = router;