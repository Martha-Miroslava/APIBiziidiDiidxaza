const  {check, param}  =  require ("express-validator");
const {StatusCodes} = require ("http-status-codes");
const {validationAccountId} = require("./discussionValidator");
const {validateResult} = require("../helpers/responseResult");

const validationReport = [
    check("reason")
        .trim().notEmpty().withMessage("El motivo no debe estar vacío")
        .isString().withMessage("El motivo debe ser una cadena")
        .isLength({ min: 5, max: 200}).withMessage("El motivo debe tener un mínimo de 5 caracteres y un máximo de 200 caracteres")
        .matches(/^[\wÑñÁáÉéÍíÓóÚúÜü!?¡¿.,# ]+$/).withMessage("Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios"),
    check("context")
        .trim().notEmpty().withMessage("El contexto no debe estar vacío")
        .isString().withMessage("El contexto debe ser una cadena")
        .isLength({ min: 5, max: 500}).withMessage("El contexto debe tener un mínimo de 5 caracteres y un máximo de 500 caracteres")
        .matches(/^[\wÑñÁáÉéÍíÓóÚúÜü!?¡¿.,# ]+$/).withMessage("Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios"),
    validationAccountId,
    check("accountReported")
        .exists().withMessage("El ID de la cuenta reportada debe existir")
        .notEmpty().withMessage("El ID de la cuenta reportada no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID de la cuenta reportada debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe Tener que tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationReportFilters  = [
    param("filter")
        .exists().withMessage("El filtro debe existir")
        .notEmpty().withMessage("El filtro no debe estar vacío")
        .isIn(["dateCreation", "usernameAccount", "usernameReported"]).withMessage("El filtro es inválido"),
    param("criterion")
        .exists().withMessage("El criterio debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];


const validationCriterion = (request, response, next) => {
    const filter = request.params.filter;
    const criterion = request.params.criterion;
    var expReg =  new RegExp(/^[A-Za-z0-9]{3,20}$/);
    let message = "Solo letras de la A a la Z y números. Caracteres de 3 a 20";
    if(filter === "dateCreation"){
        expReg = new RegExp(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/);
        message = "La fecha debe tener el formato YYYY-MM-DD";
    }
    if( !expReg.test(criterion)) {
        return response.status(StatusCodes.BAD_REQUEST).json({message: message});
    }
    return next();
};

const validationReportId  = [
    param("reportID")
        .exists().withMessage("El ID del reporte debe existir")
        .notEmpty().withMessage("El ID del reporte no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

module.exports = {validationReport, validationReportFilters, validationCriterion, validationReportId};
