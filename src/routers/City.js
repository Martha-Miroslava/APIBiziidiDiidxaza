const router = require("express").Router();
const {getCities, postCity} = require("../controllers/cityController");
const {validateExistState} = require("../controllers/stateController");
const {validationStateId, validationCity}= require("../validators/cityValidator");
const {cacheInit} = require("../middleware/cache");

router.get("/cities/:stateID", validationStateId, cacheInit, getCities);

router.post("/cities", validationCity, validateExistState, postCity);

module.exports = router;
