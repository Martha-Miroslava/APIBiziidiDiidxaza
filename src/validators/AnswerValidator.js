const  {param}  =  require ("express-validator");
const {validateResult} = require("../helpers/ResponseResult");


const validationQuestionID = [
    param("questionID")
        .exists().withMessage("El Identificador de la pregunta debe existir")
        .notEmpty().withMessage("El Identificador de la pregunta no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El Identificador de la pregunta debe tener números y letras minúsculas")
        .isLength(24).withMessage("El Identificador de la pregunta debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

module.exports = {validationQuestionID};