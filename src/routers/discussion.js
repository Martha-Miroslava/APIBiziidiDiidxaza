const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {getDiscussions, getDiscussionsFilters, getDiscussionsCriterion, getDiscussion, postDiscussion, 
    patchDiscussion, validateTitleDiscussion} = require("../controllers/discussion-controller");
const {validationDiscussionFilters, validationDiscussionCriterion, validationCriterion, validationDiscussionId,
    validationDiscussion, validationUpdateDiscussion} = require("../validators/discussion-validator");
const {validateExistsAccount} = require("../controllers/account-controller");
const {cacheInit} = require("../middleware/cache");

router.get("/discussions/filters/:filter", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionFilters, cacheInit, getDiscussionsFilters);

router.get("/discussions/:filter/:criterion", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionCriterion, validationCriterion, cacheInit, getDiscussionsCriterion);

router.get("/discussions", checkAuth, checkRoleAuth(["manager", "user"]), cacheInit, getDiscussions);

router.get("/discussions/:discussionID", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionId, cacheInit, getDiscussion);

router.post("/discussions", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussion, validateExistsAccount, validateTitleDiscussion, postDiscussion);

router.patch("/discussions", checkAuth, checkRoleAuth(["manager", "user"]), validationUpdateDiscussion, validateExistsAccount, patchDiscussion);


module.exports = router;