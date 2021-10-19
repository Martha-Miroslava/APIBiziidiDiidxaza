const Accounts = require('../models/accounts');
const {tokenSing}= require('../helpers/generateToken');
const {StatusCodes} = require ('http-status-codes');
const {responseServer, responseGeneral} = require('../helpers/response-result');

const postLogin = async (request, response) => {
    const {username, password} = request.body;
    await Accounts.findOne({username: username}, {_id:1, status:1, password:1, role:1, name:1, lastname:1, URLPhoto:1})
    .then(async (account) =>{  
        if (account) {
            if(account.status == 1){
                const isValidPassword = await account.matchPassword(password, account.password);
                if(!isValidPassword){
                    responseGeneral(response, StatusCodes.BAD_REQUEST, "La contraseña es inválida");
                }
                else{
                    const token = await tokenSing(account);
                    response.status(StatusCodes.CREATED).json({token: token, account: account});
                }  
            }
            else{
                responseGeneral(response, StatusCodes.FORBIDDEN, "La cuenta esta bloqueada o esta inactiva comuniquese con el administrador");        
            } 
        }
        else{    
            responseGeneral(response, StatusCodes.NOT_FOUND, "No se encontro la cuenta");
        }
    })
    .catch(function (error){
        console.log(error);
        responseServer(response, error);
    });
}


const patchLogin = async (request, response) => {
    const {username, codeConfirmation} = request.body;
    await Accounts.findOne({$and:[{username: username}, {status:[ 1,2]}]}, {_id:1, codeConfirmation:1})
    .then( async (account) =>{ 
        if(account){
            if(account.codeConfirmation == codeConfirmation){
                await Accounts.updateOne({_id: account._id}, {status:1})
                responseGeneral(response, StatusCodes.CREATED, "La confirmación es exitosa");
            }
            else{
                responseGeneral(response, StatusCodes.BAD_REQUEST, "El código de confimación es inválido");
            }
        }
        else{
            responseGeneral(response, StatusCodes.NOT_FOUND, "No se encontro la cuenta o esta bloqueda");
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
}

module.exports = {postLogin, patchLogin};