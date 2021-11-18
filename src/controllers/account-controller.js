const Accounts = require("../models/accounts");
const {StatusCodes} = require ("http-status-codes");
const mongoose = require("mongoose");
const {generateCode} = require("../helpers/generateCode");
const {responseServer, responseNotFound, responseGeneral} = require("../helpers/response-result");
const {sendEmail} = require("./email-controller");

const validateExistsAccount = (request, response, next) => {
    const idAccount = request.body.idAccount;
    Accounts.findById(idAccount, {_id:1})
    .then(function (account) {  
        if(account){
            return next();
        }
        return responseGeneral(response, StatusCodes.BAD_REQUEST, "La cuenta no existe");
    })
    .catch(function (error){
        return responseServer(response, error);
    });
};

const validateExistsAccounts = (request, response, next) => {
    const {idAccount, accountReported} = request.body;
    Accounts.find({$or:[{_id:accountReported},{_id:idAccount}]}, {_id:1})
    .then(function (accounts) {  
        if(accounts.length === 2){
            return next();
        }
        return responseGeneral(response, StatusCodes.BAD_REQUEST, "La cuenta o cuentas no existen");
    })
    .catch(function (error){
        return responseServer(response, error);
    });
};

const validateExistsUsernameEmail = (request, response, next) => {
    const {email, username} = request.body;
    Accounts.find({$or:[{username:username},{email:email}]}, {_id:1})
    .then(function (accounts) {  
        if(accounts.length){
            return responseGeneral(response, StatusCodes.CONFLICT, "Existe una cuenta con el mismo nombre de usuario o correo");
        }
        return next();
    })
    .catch(function (error){
        return responseServer(response, error);
    });
};

const validateExistsAccountUpdate = (request, response, next) => {
    const {_id, email, username} = request.body;
    Accounts.find({$and :[{$or:[{username:username},{email:email}]}, {_id:{$ne: _id}}]}, {_id:1})
    .then(function (accounts) {  
        if(accounts.length){
            return responseGeneral(response, StatusCodes.CONFLICT, "Existe otra cuenta con el mismo nombre de usuario o correo");
        }
        return next();
    })
    .catch(function (error){
        return responseServer(response, error);
    });
};


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
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

const getAccounts = async (request, response) => {
    Accounts.find(null,{name:1, lastname:1, username:1})
    .then(function (accounts) {  
        if(accounts.length){
            response.status(StatusCodes.OK).json(accounts);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

const getAccount = async (request, response) => {
    const accountID = request.params.accountID;
    Accounts.findById(accountID)
    .populate({path: "idCity", select: "idState"})
    .then(function (account) {  
        if(account){
            response.status(StatusCodes.OK).json(account);
        }
        else{
            responseNotFound(response);
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

const postAccount = async (request, response) => {
    const {lastname,name,dateBirth,age,email,username,password,role,idCity} = request.body;
    let codeConfirmation = generateCode();
    const dateNow = new Date();
    const idCityConverted  = mongoose.Types.ObjectId(idCity);
    const dateCreation = new Date(dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000 )).toISOString().slice(0, 10);
    const newAccount = new Accounts ({
        lastname:lastname,
        name:name,
        age:age,
        dateBirth:dateBirth,
        email:email,
        username:username,
        password:password,
        role:role,
        status:2,
        codeConfirmation:codeConfirmation,
        dateCreation:dateCreation,
        idCity:idCityConverted
    });
    newAccount.password = await newAccount.encrypPassword(newAccount.password);
    await newAccount.save()
    .then(async (account)  => {  
        const title = "Código de Confirmación de la cuenta";
        const message = "Estimado usuario "+name+" "+lastname+
        " para terminar el proceso de creación de su cuenta le enviamos su código de confirmación: "+ codeConfirmation;
        await sendEmail(email,title,message);
        response.status(StatusCodes.CREATED).json(account);
    })
    .catch(function (error){
        responseServer(response, error);
    });
};


const putAccount = async (request, response) => {
    const {_id,lastname,name,age,dateBirth,email,username,idCity} = request.body;
    const idAccount  = mongoose.Types.ObjectId(_id);
    const idCityConverted  = mongoose.Types.ObjectId(idCity);
    const queryAccount = {_id:idAccount};
    const newValuesAccount = {lastname:lastname, name:name,
    age:age, dateBirth:dateBirth, email: email, idCity:idCityConverted, username:username};
    Accounts.updateOne(queryAccount, newValuesAccount)
    .then(function (document) {  
        responseGeneral(response, StatusCodes.OK, "La cuenta se edito exitosamente");
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

const patchAccount = async (request, response) => {
    const {_id, status} = request.body;
    const idAccount  = mongoose.Types.ObjectId(_id);
    const queryAccount = {_id:idAccount};
    const newValuesAccount = {status:status};
    Accounts.updateOne(queryAccount, newValuesAccount)
    .then(async (document) => {  
        responseGeneral(response, StatusCodes.OK, "La cuenta cambio su estado exitosamente");
    })
    .catch(function (error){
        responseServer(response, error);
    });
};



module.exports = {getAccounts, getAccount, postAccount, putAccount, patchAccount, getAccountsFilters, 
    validateExistsUsernameEmail, validateExistsAccounts, validateExistsAccount, validateExistsAccountUpdate};