const {Router} = require("express");
const router = Router();
const checkAuth = require("../middleware/auth");
const checkRoleAuth = require("../middleware/role-auth");
const {getAccounts,getAccountsFilters, postAccount, getAccount, putAccount, patchAccount, 
    validateExistsUsernameEmail, validateExistsAccountUpdate} = require("../controllers/account-controller");
const {validateExistsCity} = require("../controllers/city-controller");
const {validationCreationAccount, validationUpdateAccount, validationChangeStatusAccount, validationAccountId, 
    validationAccountFilters, validationCriterion} = require("../validators/account-validator");


router.get("/accounts/:filter/:criterion", checkAuth, checkRoleAuth(["manager"]), validationAccountFilters, validationCriterion, getAccountsFilters);

router.get("/accounts", checkAuth, checkRoleAuth(["manager"]), getAccounts);

router.get("/accounts/:accountID", checkAuth, checkRoleAuth(["manager", "user"]), validationAccountId, getAccount);

router.post("/accounts", validationCreationAccount, validateExistsUsernameEmail, validateExistsCity, postAccount);

router.put("/accounts", checkAuth, checkRoleAuth(["user"]), validationUpdateAccount, validateExistsCity, validateExistsAccountUpdate, putAccount);

router.patch("/accounts", checkAuth, checkRoleAuth(["manager"]), validationChangeStatusAccount, patchAccount);


module.exports = router;