const States = require('../models/states');
const {StatusCodes} = require ('http-status-codes');
const {responseServer, responseNotFound, responseGeneral} = require('../helpers/response-result');

const validateExistState = (request, response, next) => {
    const {idState} = request.body;
    States.findById(idState, {_id:1})
    .then(function (state) {  
        if(state){
            return next();
        }
        return responseGeneral(response, StatusCodes.BAD_REQUEST, "El estado no existe");
    })
    .catch(function (error){
        return responseServer(response, error);
    });
}

const getStates = async (request, response) => {        
    States.find()
    .then(function (states) {  
        if(states.length){
            response.status(StatusCodes.OK).json(states);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
}

module.exports = {getStates, validateExistState};