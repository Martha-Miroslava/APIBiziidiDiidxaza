const Questions = require('../models/questions');
const {StatusCodes} = require ('http-status-codes');
const {responseServer, responseNotFound, responseGeneral} = require('../helpers/response-result');

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

const getQuestions = async (request, response) => {
    const lessonID = request.params.lessonID;
    Questions.find({idLesson:lessonID})
    .then((questions) => {  
        if(questions.length){
            response.status(StatusCodes.OK).json(questions);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch((error) => {
        responseServer(response, error);
    });
}

module.exports = {validateExistsQuestion, getQuestions}