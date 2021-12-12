const router = require("express").Router();
const checkAuth = require("../middleware/Auth");
const checkRoleAuth = require("../middleware/RoleAuth");
const {postLessonRecord, getLessonRecords} = require("../controllers/LessonRecordController");
const {validationLessonRecord} = require("../validators/LessonRecordValidator");
const {validationAccountId} = require("../validators/AccountValidator");
const {validateExistsAccount} = require("../controllers/AccountController");
const {validateExistsLesson} = require("../controllers/LessonController");

router.post("/lessonRecords", checkAuth, checkRoleAuth(["manager","user"]), validationLessonRecord, validateExistsLesson, validateExistsAccount, postLessonRecord);

router.get("/lessonRecords/:accountID", checkAuth, checkRoleAuth(["manager","user"]), validationAccountId, getLessonRecords);


module.exports = router;