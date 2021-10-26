const {StatusCodes} = require ("http-status-codes");
const {validationResult} = require("express-validator");

const validateResult = (request, response, next) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(StatusCodes.BAD_REQUEST).json({errors: errors.array()});
    }
    return next();
};

const responseNotFound = (response) => {
    return response.status(StatusCodes.NOT_FOUND).json({message: "No se encontro registro(s)"});
};

const responseServer = (response, error) => {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({path: error.path, message: "Error Interno del Servidor"});
};

const responseGeneral = (response, status, message) => {
    return response.status(status).json({message: message});
};

module.exports = {validateResult, responseNotFound, responseServer, responseGeneral};