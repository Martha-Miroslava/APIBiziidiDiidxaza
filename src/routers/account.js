const router = require("express").Router();
const checkAuth = require("../middleware/Auth");
const checkRoleAuth = require("../middleware/RoleAuth");
const {getAccounts,getAccountsFilters, postAccount, getAccount, putAccount, patchAccount, 
    validateExistsUsernameEmail, validateExistsAccountUpdate} = require("../controllers/AccountController");
const {validateExistsCity} = require("../controllers/CityController");
const {validationCreationAccount, validationUpdateAccount, validationChangeStatusAccount, validationAccountId, 
    validationAccountFilters, validationCriterion} = require("../validators/AccountValidator");


router.get("/accounts/:filter/:criterion", checkAuth, checkRoleAuth(["manager"]), validationAccountFilters, validationCriterion, getAccountsFilters);

router.get("/accounts", checkAuth, checkRoleAuth(["manager"]), getAccounts);

router.get("/accounts/:accountID", checkAuth, checkRoleAuth(["manager", "user"]), validationAccountId, getAccount);

router.post("/accounts", validationCreationAccount, validateExistsUsernameEmail, validateExistsCity, postAccount);

router.put("/accounts", checkAuth, checkRoleAuth(["manager","user"]), validationUpdateAccount, validateExistsCity, validateExistsAccountUpdate, putAccount);

router.patch("/accounts", checkAuth, checkRoleAuth(["manager"]), validationChangeStatusAccount, patchAccount);


module.exports = router;