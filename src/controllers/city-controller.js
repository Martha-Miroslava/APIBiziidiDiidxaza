const Cities = require('../models/cities');
const mongoose = require('mongoose');
const {StatusCodes, ReasonPhrases} = require ('http-status-codes');

const validateExistsCity = (request, response, next) => {
    const {idCity} = request.body;
    Cities.findById(idCity, {_id:1})
    .then(function (city) {  
        if(city){
            return next();
        }
        return response.status(StatusCodes.BAD_REQUEST).json({message: "La ciudad no existe"});
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message:ReasonPhrases.INTERNAL_SERVER_ERROR});
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
            response.status(StatusCodes.NOT_FOUND).json({message:ReasonPhrases.NOT_FOUND});
        }
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message:ReasonPhrases.INTERNAL_SERVER_ERROR});
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
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message:ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}

module.exports = {getCities, postCity, validateExistsCity};