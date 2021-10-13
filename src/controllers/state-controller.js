const States = require('../models/states');
const {StatusCodes, ReasonPhrases} = require ('http-status-codes');

const validateExistState = (request, response, next) => {
    const {idState} = request.body;
    States.findById(idState, {_id:1})
    .then(function (state) {  
        if(state){
            return next();
        }
        return response.status(StatusCodes.BAD_REQUEST).json({message: "El estado no existe"}); 
    })
    .catch(function (error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}

const getStates = async (request, response) => {        
    States.find()
    .then(function (states) {  
        if(states.length){
            response.status(StatusCodes.OK).json(states);
        }
        else{
            response.status(StatusCodes.NOT_FOUND).json({message:ReasonPhrases.NOT_FOUND});
        }
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message:ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}

module.exports = {getStates, validateExistState};