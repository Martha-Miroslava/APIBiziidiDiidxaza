const  {check, param}  =  require ("express-validator");
const {validateResult} = require("../helpers/response-result");

const validationStateId  = [
    param("stateID")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
]

const validationCity  = [
    check("nameCity")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .isString().withMessage("El campo debe ser una cadena")
        .isLength({ min: 2, max: 200}).withMessage("El nombre de la ciudad debe tener un mínimo de 2 caracteres y un máximo de 200 caracteres")
        .matches(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü ]+$/).withMessage("Solo se permiten letras y espacios"),
    check("idState")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
]

module.exports = {validationStateId, validationCity};