const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/roleAuth");
const {getComments, postComment, deleteComment, validateExistsCommentt} = require("../controllers/commentController");
const {validationCreationComment, validationDeleteComment} = require("../validators/commentValidator");
const {validateExistsAccount} = require("../controllers/accountController");
const {validateExistsDiscussion} = require("../controllers/discussionController");
const {validationDiscussionId} = require("../validators/discussionValidator");

router.get("/comments/:discussionID", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionId, getComments);

router.post("/comments", checkAuth, checkRoleAuth(["manager","user"]), validationCreationComment, validateExistsAccount, validateExistsDiscussion, postComment);

router.delete("/comments", checkAuth, checkRoleAuth(["manager","user"]), validationDeleteComment, validateExistsCommentt, deleteComment);

module.exports = router;
