const  {check, param}  =  require ( 'express-validator' );
const {validateResult} = require('../helpers/response-result');

const validationLesson= [
    check('name')
        .notEmpty().withMessage('El campo no debe estar vacío')
        .isString().withMessage('El campo debe ser una cadena')
        .isLength({ min: 4, max: 200}).withMessage('El nombre debe tener un mínimo de 4 caracteres y un máximo de 200 caracteres')
        .matches(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü0-9.¿¡?!,#]+(\s*[a-zA-ZÑñÁáÉéÍíÓóÚúÜü0-9.¿¡?!,#]*){4,200}/).withMessage('Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios'), 
    check('description')
        .notEmpty().withMessage('El campo no debe estar vacío')
        .isString().withMessage('El campo debe ser una cadena')
        .isLength({ min: 5, max: 600}).withMessage('La descripción debe tener un mínimo de 5 caracteres y un máximo de 600 caracteres')
        .matches(/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü0-9.¿¡?!,#]+(\s*[a-zA-ZÑñÁáÉéÍíÓóÚúÜü0-9.¿¡?!,#]*){5,600}/).withMessage('Solo letras de la A a la Z, números del 0 al 9, caracteres., # y espacios'), 
    check('pointsTotal')
        .exists().withMessage('El campo debe existir')
        .notEmpty().withMessage('El campo no debe estar vacío')
        .not().isString().withMessage('El campo debe ser un número')
        .custom((value) => {
            if (value < 5) {
                return false;
            }
            return true;
        }).withMessage('El puntos deben ser mayor a 4'),
    (request, response, next) => {
        validateResult(request, response, next);
    }
]

const validationLessonID = [
    param('lessonID')
        .exists().withMessage('El campo debe existir')
        .notEmpty().withMessage('El campo no debe estar vacío')
        .matches(/^[a-z0-9]{24}$/).withMessage('El ID debe tener números y letras minúsculas')
        .isLength(24).withMessage('Debe tener 24 caracteres'),
    (request, response, next) => {
        validateResult(request, response, next);
    }
]

module.exports = {validationLesson, validationLessonID};