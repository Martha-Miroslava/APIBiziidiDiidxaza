const  {check, param}  =  require ("express-validator");
const {StatusCodes} = require ("http-status-codes");
const {validateResult} = require("../helpers/response-result");


const validationAccount = [
    check("lastname")
        .trim().notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .isLength({ min: 2, max: 150}).withMessage("El apellido(s) deben tener un mínimo de 2 caracteres y un máximo de 150 caracteres")
        .matches(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü ]+$/).withMessage("Solo se permiten letras y espacios"),
    check("name")
        .trim().notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .isLength({ min: 2, max: 150}).withMessage("El nombre(s) deben tener un mínimo de 2 caracteres y un máximo de 150 caracteres")
        .matches(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü ]+$/).withMessage("Solo se permiten letras y espacios"),
    check("age")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .not().isString().withMessage("El campo debe ser un número")
        .custom((value) => {
            if (value < 10 || value > 100) {
                return false;
            }
            return true;
        }).withMessage("Debe tener más de 10 años y menos de 100 años."),
    check("dateBirth")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/).withMessage("La fecha debe tener el formato YYYY-MM-DD")
        .custom((value) => {
            try{
                const dateBirth = new Date(value).getFullYear();
                const dateNow = new Date().getFullYear();
                const year = dateNow- dateBirth;
                if(year < 10 || year > 100 ){
                    return false;
                }
                return true;
            }catch(error){
                return false;
            }     
        }).withMessage("El rango de la fecha actual y la fecha de nacimiento debe estar entre 10 y 100 años.")
];

const validationUsername = [
    check("username")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .isLength({ min: 3, max: 20}).withMessage("El nombre de usuario debe tener un mínimo de 3 caracteres y un máximo de 20 caracteres")
        .matches(/^[A-Za-z0-9]{3,20}$/).withMessage("El nombre de usuario debe tener solo letras y números")
];

const validationEmail = [
    check("email")
        .normalizeEmail()
        .isEmail().withMessage("Debe ser un correo electrónico")
];

const validationPassword = [
    check("password")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .isLength({min: 8, max:254}).trim().withMessage("Password must have a minimum of 8 characters and a maximum of 254 characters")
];


const validationLogin = [
    validationUsername,
    validationPassword,
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationConfirmationAccount = [
    validationUsername,
    check("codeConfirmation")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .not().isString().withMessage("El campo debe ser un número")
        .matches(/^[0-9]{6}$/).withMessage("Permitir solo números del 0 al 9 y deben ser 6 dígitos"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationSendEmail = [
    validationEmail,
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationAccountEmail = [
    validationEmail,
    check("title")
        .trim().notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .isLength({ min: 5, max: 100}).withMessage("El titulo del mensaje debe tener un mínimo de 5 caracteres y un máximo de 100 caracteres")
        .matches(/^[\wÑñÁáÉéÍíÓóÚúÜü.,# ]+$/).withMessage("Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios"), 
    check("message")
        .trim().notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .isLength({ min: 5, max: 600}).withMessage("El mensaje debe tener un mínimo de 5 caracteres y un máximo de 600 caracteres")
        .matches(/^[\wÑñÁáÉéÍíÓóÚúÜü.,# ]+$/).withMessage("Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios"), 
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationStatusAccount  = [
    check("status")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .isNumeric().withMessage("El campo no debe ser un número")
        .matches(/^[1-3]$/).withMessage("Permitir solo números del 1 al 3")
];


const validationCreationAccount = [
    validationAccount,
    validationUsername,
    validationEmail,
    validationPassword,
    check("role")
        .exists().withMessage("El campo debe existir")
        .isString().withMessage("El campo debe ser una cadena")
        .isIn(["user", "manager"]).withMessage("El rol no es válido"),
    check("idCity")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];


const validationId  = [
    check("_id")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres")
];

const validationURL  = [
    check("URL")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .matches(/^[.][.][/]([a-zA-Z0-9]+[/])+([a-zA-Z0-9]+)[.](?:jpg|mp3|png|mp4|jpeg)$/).withMessage("No es una URL válida"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationUpdateAccount  = [
    validationId,
    validationAccount,
    validationUsername,
    validationEmail,
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationChangeStatusAccount = [
    validationId,
    validationStatusAccount,
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationAccountId  = [
    param("accountID")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationAccountFilters  = [
    param("filter")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .isIn(["lastname", "name", "age", "dateBirth", "email", "username", "dateCreation"]).withMessage("El filtro es inválido"),
    param("criterion")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationCriterion = (request, response, next) => {
    const filter = request.params.filter;
    const criterion = request.params.criterion;
    var expReg =  new RegExp(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü ]+$/);
    let message = "Solo se permiten letras y espacios";
    switch(filter){
        case "age":
            expReg = new RegExp(/^[0-9]{1,2}$/);
            message = "El campo debe ser un número";
            break;
        case "dateBirth":
        case "dateCreation":
            expReg = new RegExp(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/);
            message = "La fecha debe tener el formato YYYY-MM-DD";
            break;
        case "email":
            expReg = new RegExp(/\b[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,6}\b/);
            message = "El correo electrónico debería parecerse al ejemplo martha_15_723@outlook.com";
            break;
        case "username":
            expReg = new RegExp(/^[A-Za-z0-9]{3,20}$/);
            message = "El nombre de usuario debe tener solo letras y números. De 3 a 20 caracteres'";
            break;
    }
    if( !expReg.test(criterion)) {
        return response.status(StatusCodes.BAD_REQUEST).json({message: message});
    }
    return next();
};


module.exports = {
    validationCreationAccount, validationUpdateAccount, validationChangeStatusAccount, validationAccountId, 
    validationAccountFilters, validationCriterion, validationId, validationAccountEmail, validationSendEmail,
    validationLogin, validationConfirmationAccount, validationURL
};