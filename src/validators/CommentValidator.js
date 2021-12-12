const  {check}  =  require ("express-validator");
const {validationAccountId, validationComment} = require("./DiscussionValidator");
const {validationId} = require("./AccountValidator");
const {validateResult} = require("../helpers/ResponseResult");

const validationIdDiscussion = [
    check("idDiscussion")
        .exists().withMessage("El Identificador de la discusión debe existir")
        .notEmpty().withMessage("El Identificador de la discusión no debe estar vacío")
        .matches(/^[a-z0-9]{24}$/).withMessage("El Identificador de la discusión debe tener números y letras minúsculas")
        .isLength(24).withMessage("El Identificador de la discusión debe tener 24 caracteres")
]

const validationCreationComment = [
    validationComment,
    validationAccountId,
    validationIdDiscussion,
    (request, response, next) => {
        validateResult(request, response, next);
    }
];


const validationDeleteComment = [
    validationId,
    validationIdDiscussion,
    (request, response, next) => {
        validateResult(request, response, next);
    }
];


module.exports = {validationCreationComment, validationDeleteComment};