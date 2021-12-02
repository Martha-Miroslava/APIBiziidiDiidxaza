const Questions = require("../models/questions");
const {StatusCodes} = require ("http-status-codes");
const {responseServer, responseNotFound, responseGeneral} = require("../helpers/response-result");
const {logError} = require("../helpers/log-error");

const validateExistsQuestion = (request, response, next) => {
    const idQuestion = request.body.idQuestion || request.params.questionID;
    Questions.findById(idQuestion, {_id:1})
    .then(function (question) {  
        if(question){
            return next();
        }
        return responseGeneral(response, StatusCodes.BAD_REQUEST, "La pregunta no existe");
    })
    .catch(function (error){
        logError(error);
        return responseServer(response, error);
    });
};

const getQuestions = async (request, response) => {
    const lessonID = request.params.lessonID;
    Questions.count().exec(function (errorCount, count) {
        if(errorCount){
            responseServer(response, errorCount);
        } else{
            var rand = Math.floor(Math.random()*(count-5));
            Questions.find().limit(5).where({idLesson:lessonID}).skip(rand)
            .then((questions) => {
                if(questions.length){
                    response.status(StatusCodes.OK).json(questions);
                }
                else{
                    responseNotFound(response);
                }
            })
            .catch((error) => {
                logError(error);
                responseServer(response, error);
            });
        }
    })
};

module.exports = {validateExistsQuestion, getQuestions};