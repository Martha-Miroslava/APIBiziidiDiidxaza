const LessonRecords = require("../models/lessonRecords");
const {StatusCodes} = require ("http-status-codes");
const {responseServer, responseNotFound} = require("../helpers/response-result");

const postLessonRecord = async (request, response) => {
    const {pointsObtained, idAccount, idLesson} = request.body;
    const dateNow = new Date();
    const dateCreation = new Date(dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000 )).toISOString().slice(0, 10);
    const newLessonRecord = new LessonRecords ({
        pointsObtained: pointsObtained,
        dateCreation:dateCreation,
        idAccount: idAccount,
        idLesson: idLesson
    });
    await newLessonRecord.save()
    .then(async (lessonRecord)  => {
        response.status(StatusCodes.CREATED).json(lessonRecord);
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

const getLessonRecords = async (request, response) => {
    const accountID = request.params.accountID;
    LessonRecords.find({idAccount:accountID})
    .then(function (lessonRecords) {  
        if(lessonRecords.length){
            response.status(StatusCodes.OK).json(lessonRecords);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

module.exports = {postLessonRecord, getLessonRecords};