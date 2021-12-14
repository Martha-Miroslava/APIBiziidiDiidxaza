const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/roleAuth");
const {postImageAccount, postImageLesson, deleteResource, patchResource, postAudio} = require("../controllers/resourceController");
const {validationURL} = require("../validators/accountValidator");
const {validateExistsAccount} = require("../controllers/accountController");
const {validateExistsLesson} = require("../controllers/lessonController");
const {validateExistsQuestion} = require("../controllers/questionController");
const{validationAccount, validationLesson, validationQuestion} = require("../validators/resourceValidator");
const {cacheInit} = require("../middleware/cache");

router.patch("/resources", checkAuth, checkRoleAuth(["manager", "user"]), cacheInit, validationURL, patchResource);

router.post("/resources/lesson", checkAuth, checkRoleAuth(["manager"]), validationLesson, validateExistsLesson, postImageLesson);

router.post("/resources/account", validationAccount, validateExistsAccount, postImageAccount);

router.post("/resources/audio", checkAuth, checkRoleAuth(["manager"]), validationQuestion, validateExistsQuestion, postAudio);

router.delete("/resources", checkAuth, checkRoleAuth(["manager", "user"]), validationURL, deleteResource);

module.exports = router;
