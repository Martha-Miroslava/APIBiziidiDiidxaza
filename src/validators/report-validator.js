const  {check, param}  =  require ( 'express-validator' )
const {StatusCodes} = require ('http-status-codes');
const {validationAccountId} = require('../validators/discussion-validator');
const {validateResult} = require('../helpers/response-result');

const validationReport = [
    check('reason')
        .notEmpty().withMessage('El campo no debe estar vacío')
        .isString().withMessage('El campo debe ser una cadena')
        .isLength({ min: 5, max: 200}).withMessage('La razón debe tener un mínimo de 5 caracteres y un máximo de 200 caracteres')
        .matches(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü0-9.,#]+(\s*[a-zA-ZÑñÁáÉéÍíÓóÚúÜü0-9.,#]*){5,200}/).withMessage('Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios'),
    check('context')
        .notEmpty().withMessage('El campo no debe estar vacío')
        .isString().withMessage('El campo debe ser una cadena')
        .isLength({ min: 5, max: 500}).withMessage('El contexto debe tener un mínimo de 5 caracteres y un máximo de 500 caracteres')
        .matches(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü0-9.,#]+(\s*[a-zA-ZÑñÁáÉéÍíÓóÚúÜü0-9.,#]*){5,500}/).withMessage('Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios'),
    validationAccountId,
    check('accountReported')
        .exists().withMessage('El campo debe existir')
        .notEmpty().withMessage('El campo no debe estar vacío')
        .matches(/^[a-z0-9]{24}$/).withMessage('El ID de la cuenta reportada debe tener números y letras minúsculas')
        .isLength(24).withMessage('Debe Tener que tener 24 caracteres'),
    (request, response, next) => {
        validateResult(request, response, next);
    }
]

const validationReportFilters  = [
    param('filter')
        .exists().withMessage('El campo debe existir')
        .notEmpty().withMessage('El campo no debe estar vacío')
        .isIn(['dateCreation', 'nameAccount', 'lastnameAccount', 'nameReported', 'lastnameReported']).withMessage('El filtro es inválido'),
    param('criterion')
        .exists().withMessage('El campo debe existir')
        .notEmpty().withMessage('El campo no debe estar vacío'),
    (request, response, next) => {
        validateResult(request, response, next);
    }
]


const validationCriterion = (request, response, next) =>{
    const filter = request.params.filter;
    const criterion = request.params.criterion;
    var expReg =  new RegExp(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü ]{2,150}$/);
    let message = "Solo letras de la A a la Z. Caracteres de 2 a 150";
    if(filter =="dateCreation"){
        expReg = new RegExp(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/);
        message = "La fecha debe tener el formato YYYY-MM-DD";
    }
    if( !expReg.test(criterion)) {
        return response.status(StatusCodes.BAD_REQUEST).json({errors: message});
    }
    return next();
}

const validationReportId  = [
    param('reportID')
        .exists().withMessage('El campo debe existir')
        .notEmpty().withMessage('El campo no debe estar vacío')
        .matches(/^[a-z0-9]{24}$/).withMessage('El ID debe tener números y letras minúsculas')
        .isLength(24).withMessage('Debe Tener que tener 24 caracteres'),
    (request, response, next) => {
        validateResult(request, response, next);
    }
]

module.exports = {validationReport, validationReportFilters, validationCriterion, validationReportId};