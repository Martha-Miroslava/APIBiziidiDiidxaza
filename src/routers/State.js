const router = require("express").Router();
const {getStates} = require("../controllers/StateController");
const {cacheInit} = require("../middleware/Cache");

router.get("/states", cacheInit, getStates);

module.exports = router;
