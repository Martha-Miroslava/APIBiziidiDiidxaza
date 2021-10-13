const Cities = require('../models/cities');
const mongoose = require('mongoose');
const {StatusCodes} = require ('http-status-codes');
const {responseServer, responseNotFound, responseGeneral} = require('../helpers/response-result');

const validateExistsCity = (request, response, next) => {
    const {idCity} = request.body;
    Cities.findById(idCity, {_id:1})
    .then(function (city) {  
        if(city){
            return next();
        }
        return responseGeneral(response, StatusCodes.BAD_REQUEST, "La ciudad no existe")
    })
    .catch(function (error){
        return responseServer(response, error);
    });
}

const getCities = async (request, response) => {
    const stateID = request.params.stateID;
    const queryCities = Cities.where({ idState:stateID});
    queryCities.find()
    .then(function (cities) {  
        if(cities.length){
            response.status(StatusCodes.OK).json(cities);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
}


const postCity = async (request, response) => {
    const {
        nameCity,idState
    } = request.body;
    const idStateConverted  = mongoose.Types.ObjectId(idState);
    const city = new Cities ({
        nameCity: nameCity,
        idState:idStateConverted
    });
    await city.save()
    .then(function (city) {  
        response.status(StatusCodes.CREATED).json(city);
    })
    .catch(function (error){
        responseServer(response, error);
    });
}

module.exports = {getCities, postCity, validateExistsCity};