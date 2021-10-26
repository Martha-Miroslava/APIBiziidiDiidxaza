const  {check, param}  =  require ("express-validator")
const {StatusCodes} = require ("http-status-codes");
const {validateResult} = require("../helpers/response-result");
const {validationId} = require("../validators/account-validator");


const validationDiscussionFilters  = [
    param("filter")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .isIn(["news", "populars"]).withMessage("El filtro es inválido"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationDiscussionCriterion  = [
    param("filter")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .isIn(["title", "tracing"]).withMessage("El filtro es inválido"),
    param("criterion")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationCriterion = (request, response, next) =>{
    const filter = request.params.filter;
    const criterion = request.params.criterion;
    var expReg =  new RegExp(/^[\wÑñÁáÉéÍíÓóÚúÜü.,#¿?¡!]+(\s*[\wÑñÁáÉéÍíÓóÚúÜü.,#¿?¡!]*){4,200}/);
    let message = "Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios. Se permite de 4 a 200 caracteres";
    if(filter === "tracing"){
        expReg = new RegExp(/^[a-z0-9]{24}$/);
        message = "El ID debe tener números y letras minúsculas";
    }
    if( !expReg.test(criterion)) {
        return response.status(StatusCodes.BAD_REQUEST).json({errors: message});
    }
    return next();
};

const validationDiscussionId  = [
    param("discussionID")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationAccountId = [
    check("idAccount")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres")
];

const validationComment = [
    check("comment")
        .trim().notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .isLength({ min: 5, max: 600}).withMessage("El comentario debe tener un mínimo de 5 caracteres y un máximo de 600 caracteres")
        .matches(/^[\wÑñÁáÉéÍíÓóÚúÜü!?¡¿.,# ]+$/).withMessage("Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios"), 
];

const validationDiscussion = [
    check("title")
        .trim().notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .isLength({ min: 4, max: 200}).withMessage("El titulo debe tener un mínimo de 4 caracteres y un máximo de 200 caracteres")
        .matches(/^[\wÑñÁáÉéÍíÓóÚúÜü!?¡¿.,# ]+$/).withMessage("Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios"),
    validationComment,
    check("theme")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .isIn(["info", "doubt", "rule"]).withMessage("El tema es inválido"),
    validationAccountId,
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationUpdateDiscussion = [
    validationAccountId,
    validationId,
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

module.exports = {validationDiscussionFilters, validationDiscussionCriterion, validationCriterion, 
    validationDiscussionId, validationDiscussion, validationUpdateDiscussion, validationAccountId, 
    validationComment
};