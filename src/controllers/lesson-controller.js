const Lessons = require('../models/lessons');
const {StatusCodes} = require ('http-status-codes');
const {responseServer, responseGeneral} = require('../helpers/response-result');

const validateExistsLesson = (request, response, next) => {
    const {idLesson} = request.body;
    Lessons.findById(idLesson, {_id:1})
    .then(function (lesson) {  
        if(lesson){
            return next();
        }
        return responseGeneral(response, StatusCodes.BAD_REQUEST, "La lección no existe");
    })
    .catch(function (error){
        return responseServer(response, error);
    });
}

module.exports = {validateExistsLesson}