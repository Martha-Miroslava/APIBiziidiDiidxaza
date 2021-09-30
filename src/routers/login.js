const {Router} = require('express');
const router = Router();
const {postLogin} = require('../controllers/login-controller')

router.post('/login', postLogin);

module.exports = router;