const {StatusCodes} = require ('http-status-codes');
const { validationResult } = require('express-validator');

const validateResult = (request, response, next) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(StatusCodes.BAD_REQUEST).json({errors: errors.array()});
    }
    return next();
}

module.exports = { validateResult }