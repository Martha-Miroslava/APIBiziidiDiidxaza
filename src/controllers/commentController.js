const Comments = require("../models/comments");
const {StatusCodes} = require ("http-status-codes");
const mongoose = require("mongoose");
const Discussions = require("../models/discussions");
const {responseServer, responseNotFound, responseGeneral} = require("../helpers/responseResult");
const {logError} = require("../helpers/logError");

const validateExistsCommentt = (request, response, next) => {
    const idComment = request.body._id;
    Comments.findById(idComment, {_id:1})
    .then(function (comment) {  
        if(comment){
            return next();
        }
        return responseGeneral(response, StatusCodes.BAD_REQUEST, "El comentario no existe");
    })
    .catch(function (error){
        logError(error);
        return responseServer(response, error);
    });
};

const getComments = async (request, response) => {
    const discussionID = request.params.discussionID;
    Comments.find({idDiscussion: discussionID}, {idDiscussion:0})
    .populate({path: "idAccount", select: "name lastname URL"})
    .then(function (comments) {  
        if(comments.length){
            response.status(StatusCodes.OK).json(comments);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        logError(error);
        responseServer(response, error);
    });
};

const postComment = async (request, response) => {
    const {comment, idAccount, idDiscussion} = request.body;
    const idAccountConverted  = mongoose.Types.ObjectId(idAccount);
    const idDiscussionConverted  = mongoose.Types.ObjectId(idDiscussion);
    const dateNow = new Date();
    const dateCreation = new Date(dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000 )).toISOString().slice(0, 10);
    const newComment = new Comments ({comment: comment, dateCreation: dateCreation, idAccount: idAccountConverted, idDiscussion: idDiscussionConverted});
    await newComment.save()
    .then(async (commentSave) => {  
        await Discussions.updateOne({_id:idDiscussion}, {$inc:{numberComments:1}});
        response.status(StatusCodes.CREATED).json(commentSave);
    })
    .catch(function (error){
        logError(error);
        responseServer(response, error);
    });
};


const deleteComment = async (request, response) => {
    const _id = request.body._id;
    const idDiscussion = request.body.idDiscussion;
    const idComment  = mongoose.Types.ObjectId(_id);
    Comments.deleteOne({_id:idComment})
    .then(async (document) => {  
        await Discussions.updateOne({$and:[{_id:idDiscussion},{numberComments:{$gte: 1}}]}, {$inc:{numberComments:-1}});
        responseGeneral(response, StatusCodes.OK, "El comentario se eliminó exitosamente");
    })
    .catch(function (error){
        logError(error);
        responseServer(response, error);
    });
};

module.exports = {getComments, postComment, deleteComment, validateExistsCommentt};
