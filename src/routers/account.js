const {Router} = require('express');
const router = Router();
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const {getAccounts, postAccount} = require('../controllers/account-controller')
//const {validationAccount} = require('./validators/validators');


router.get('/accounts', checkAuth, checkRoleAuth(["manager"]), getAccounts);
router.post('/accounts', postAccount);


module.exports = router;