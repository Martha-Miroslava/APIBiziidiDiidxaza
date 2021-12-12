const router = require("express").Router();
const checkAuth = require("../middleware/Auth");
const checkRoleAuth = require("../middleware/RoleAuth");
const {getComments, postComment, deleteComment, validateExistsCommentt} = require("../controllers/CommentController");
const {validationCreationComment, validationDeleteComment} = require("../validators/CommentValidator");
const {validateExistsAccount} = require("../controllers/AccountController");
const {validateExistsDiscussion} = require("../controllers/DiscussionController");
const {validationDiscussionId} = require("../validators/DiscussionValidator");

router.get("/comments/:discussionID", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionId, getComments);

router.post("/comments", checkAuth, checkRoleAuth(["manager","user"]), validationCreationComment, validateExistsAccount, validateExistsDiscussion, postComment);

router.delete("/comments", checkAuth, checkRoleAuth(["manager","user"]), validationDeleteComment, validateExistsCommentt, deleteComment);

module.exports = router;