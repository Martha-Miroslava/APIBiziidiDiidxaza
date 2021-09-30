const Accounts = require('../models/accounts');
const {sendToTelegram} = require('../helpers/telegramBot');
const  {tokenSing}= require('../helpers/generateToken');
const {jsonErrors} = require('../helpers/exception-responses');
const {ResponseREST} = require('../helpers/responses');
const {Number} = require('../helpers/number');


const postLogin = async (request, response) => {
    const {username, password} = request.body;
    const queryAccounts  = Accounts.where({ status: Number.ONE, username: username});
    queryAccounts.findOne(function (error, accounts) {   
        if (error){           
            sendToTelegram(exception);
            response.status(ResponseREST.SERVER_ERROR).json(jsonErrors(ResponseREST.SERVER_ERROR));
        }     
        if (accounts) {
            const isValidPassword = await accounts.matchPassword(password);
            if(isValidPassword){
                const token = tokenSing(accounts);
                return res.json({token: token});
            }
            else{
                response.status(ResponseREST.INVALID_INPUT).json(jsonErrors(ResponseREST.INVALID_INPUT));
            }
        }
        else{
            response.status(ResponseREST.NOT_FOUND).json(jsonErrors(ResponseREST.NOT_FOUND));
        }
    });
}

module.exports = {postSigIn};