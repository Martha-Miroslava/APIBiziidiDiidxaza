const router = require("express").Router();
const {postLogin, patchLogin} = require("../controllers/loginController");
const {validationLogin, validationConfirmationAccount} = require("../validators/accountValidator");

router.post("/login", validationLogin, postLogin);

router.patch("/login", validationConfirmationAccount, patchLogin);

module.exports = router;
