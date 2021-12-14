const  {check}  =  require ("express-validator");
const {validationAccountId} = require("./discussionValidator");
const {validateResult} = require("../helpers/responseResult");

const validationAccount  = [
    validationAccountId,
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationLesson  = [
    check("idLesson")
        .exists().withMessage("El Id de la lección debe existir")
        .notEmpty().withMessage("El Id de la lección no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El Id debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationQuestion  = [
    check("idQuestion")
        .exists().withMessage("El Id de la pregunta debe existir")
        .notEmpty().withMessage("El Id de la pregunta no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El Id de la pregunta debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

module.exports = {validationAccount, validationLesson, validationQuestion};
