const {Router} = require('express');
const router = Router();
const {getCities, postCity} = require('../controllers/city-controller');
const {validateExistState} = require('../controllers/state-controller');
const {validationStateId, validationCity}= require('../validators/city-validator');

router.get('/cities/:stateID', validationStateId, getCities);

router.post('/cities', validationCity, validateExistState, postCity);

module.exports = router;