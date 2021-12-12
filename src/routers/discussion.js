const router = require("express").Router();
const checkAuth = require("../middleware/Auth");
const checkRoleAuth = require("../middleware/RoleAuth");
const {getDiscussions, getDiscussionsFilters, getDiscussionsCriterion, getDiscussion, postDiscussion, 
    patchDiscussion, validateTitleDiscussion} = require("../controllers/DiscussionController");
const {validationDiscussionFilters, validationDiscussionCriterion, validationCriterion, validationDiscussionId,
    validationDiscussion, validationUpdateDiscussion} = require("../validators/DiscussionValidator");
const {validateExistsAccount} = require("../controllers/AccountController");
const {cacheInit} = require("../middleware/Cache");

router.get("/discussions/filters/:filter", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionFilters, cacheInit, getDiscussionsFilters);

router.get("/discussions/:filter/:criterion", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionCriterion, validationCriterion, cacheInit, getDiscussionsCriterion);

router.get("/discussions", checkAuth, checkRoleAuth(["manager", "user"]), cacheInit, getDiscussions);

router.get("/discussions/:discussionID", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussionId, cacheInit, getDiscussion);

router.post("/discussions", checkAuth, checkRoleAuth(["manager", "user"]), validationDiscussion, validateExistsAccount, validateTitleDiscussion, postDiscussion);

router.patch("/discussions", checkAuth, checkRoleAuth(["manager", "user"]), validationUpdateDiscussion, validateExistsAccount, patchDiscussion);


module.exports = router;