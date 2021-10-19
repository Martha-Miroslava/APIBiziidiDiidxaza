const {Router} = require('express');
const router = Router();
const {postLogin, patchLogin} = require('../controllers/login-controller');
const {validationLogin, validationConfirmationAccount} = require('../validators/account-validator');

router.post('/login', validationLogin, postLogin);

router.patch('/login', validationConfirmationAccount, patchLogin);

module.exports = router;