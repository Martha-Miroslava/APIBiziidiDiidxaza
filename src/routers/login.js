const router = require("express").Router();
const {postLogin, patchLogin} = require("../controllers/LoginController");
const {validationLogin, validationConfirmationAccount} = require("../validators/AccountValidator");

router.post("/login", validationLogin, postLogin);

router.patch("/login", validationConfirmationAccount, patchLogin);

module.exports = router;