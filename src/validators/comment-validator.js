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

const validationDeleteComment = [
    validationId,
    (request, response, next) => {
        validateResult(request, response, next);
    }
]


module.exports = {validationCreationComment, validationDeleteComment};