const router = require("express").Router();
const {getStates} = require("../controllers/stateController");
const {cacheInit} = require("../middleware/cache");

router.get("/states", cacheInit, getStates);

module.exports = router;
