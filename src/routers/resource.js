const {Router} = require('express');
const router = Router();
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/role-auth');
const {postImageAccount, postImageLesson, deleteResource, patchResource, postAudio} = require('../controllers/resource-controller');
const {validationURL} = require('../validators/account-validator');
const {validateExistsAccount} = require('../controllers/account-controller');
const {validateExistsLesson} = require('../controllers/lesson-controller');
const {validateExistsQuestion} = require('../controllers/question-controller');
const{validationAccount, validationLesson, validationQuestion} = require('../validators/resource-validator')

router.patch('/resources', checkAuth, checkRoleAuth(["manager", "user"]), validationURL, patchResource);

router.post('/resources/lesson', checkAuth, checkRoleAuth(["manager"]), validationLesson, validateExistsLesson, postImageLesson);

router.post('/resources/account', validationAccount, validateExistsAccount, postImageAccount);

router.post('/resources/audio', checkAuth, checkRoleAuth(["manager"]), validationQuestion, validateExistsQuestion, postAudio);

router.delete('/resources', checkAuth, checkRoleAuth(["manager", "user"]), validationURL, deleteResource);

module.exports = router;