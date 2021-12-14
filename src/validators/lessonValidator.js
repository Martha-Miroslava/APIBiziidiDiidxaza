const  {check, param}  =  require ("express-validator");
const {validateResult} = require("../helpers/responseResult");
const Number = require("../helpers/enumNumber");

const validationLesson= [
    check("name")
        .notEmpty().withMessage("El nombre de la lección no debe estar vacío")
        .isString().withMessage("El nombre de la lección debe ser una cadena")
        .isLength({ min: 4, max: 200}).withMessage("El nombre de la lección debe tener un mínimo de 4 caracteres y un máximo de 200 caracteres")
        .matches(/^[\wÑñÁáÉéÍíÓóÚúÜü!?¡¿.,# ]+$/).withMessage("El nombre de la lección solo permite letras de la A a la Z, números del 0 al 9, caracteres., # y espacios"), 
    check("description")
        .notEmpty().withMessage("La descripción no debe estar vacío")
        .isString().withMessage("La descripción debe ser una cadena")
        .isLength({ min: 5, max: 600}).withMessage("La descripción debe tener un mínimo de 5 caracteres y un máximo de 600 caracteres")
        .matches(/^[\wÑñÁáÉéÍíÓóÚúÜü!?¡¿.,# ]+$/).withMessage("La descripción solo permite letras de la A a la Z, números del 0 al 9, caracteres., # y espacios"), 
    check("pointsTotal")
        .exists().withMessage("Los puntos que vale la lección debe existir")
        .notEmpty().withMessage("Los puntos que vale la lección no debe estar vacío")
        .not().isString().withMessage("Los puntos que vale la lección debe ser un número")
        .custom((value) => {
            if (value < Number.FIVE) {
                return false;
            }
            return true;
        }).withMessage("Los puntos deben ser mayor a 4"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

const validationLessonID = [
    param("lessonID")
        .exists().withMessage("El Identificador de la lección debe existir")
        .notEmpty().withMessage("El Identificador de la lección no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El Identificador debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

module.exports = {validationLesson, validationLessonID};
