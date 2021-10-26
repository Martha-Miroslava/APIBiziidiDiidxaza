const Comments = require("../models/comments");
const {StatusCodes} = require ("http-status-codes");
const mongoose = require("mongoose");
const {responseServer, responseNotFound, responseGeneral} = require("../helpers/response-result");

const getComments = async (request, response) => {
    const discussionID = request.params.discussionID;
    Comments.find({idDiscussion: discussionID}, {idDiscussion:0})
    .populate({path: "idAccount", select: "name lastname"})
    .then(function (comments) {  
        if(comments.length){
            response.status(StatusCodes.OK).json(comments);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
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
    .then(function (commentSave) {  
        response.status(StatusCodes.CREATED).json(commentSave);
    })
    .catch(function (error){
        responseServer(response, error);
    });
};


const deleteComment = async (request, response) => {
    const _id = request.body._id;
    const idComment  = mongoose.Types.ObjectId(_id);
    Comments.deleteOne({_id:idComment})
    .then(function (document) {  
        responseGeneral(response, StatusCodes.OK, "El comentario se eliminó exitosamente");
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

module.exports = {getComments, postComment, deleteComment};