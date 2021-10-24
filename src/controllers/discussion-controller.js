const Discussions = require("../models/discussions");
const Accounts = require("../models/accounts");
const {StatusCodes} = require ("http-status-codes");
const mongoose = require("mongoose");
const {responseServer, responseNotFound, responseGeneral} = require("../helpers/response-result");

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
};

const getDiscussionsFilters = async (request, response) => {
    const filter = request.params.filter;
    let queryDiscussions = {numberComments:{ $gte: 15 }};
    if(filter == "news"){
        const dateNow = new Date();
        const dateCreation = new Date(dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000 )).toISOString().slice(0, 10);
        queryDiscussions = {dateCreation:dateCreation};
    } 
    await Discussions.find(queryDiscussions, {title:1, dateCreation:1, numberComments:1, theme:1})
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
};

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
    else{
        Accounts.findOne({_id:criterion}, {_id:0, discussions:1})
        .then(async (account) =>{
            if(!account || account.discussions == '[]'){
                responseNotFound(response);
            }
            else{
                const disccussions = await Discussions.find({_id:{ $in: account.discussions}}, {title:1, dateCreation:1, numberComments:1, theme:1})
                if(disccussions.length){
                    response.status(StatusCodes.OK).json(disccussions);
                }
                else{
                    responseNotFound(response);
                }
            }
        })
        .catch(function (error){
            responseServer(response, error);
        }); 
    } 
};

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
};

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
};


const postDiscussion = async (request, response) => {
    const {title,comment, theme, idAccount} = request.body;
    const idAccountConverted  = mongoose.Types.ObjectId(idAccount);
    const dateNow = new Date();
    const dateCreation = new Date(dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000 )).toISOString().slice(0, 10);
    const newDiscussion = new Discussions ({
        title: title,
        comment: comment,
        dateCreation: dateCreation,
        status: 1,
        theme: theme,
        idAccount: idAccountConverted
    });
    await newDiscussion.save()
    .then(function (discussion) {  
        response.status(StatusCodes.CREATED).json(discussion);
    })
    .catch(function (error){
        responseServer(response, error);
    });
};


const patchDiscussion = async (request, response) => {
    const {_id, idAccount} = request.body;
    const idAccountConverted  = mongoose.Types.ObjectId(idAccount);
    const idConverted  = mongoose.Types.ObjectId(_id);
    Accounts.findOne({_id:idAccountConverted}, {discussions:1})
    .then(async (account) => {
        const discussion = await Discussions.findOne({_id:idConverted});
        if(discussion){
            if(account.discussions == '[]'){  
                await Accounts.updateOne({_id:idAccountConverted}, {discussions:idConverted});
            }
            else{
                await Accounts.updateOne({_id:idAccountConverted}, {$push: {discussions:idConverted}});
            }
            responseGeneral(response, StatusCodes.OK, "La discusión se segui exitosamente");
        }
        else{
            return responseGeneral(response, StatusCodes.BAD_REQUEST, "La discusion no existe");
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

module.exports = {getDiscussions, getDiscussionsFilters, getDiscussionsCriterion, getDiscussion, 
    postDiscussion, patchDiscussion, validateExistsDiscussion};