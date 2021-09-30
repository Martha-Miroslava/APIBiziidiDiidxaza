const Accounts = require('../models/accounts');
const {sendToTelegram} = require('../helpers/telegramBot');
const {jsonErrors} = require('../helpers/exception-responses');
const {ResponseREST} = require('../helpers/responses');

const getAccounts = async (request, response) => {
    try{
        const accounts = await Accounts.find();      
        if(accounts){
            response.json(accounts);
        }
        else{
            response.status(ResponseREST.NOT_FOUND).json(jsonErrors(ResponseREST.NOT_FOUND));
        }
    }catch(error){
        response.status(ResponseREST.SERVER_ERROR).json(jsonErrors(ResponseREST.SERVER_ERROR));
        sendToTelegram(exception);
        next(); 
    } 
}

const postAccount = async (request, response) => {
    const {
        lastname,name,age,
        dateBirth, email, URLPhoto,
        username, password,role,
        status,dateCreation, idCity
    } = req.body;
    const account = new Accounts ({
        lastname: lastname,
        name: name,
        age: age,
        dateBirth: dateBirth,
        email: email,
        URLPhoto: URLPhoto,
        username: username,
        password: password,
        role: role,
        status: status,
        dateCreation: dateCreation,
        idCity: idCity
    });
    account.password = await account.encrypPassword(account.password);
    await account.save();
    res.json({mensaje: 'El usuario se guardo correctamente'});
}

module.exports = {getAccounts, postAccount}