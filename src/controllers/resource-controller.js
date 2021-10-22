const {responseServer, responseGeneral, responseNotFound} = require('../helpers/response-result');
const {StatusCodes} = require ('http-status-codes');
const Accounts = require('../models/accounts');
const Lessons = require('../models/lessons');
const Questions = require('../models/questions');
const path = require('path');
const fs = require('fs').promises;

const patchResource = (request, response, next) => {
    const URL = request.body.URL;
    fs.stat(path.join(__dirname,URL))
    .then( ()=>{
        response.sendFile(path.join(__dirname,URL));
    })
    .catch((error) =>{
        if(error.code == 'ENOENT'){
            responseNotFound(response);
        }
        else{
            responseServer(response, error);
        } 
    });
}

const postImageLesson = (request, response, next) =>{
    const idLesson = request.body.idLesson;
    const url = "../images/lessons/"
    postResource(request, response, idLesson,url, Lessons);
}

const postImageAccount = (request, response, next) =>{
    const idAccount = request.body.idAccount;
    const url = "../images/accounts/"
    postResource(request, response, idAccount,url, Accounts);
}

const postAudio = (request, response, next) =>{
    if(request.files){
        const file = request.files.file;
        const idQuestion = request.body.idQuestion;
        const fileName = file.name;
        const extension = path.extname(fileName);
        const allowedExtensions = /mp3|mp4/;
        const size = file.data.length;
        if(allowedExtensions.test(extension) && size<20000000){
            const url = "../audios/"+idQuestion+extension;
            file.mv(path.join(__dirname,url)).then(async () => {
                await Questions.updateOne({_id:idQuestion}, {URL:url})
                responseGeneral(response, StatusCodes.CREATED, "El audio se guardo exitosamente");
            }).catch((error) => {
                responseServer(response, error);
            });
        }
        else{
            responseGeneral(response, StatusCodes.BAD_REQUEST, "Extensión no admitida o el archivo debe pesar menos de 20MB");
        }
    }
    else{
        responseGeneral(response, StatusCodes.BAD_REQUEST, "Necesita subir un audio");
    }
}

const postResource = async (request, response, id, URLPhoto, model) => {
    if(request.files){
        const file = request.files.file;
        const fileName = file.name;
        const extension = path.extname(fileName);
        const allowedExtensions = /png|jpeg|jpg/;
        const size = file.data.length;
        if(allowedExtensions.test(extension) && size<10000000){
            const url = URLPhoto+id+extension;
            file.mv(path.join(__dirname, url)).then(async () => {
                await model.updateOne({_id:id}, {URL:url})
                return responseGeneral(response, StatusCodes.CREATED, "La imagen se guardo exitosamente");
            }).catch((error) => {
                return responseServer(response, error);
            });
        }
        else{
            return responseGeneral(response, StatusCodes.BAD_REQUEST, "Extensión no admitida o el archivo debe pesar menos de 10MB");
        }
    }
    else{
        return  responseGeneral(response, StatusCodes.BAD_REQUEST, "Necesita subir una imagen");
    }
}


const deleteResource = (request, response, next) => {
    const url = request.body.URL;
    fs.unlink(path.join(__dirname,url))
    .then(() => {
        responseGeneral(response, StatusCodes.OK, "El archivo se eliminó exitosamente");
    }).catch((error) => {
        if(error.code == 'ENOENT'){
            responseGeneral(response, StatusCodes.BAD_REQUEST, "No existe el archivo");
        }
        else{
            responseServer(response, error);
        } 
    });
}


module.exports = {postImageAccount, postImageLesson, deleteResource, patchResource, postAudio};