const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {getComments, postComment, deleteComment} = require("../controllers/comment-controller");
const {validationCreationComment, validationDeleteComment} = require("../validators/comment-validator");
const {validateExistsAccount} = require("../controllers/account-controller");
const {validateExistsDiscussion} = require("../controllers/discussion-controller");
const {validationDiscussionId} = require("../validators/discussion-validator");
const {cacheInit} = require("../middleware/cache");

router.get("/comments/:discussionID", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionId, cacheInit, getComments);

router.post("/comments", checkAuth, checkRoleAuth(["user"]), validationCreationComment, validateExistsAccount, validateExistsDiscussion, postComment);

router.delete("/comments", checkAuth, checkRoleAuth(["user"]), validationDeleteComment, deleteComment);

module.exports = router;