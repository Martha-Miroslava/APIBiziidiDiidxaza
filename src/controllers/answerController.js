const Answers = require("../models/answers");
const {StatusCodes} = require ("http-status-codes");
const {responseServer, responseNotFound} = require("../helpers/responseResult");
const {logError} = require("../helpers/logError");

const getAnswers = async (request, response) => {
    const questionID = request.params.questionID;
    Answers.find({idQuestion:questionID})
    .then((answers) => { 
        if(answers.length){
            response.status(StatusCodes.OK).json(answers);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch((error) => {
        logError(error);
        responseServer(response, error);
    });
};

module.exports = {getAnswers};
