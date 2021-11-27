const Reports = require("../models/reports");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const { responseServer, responseNotFound } = require("../helpers/response-result");
const {logError} = require("../helpers/log-error");

const postReport = async (request, response) => {
    const { reason, context, idAccount, accountReported } = request.body;
    const idAcountConverted = mongoose.Types.ObjectId(idAccount);
    const accountReportedConverted = mongoose.Types.ObjectId(accountReported);
    const dateNow = new Date();
    const dateCreation = new Date(dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
    const newReport = new Reports({
        reason: reason,
        context: context,
        dateCreation: dateCreation,
        idAccount: idAcountConverted,
        accountReported: accountReportedConverted
    });
    await newReport.save()
        .then(function (report) {
            response.status(StatusCodes.CREATED).json(report);
        })
        .catch(function (error) {
            logError(error);
            responseServer(response, error);
        });
};

const getReportsFilters = async (request, response) => {
    const filter = request.params.filter;
    const criterion = request.params.criterion;
    if(filter === "dateCreation"){
        Reports.find({dateCreation: criterion}, {dateCreation:1, idAccount:1, accountReported:1})
        .populate({path: "idAccount", select: "username -_id"})
        .populate({path: "accountReported", select: "username _id"})
        .then(function (reports) {  
            if(reports.length){
                response.status(StatusCodes.OK).json(reports);
            }
            else{
                responseNotFound(response);
            }
        })
        .catch(function (error){
            logError(error);
            responseServer(response, error);
        }); 
    }
    else{
        let queryAccountReported = null;
        switch(filter){
            case "usernameAccount":
                queryAccountReported = {$match:{"idAccount.username": { $regex : new RegExp(criterion, "i")}}};
                break;
            case "usernameReported":
                queryAccountReported = {$match:{"accountReported.username": { $regex : new RegExp(criterion, "i")}}};
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
            {$project:{"accountReported.username": 1,"accountReported._id": 1, dateCreation:1, "idAccount.username": 1}}
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
            logError(error);
            responseServer(response, error);
        });
    }
};


const getReports = async (request, response) => {
    Reports.find(null, { _id: 1, dateCreation: 1, reason: 1 })
        .populate({ path: "idAccount", select: "username _id" })
        .populate({ path: "accountReported", select: "username _id" })
        .then(function (reports) {
            if (reports.length) {
                response.status(StatusCodes.OK).json(reports);
            }
            else {
                responseNotFound(response);
            }
        })
        .catch(function (error) {
            logError(error);
            responseServer(response, error);
        });
};


const getReport = async (request, response) => {
    const reportID = request.params.reportID;
    Reports.findById(reportID)
        .then(function (report) {
            if (report) {
                response.status(StatusCodes.OK).json(report);
            }
            else {
                responseNotFound(response);
            }
        })
        .catch(function (error) {
            responseServer(response, error);
        });
};

module.exports = { getReports, getReport, postReport, getReportsFilters };