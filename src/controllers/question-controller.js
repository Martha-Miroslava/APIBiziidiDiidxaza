const Questions = require('../models/questions');
const {StatusCodes} = require ('http-status-codes');
const {responseServer, responseGeneral} = require('../helpers/response-result');

const validateExistsQuestion = (request, response, next) => {
    const {idQuestion} = request.body;
    Questions.findById(idQuestion, {_id:1})
    .then(function (question) {  
        if(question){
            return next();
        }
        return responseGeneral(response, StatusCodes.BAD_REQUEST, "La pregunta no existe");
    })
    .catch(function (error){
        return responseServer(response, error);
    });
}

module.exports = {validateExistsQuestion}