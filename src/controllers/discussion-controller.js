const Discussions = require('../models/discussions');
const Accounts = require('../models/accounts');
const {StatusCodes} = require ('http-status-codes');
const mongoose = require('mongoose');
const {responseServer, responseNotFound, responseGeneral} = require('../helpers/response-result');

const validateExistsDiscussion = (request, response, next) => {
    const {idDiscussion} = request.body;
    Discussions.findById(idDiscussion, {_id:1})
    .then(function (discussion) {  
        if(discussion){
            return next();
        }
        return responseGeneral(response, StatusCodes.BAD_REQUEST, "La discusion no existe");
    })
    .catch(function (error){
        return responseServer(response, error);
    });
}

const getDiscussionsFilters = async (request, response) => {
    const filter = request.params.filter;
    let queryDiscussions = {numberComments:{$gte:15}};;
    if(filter == "news"){
        const dateNow = new Date();
        const dateCreationNow = dateNow.getFullYear()+"-"+dateNow.getMonth()+"-"+dateNow.getDate();
        const threeDayBefore = new Date(dateNow - 3);
        const dateCreationThreeDay = threeDayBefore.getFullYear()+"-"+threeDayBefore.getMonth()+"-"+threeDayBefore.getDate();
        queryDiscussions = {$and: [{dateCreation:{$gte:dateCreationThreeDay}},{dateCreation: {$lte:dateCreationNow}}]};
    }  
    Discussions.find(queryDiscussions, {title:1, dateCreation:1, numberComments:1, theme:1})
    .then(function (discussions) {  
        if(discussions.length){
            response.status(StatusCodes.OK).json(discussions);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
}

const getDiscussionsCriterion = async (request, response) => {
    const filter = request.params.filter;
    const criterion = request.params.criterion;
    if(filter == "title"){
        Discussions.find({title:{$regex : new RegExp(criterion, "i")}}, {title:1, dateCreation:1, numberComments:1, theme:1})
        .then(function (discussions) {  
            if(discussions.length){
                response.status(StatusCodes.OK).json(discussions);
            }
            else{
                responseNotFound(response);
            }
        })
        .catch(function (error){
            responseServer(response, error);
        });
    } 
    Accounts.findById(criterion, {_id:0, discussions:1})
    .populate({path: 'discussions', select: 'title dateCreation numberComments theme'})
    .then(function (account) {  
        if(account){
            response.status(StatusCodes.OK).json(account.discussions);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });  
}

const getDiscussions = async (request, response) => {
    Discussions.find(null,{title:1, dateCreation:1, numberComments:1, theme:1})
    .then(function (discussions) {  
        if(discussions.length){
            response.status(StatusCodes.OK).json(discussions);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
}

const getDiscussion = async (request, response) => {
    const discussionID = request.params.discussionID;
    Discussions.findById(discussionID)
    .populate({path: 'idAccount', select: 'name lastname'})
    .then(function (discussion) {  
        if(discussion){
            response.status(StatusCodes.OK).json(discussion);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
}


const postDiscussion = async (request, response) => {
    const {
        title,comment, theme, idAccount
    } = request.body;
    const idAccountConverted  = mongoose.Types.ObjectId(idAccount);
    const dateNow = new Date();
    const dateCreation = new Date(dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000 )).toISOString().slice(0, 10);
    const discussion = new Discussions ({
        title: title,
        comment: comment,
        dateCreation: dateCreation,
        status: 1,
        theme: theme,
        idAccount: idAccountConverted
    });
    await discussion.save()
    .then(function (discussion) {  
        response.status(StatusCodes.CREATED).json(discussion);
    })
    .catch(function (error){
        responseServer(response, error);
    });
}


const patchDiscussion = async (request, response) => {
    const {
        id, idAccount,
    } = request.body;
    const idAccountConverted  = mongoose.Types.ObjectId(idAccount);
    const idConverted  = mongoose.Types.ObjectId(id);
    Accounts.updateOne({_id:idAccountConverted}, {discussions:idConverted})
    .then(function (document) {  
        responseGeneral(response, StatusCodes.OK, "La discusión se segui exitosamente");
    })
    .catch(function (error){
        responseServer(response, error);
    });
}

module.exports = {getDiscussions, getDiscussionsFilters, getDiscussionsCriterion, getDiscussion, 
    postDiscussion, patchDiscussion, validateExistsDiscussion};