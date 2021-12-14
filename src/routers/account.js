const router = require("express").Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/roleAuth");
const {getAccounts,getAccountsFilters, postAccount, getAccount, putAccount, patchAccount, 
    validateExistsUsernameEmail, validateExistsAccountUpdate} = require("../controllers/accountController");
const {validateExistsCity} = require("../controllers/cityController");
const {validationCreationAccount, validationUpdateAccount, validationChangeStatusAccount, validationAccountId, 
    validationAccountFilters, validationCriterion} = require("../validators/accountValidator");


router.get("/accounts/:filter/:criterion", checkAuth, checkRoleAuth(["manager"]), validationAccountFilters, validationCriterion, getAccountsFilters);

router.get("/accounts", checkAuth, checkRoleAuth(["manager"]), getAccounts);

router.get("/accounts/:accountID", checkAuth, checkRoleAuth(["manager", "user"]), validationAccountId, getAccount);

router.post("/accounts", validationCreationAccount, validateExistsUsernameEmail, validateExistsCity, postAccount);

router.put("/accounts", checkAuth, checkRoleAuth(["manager","user"]), validationUpdateAccount, validateExistsCity, validateExistsAccountUpdate, putAccount);

router.patch("/accounts", checkAuth, checkRoleAuth(["manager"]), validationChangeStatusAccount, patchAccount);


module.exports = router;
