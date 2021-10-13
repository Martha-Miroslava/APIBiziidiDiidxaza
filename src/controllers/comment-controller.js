const Comments = require('../models/comments');
const {StatusCodes, ReasonPhrases} = require ('http-status-codes');
const mongoose = require('mongoose');

const getComments = async (request, response) => {
    const discussionID = request.params.discussionID;
    Comments.find({idDiscussion: discussionID})
    .populate({path: 'idAccount', select: 'name lastname'})
    .then(function (comments) {  
        if(comments.length){
            response.status(StatusCodes.OK).json(comments);
        }
        else{
            response.status(StatusCodes.NOT_FOUND).json({message:ReasonPhrases.NOT_FOUND});
        }
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message:ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}


const postComment = async (request, response) => {
    const {
        comment, idAccount, idDiscussion
    } = request.body;
    const idAccountConverted  = mongoose.Types.ObjectId(idAccount);
    const idDiscussionConverted  = mongoose.Types.ObjectId(idDiscussion);
    const dateNow = new Date();
    const dateCreation = dateNow.getFullYear()+"-"+dateNow.getMonth()+"-"+dateNow.getDate();
    const newComment = new Comments ({
        comment: comment,
        dateCreation: dateCreation,
        status: 1,
        idAccount: idAccountConverted,
        idDiscussion: idDiscussionConverted
    });
    await newComment.save()
    .then(function (comment) {  
        response.status(StatusCodes.CREATED).json(comment);
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error, message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}


const patchComment = async (request, response) => {
    const { id,status} = request.body;
    const idComment  = mongoose.Types.ObjectId(id);
    const queryComment = {_id:idComment};
    const newValuesComment = {status:status};
    Comments.updateOne(queryComment, newValuesComment)
    .then(function (document) {  
        response.status(StatusCodes.OK).json({message:ReasonPhrases.OK});
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message:ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}

module.exports = {getComments, postComment, patchComment}