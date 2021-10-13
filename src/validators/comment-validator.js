const  {check}  =  require ( 'express-validator' );
const {validationAccountId, validationComment, validationDiscussionIdBody} = require('../validators/discussion-validator');
const {validationId} = require('../validators/account-validator');
const {validateResult} = require('../helpers/response-result');

const validationCreationComment = [
    validationComment,
    validationAccountId,
    validationDiscussionIdBody,
    (request, response, next) => {
        validateResult(request, response, next);
    }
]

const validationUpdateComment = [
    validationId,
    check('status')
        .exists().withMessage('El campo debe existir')
        .notEmpty().withMessage('El campo no debe estar vacío')
        .isNumeric().withMessage('El campo no debe ser un número')
        .matches(/^[1-2]$/).withMessage('Permitir solo números del 1 al 2'),
    (request, response, next) => {
        validateResult(request, response, next);
    }
]


module.exports = {validationCreationComment,validationUpdateComment};