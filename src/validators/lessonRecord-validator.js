const  {check}  =  require ("express-validator");
const {validateResult} = require("../helpers/response-result");
const {validationAccountId} = require("../validators/discussion-validator");

const validationLessonRecord = [
    check("pointsObtained")
        .exists().withMessage("Los puntos obtenidos debe existir")
        .notEmpty().withMessage("Los puntos obtenidos no debe estar vacío")
        .not().isString().withMessage("Los puntos obtenidos debe ser un número"),
    validationAccountId,
    check("idLesson")
        .exists().withMessage("El Id de la lección debe existir")
        .notEmpty().withMessage("El Id de la lección no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El Id de la lección debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
];

module.exports = {validationLessonRecord};