const {Router} = require('express');
const router = Router();
const {getStates} = require('../controllers/state-controller');

router.get('/states', getStates);

module.exports = router;