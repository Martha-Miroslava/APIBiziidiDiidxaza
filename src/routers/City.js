const router = require("express").Router();
const {getCities, postCity} = require("../controllers/CityController");
const {validateExistState} = require("../controllers/StateController");
const {validationStateId, validationCity}= require("../validators/CityValidator");
const {cacheInit} = require("../middleware/Cache");

router.get("/cities/:stateID", validationStateId, cacheInit, getCities);

router.post("/cities", validationCity, validateExistState, postCity);

module.exports = router;
