const  {check}  =  require ( 'express-validator' );
const {validationAccountId, validationComment} = require('../validators/discussion-validator');
const {validationId} = require('../validators/account-validator');
const {validateResult} = require('../helpers/response-result');

const validationCreationComment = [
    validationComment,
    validationAccountId,
    check("idDiscussion")
        .exists().withMessage("El campo debe existir")
        .notEmpty().withMessage("El campo no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El ID debe tener números y letras minúsculas")
        .isLength(24).withMessage("Debe tener 24 caracteres"),
    (request, response, next) => {
        validateResult(request, response, next);
    }
]

const validationDeleteComment = [
    validationId,
    (request, response, next) => {
        validateResult(request, response, next);
    }
]


module.exports = {validationCreationComment, validationDeleteComment};