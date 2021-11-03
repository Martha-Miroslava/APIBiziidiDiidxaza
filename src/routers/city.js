const router = require("express").Router();
const {getCities, postCity} = require("../controllers/city-controller");
const {validateExistState} = require("../controllers/state-controller");
const {validationStateId, validationCity}= require("../validators/city-validator");
const {cacheInit} = require("../middleware/cache");

router.get("/cities/:stateID", validationStateId, cacheInit, getCities);

router.post("/cities", validationCity, validateExistState, postCity);

module.exports = router;