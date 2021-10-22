const {Router} = require('express');
const router = Router();
const checkAuth = require('../middleware/auth');
const checkRoleAuth = require('../middleware/role-auth');
const {postLesson, getLessons} = require('../controllers/lesson-controller');
const {validationLesson} = require('../validators/lesson-validator');

router.post('/lessons', checkAuth, checkRoleAuth(["manager"]), validationLesson, postLesson);

router.get('/lessons', checkAuth, checkRoleAuth(["user"]), getLessons);


module.exports = router;