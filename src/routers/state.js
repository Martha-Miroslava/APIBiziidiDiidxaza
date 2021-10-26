const router = require("express").Router();
const {getStates} = require("../controllers/state-controller");

router.get("/states", getStates);

module.exports = router;