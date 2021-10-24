const Lessons = require("../models/lessons");
const {StatusCodes} = require ("http-status-codes");
const {responseServer, responseGeneral, responseNotFound} = require("../helpers/response-result");


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
};


const getLessons = async (request, response) => {
    Lessons.find()
    .then(function (lessons) {  
        if(lessons.length){
            response.status(StatusCodes.OK).json(lessons);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

const postLesson = async (request, response) => {
    const {
        name, description, pointsTotal
    } = request.body;
    const newLesson = new Lessons ({
        name: name,
        description: description,
        pointsTotal: pointsTotal
    });
    await newLesson.save()
    .then(async (lesson)  =>{
        response.status(StatusCodes.CREATED).json(lesson);
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

module.exports = {validateExistsLesson, getLessons, postLesson};