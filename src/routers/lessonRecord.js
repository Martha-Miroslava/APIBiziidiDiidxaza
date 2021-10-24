const {Router} = require("express");
const router = Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {postLessonRecord, getLessonRecords} = require("../controllers/lessonRecord-controller");
const {validationLessonRecord} = require("../validators/lessonRecord-validator");
const {validationAccountId} = require("../validators/account-validator");
const {validateExistsAccount} = require("../controllers/account-controller");
const {validateExistsLesson} = require("../controllers/lesson-controller");

router.post("/lessonRecords", checkAuth, checkRoleAuth(["user"]), validationLessonRecord, validateExistsLesson, validateExistsAccount, postLessonRecord);

router.get("/lessonRecords/:accountID", checkAuth, checkRoleAuth(["user"]), validationAccountId, getLessonRecords);


module.exports = router;