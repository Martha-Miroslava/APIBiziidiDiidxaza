const  {check, param}  =  require ("express-validator");
const {validateResult} = require("../helpers/responseResult");

const validationStateId  = [
    param("stateID")
        .exists().withMessage("El Identificador del estado debe existir")
        .notEmpty().withMessage("El Identificador del estado no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El Identificador del estado debe tener números y letras minúsculas")
        .isLength(24).withMessage("El Identificador del estado debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationCity  = [
    check("nameCity")
        .notEmpty().withMessage("El nombre de la ciudad no debe estar vacío")
        .isString().withMessage("El nombre de la ciudad debe ser una cadena")
        .isLength({ min: 2, max: 200}).withMessage("El nombre de la ciudad debe tener un mínimo de 2 caracteres y un máximo de 200 caracteres")
        .matches(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü ]+$/).withMessage("El nombre de la ciudad solo permite letras y espacios"),
    check("idState")
        .exists().withMessage("El ID del estado debe existir")
        .notEmpty().withMessage("El ID del estado no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID del estado debe tener números y letras minúsculas")
        .isLength(24).withMessage("El ID del estado debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

module.exports = {validationStateId, validationCity};