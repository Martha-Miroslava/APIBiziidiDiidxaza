const router = require("express").Router();
const checkAuth = require("../middleware/Auth");
const checkRoleAuth = require("../middleware/RoleAuth");
const {postImageAccount, postImageLesson, deleteResource, patchResource, postAudio} = require("../controllers/ResourceController");
const {validationURL} = require("../validators/AccountValidator");
const {validateExistsAccount} = require("../controllers/AccountController");
const {validateExistsLesson} = require("../controllers/LessonController");
const {validateExistsQuestion} = require("../controllers/QuestionController");
const{validationAccount, validationLesson, validationQuestion} = require("../validators/ResourceValidator");
const {cacheInit} = require("../middleware/Cache");

router.patch("/resources", checkAuth, checkRoleAuth(["manager", "user"]), cacheInit, validationURL, patchResource);

router.post("/resources/lesson", checkAuth, checkRoleAuth(["manager"]), validationLesson, validateExistsLesson, postImageLesson);

router.post("/resources/account", validationAccount, validateExistsAccount, postImageAccount);

router.post("/resources/audio", checkAuth, checkRoleAuth(["manager"]), validationQuestion, validateExistsQuestion, postAudio);

router.delete("/resources", checkAuth, checkRoleAuth(["manager", "user"]), validationURL, deleteResource);

module.exports = router;
