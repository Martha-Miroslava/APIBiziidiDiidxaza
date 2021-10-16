const {Router} = require('express');
const router = Router();
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/role-auth');
const {getDiscussions, getDiscussionsFilters, getDiscussionsCriterion, getDiscussion, postDiscussion, 
    patchDiscussion, validateExistsDiscussion} = require('../controllers/discussion-controller');
const {validationDiscussionFilters, validationDiscussionCriterion, validationCriterion, validationDiscussionId,
    validationDiscussion, validationUpdateDiscussion} = require('../validators/discussion-validator');
const {validateExistsAccount} = require('../controllers/account-controller');

router.get('/discussions/filters/:filter', checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionFilters, getDiscussionsFilters);

router.get('/discussions/:filter/:criterion', checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionCriterion, validationCriterion, getDiscussionsCriterion);

router.get('/discussions', checkAuth, checkRoleAuth(["manager", "user"]), getDiscussions);

router.get('/discussions/:discussionID', checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionId, getDiscussion);

router.post('/discussions', checkAuth, checkRoleAuth(["user"]), validationDiscussion, validateExistsAccount, postDiscussion);

router.patch('/discussions', checkAuth, checkRoleAuth(["user"]), validationUpdateDiscussion, validateExistsAccount, validateExistsDiscussion, patchDiscussion);

module.exports = router;