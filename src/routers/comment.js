const {Router} = require('express');
const router = Router();
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/role-auth');
const {getComments, postComment, patchComment} = require('../controllers/comment-controller');
const {validationCreationComment, validationUpdateComment} = require('../validators/comment-validator');
const {validateExistsAccount} = require('../controllers/account-controller');
const {validateExistsDiscussion} = require('../controllers/discussion-controller');
const {validationDiscussionId} = require('../validators/discussion-validator');

router.get('/comments/:discussionID', checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionId, getComments);

router.post('/comments', checkAuth, checkRoleAuth(["user"]), validationCreationComment, validateExistsAccount, validateExistsDiscussion, postComment);

router.patch('/comments', checkAuth, checkRoleAuth(["user"]), validationUpdateComment, validateExistsDiscussion, patchComment);

module.exports = router;