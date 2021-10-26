const Reports = require("../models/reports");
const {StatusCodes} = require ("http-status-codes");
const mongoose = require("mongoose");
const {responseServer, responseNotFound} = require("../helpers/response-result");

const postReport = async (request, response) => {
    const {reason,context,idAccount,accountReported} = request.body;
    const idAcountConverted  = mongoose.Types.ObjectId(idAccount);
    const accountReportedConverted  = mongoose.Types.ObjectId(accountReported);
    const dateNow = new Date();
    const dateCreation = new Date(dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000 )).toISOString().slice(0, 10);
    const newReport = new Reports ({
        reason:reason,
        context:context,
        dateCreation:dateCreation, 
        idAccount:idAcountConverted, 
        accountReported:accountReportedConverted});
    await newReport.save()
    .then(function (report) {  
        response.status(StatusCodes.CREATED).json(report);
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

const getReportsFilters = async (request, response) => {
    const filter = request.params.filter;
    const criterion = request.params.criterion;
    if(filter === "dateCreation"){
        Reports.find({dateCreation: criterion}, {dateCreation:1, idAccount:1, accountReported:1})
        .populate({path: "idAccount", select: "name lastname -_id"})
        .populate({path: "accountReported", select: "name lastname -_id"})
        .then(function (reports) {  
            if(reports.length){
                response.status(StatusCodes.OK).json(reports);
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
        let queryAccountReported = null;
        const regExp = new RegExp(criterion, "i");
        switch(filter){
            case "nameAccount":
                queryAccountReported = {$match:{"idAccount.name": { $regex : regExp}}};
                break;
            case "lastnameAccount":
                queryAccountReported = {$match:{"idAccount.lastname": { $regex : regExp}}};
                break;
            case "nameReported":
                queryAccountReported = {$match:{"accountReported.name": { $regex : regExp}}};
                break;
            case "lastnameReported":
                queryAccountReported = {$match:{"accountReported.lastname": { $regex : regExp}}};
                break;
        }
        Reports.aggregate([
            {$lookup: {
                from:"accounts", as:"idAccount",
                localField:"idAccount",
                foreignField:"_id",
            },
            }, 
            {$lookup: {
                from:"accounts", as:"accountReported",
                localField:"accountReported",
                foreignField:"_id",
            },
            }, 
            queryAccountReported,
            {$project:{"accountReported.name": 1, "accountReported.lastname": 1, dateCreation:1, "idAccount.name": 1, 
            "idAccount.lastname": 1}}
        ])
        .then(function (reports) {  
            if(reports.length){
                response.status(StatusCodes.OK).json(reports);
            }
            else{
                responseNotFound(response);
            }
        })
        .catch(function (error){
            responseServer(response, error);
        });
    }
};


const getReports = async (request, response) => {
    Reports.find(null, {_id:0, dateCreation:1})
    .populate({path: "idAccount", select: "name lastname -_id"})
    .populate({path: "accountReported", select: "name lastname -_id"})
    .then(function (reports) {  
        if(reports.length){
            response.status(StatusCodes.OK).json(reports);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
};


const getReport = async (request, response) => {
    const reportID = request.params.reportID;
    Reports.findById(reportID)
    .populate({path: "idAccount", select: "name lastname username -_id"})
    .populate({path: "accountReported", select: "name lastname username -_id"})
    .then(function (report) {  
        if(report){
            response.status(StatusCodes.OK).json(report);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

module.exports = {getReports, getReport, postReport, getReportsFilters};