const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/roleAuth");
const {postLessonRecord, getLessonRecords} = require("../controllers/lessonRecordController");
const {validationLessonRecord} = require("../validators/lessonRecordValidator");
const {validationAccountId} = require("../validators/accountValidator");
const {validateExistsAccount} = require("../controllers/accountController");
const {validateExistsLesson} = require("../controllers/lessonController");

router.post("/lessonRecords", checkAuth, checkRoleAuth(["manager","user"]), validationLessonRecord, validateExistsLesson, validateExistsAccount, postLessonRecord);

router.get("/lessonRecords/:accountID", checkAuth, checkRoleAuth(["manager","user"]), validationAccountId, getLessonRecords);


module.exports = router;
