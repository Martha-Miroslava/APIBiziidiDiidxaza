const Accounts = require('../models/accounts');
const {StatusCodes, ReasonPhrases} = require ('http-status-codes');
const mongoose = require('mongoose');
const {generateCode} = require('../helpers/generateCode');

const validateExistsAccount = (request, response, next) => {
    const {idAccount} = request.body;
    Accounts.findById(idAccount, {_id:1})
    .then(function (accounts) {  
        if(accounts){
            return next();
        }
        return response.status(StatusCodes.BAD_REQUEST).json({message: "La cuenta no existe"});
    })
    .catch(function (error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}

const validateExistsAccounts = (request, response, next) => {
    const { idAccount, accountReported} = request.body;
    Accounts.find({$or:[{_id:accountReported},{_id:idAccount}]}, {_id:1})
    .then(function (accounts) {  
        if(accounts.length == 2){
            return next();
        }
        return response.status(StatusCodes.BAD_REQUEST).json({message: "Las cuentas no existen"});
    })
    .catch(function (error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}

const validateExistsUsernameEmail = (request, response, next) => {
    const { email, username} = request.body;
    Accounts.find({$or:[{username:username},{email:email}]}, {_id:1})
    .then(function (accounts) {  
        if(accounts.length){
            return response.status(StatusCodes.CONFLICT)
            .json({message: ReasonPhrases.CONFLICT});
        }
        return next();
    })
    .catch(function (error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}

const validateExistsAccountUpdate = (request, response, next) => {
    const {id, email, username} = request.body;
    Accounts.find({$and :[{$or:[{username:username},{email:email}]}, {_id:{$ne: id}}]}, {_id:1})
    .then(function (accounts) {  
        if(accounts.length){
            return response.status(StatusCodes.CONFLICT)
            .json({message: ReasonPhrases.CONFLICT});
        }
        return next();
    })
    .catch(function (error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}



const getAccountsFilters = async (request, response) => {
    const filter = request.params.filter;
    let criterion = request.params.criterion;
    let queryAccounts = null;
    switch(filter){
        case "lastname":
            queryAccounts = {lastname:{$regex : new RegExp(criterion, "i")}};
            break;
        case "name":
            queryAccounts = {name:{ $regex : new RegExp(criterion, "i")}};
            break;
        case "age":
            queryAccounts = {age: criterion};
            break;
        case "dateBirth":
            queryAccounts = {dateBirth: criterion};
            break;
        case "email":
            queryAccounts = {email: criterion};
            break;
        case "username":
            queryAccounts ={username: criterion};
            break;
        case "dateCreation":
            queryAccounts = {dateCreation: criterion};
            break;
    }  
    Accounts.find(queryAccounts, {name:1, lastname:1, username:1})
    .then(function (accounts) {  
        if(accounts.length){
            response.status(StatusCodes.OK).json(accounts);
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

const getAccounts = async (request, response) => {
    Accounts.find(null,{name:1, lastname:1, username:1})
    .then(function (accounts) {  
        if(accounts.length){
            response.status(StatusCodes.OK).json(accounts);
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

const getAccount = async (request, response) => {
    const accountID = request.params.accountID;
    Accounts.findById(accountID)
    .then(function (account) {  
        if(account){
            response.status(StatusCodes.OK).json(account);
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

const postAccount = async (request, response) => {
    const {
        lastname,name,age,
        dateBirth, email,
        username, password,role, idCity
    } = request.body;
    let codeConfirmation = generateCode();
    const idCityConverted  = mongoose.Types.ObjectId(idCity);
    const dateNow = new Date();
    const dateCreation = dateNow.getFullYear()+"-"+dateNow.getMonth()+"-"+dateNow.getDate();
    const account = new Accounts ({
        lastname: lastname,
        name: name,
        age: age,
        dateBirth: dateBirth,
        email: email,
        URLPhoto: "https:photo.com",
        username: username,
        password: password,
        role: role,
        status: 2,
        codeConfirmation: codeConfirmation,
        dateCreation: dateCreation,
        idCity: idCityConverted
    });
    account.password = await account.encrypPassword(account.password);
    await account.save()
    .then(async (account)  =>{  
        const title = "Código de Confirmación de la cuenta"
        const message = "Estimado usuario "+account.name+" "+account.lastname+
        " para terminar el proceso de creación de su cuenta le enviamos su código de confirmación: "+ account.codeConfirmation;
        await sendEmail(account.email,title,message);
        response.status(StatusCodes.CREATED).json(account);
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error, message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}


const putAccount = async (request, response) => {
    const {
        id,lastname, name, age,
        dateBirth, email, username, idCity
    } = request.body;
    const idAccount  = mongoose.Types.ObjectId(id);
    const idCityConverted  = mongoose.Types.ObjectId(idCity);
    const queryAccount = {_id:idAccount};
    const newValuesAccount = {lastname:lastname, name:name,
    age:age, dateBirth:dateBirth, email: email, URLPhoto:"httpp.photo.com", idCity:idCityConverted, username:username};
    Accounts.updateOne(queryAccount, newValuesAccount)
    .then(function (document) {  
        response.status(StatusCodes.OK).json({message:ReasonPhrases.OK});
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message:ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}

const patchAccount = async (request, response) => {
    const {id, status} = request.body;
    const idAccount  = mongoose.Types.ObjectId(id);
    const queryAccount = {_id:idAccount};
    const newValuesAccount = {status:status};
    Accounts.updateOne(queryAccount, newValuesAccount)
    .then(async (document) =>{  
        response.status(StatusCodes.OK).json({message:ReasonPhrases.OK});
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message:ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}



module.exports = {getAccounts, getAccount, postAccount, putAccount, patchAccount, getAccountsFilters, 
    validateExistsUsernameEmail, validateExistsAccounts, validateExistsAccount, validateExistsAccountUpdate};