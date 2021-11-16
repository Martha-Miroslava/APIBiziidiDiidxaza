const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {getComments, postComment, deleteComment, validateExistsCommentt} = require("../controllers/comment-controller");
const {validationCreationComment, validationDeleteComment} = require("../validators/comment-validator");
const {validateExistsAccount} = require("../controllers/account-controller");
const {validateExistsDiscussion} = require("../controllers/discussion-controller");
const {validationDiscussionId} = require("../validators/discussion-validator");

router.get("/comments/:discussionID", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionId, getComments);

router.post("/comments", checkAuth, checkRoleAuth(["manager","user"]), validationCreationComment, validateExistsAccount, validateExistsDiscussion, postComment);

router.delete("/comments", checkAuth, checkRoleAuth(["manager","user"]), validationDeleteComment, validateExistsCommentt, deleteComment);

module.exports = router;