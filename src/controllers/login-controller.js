const Accounts = require('../models/accounts');
const {tokenSing}= require('../helpers/generateToken');
const {StatusCodes, ReasonPhrases} = require ('http-status-codes');

const postLogin = async (request, response) => {
    const {username, password} = request.body;
    await Accounts.findOne({username: username}, {_id:1, status:1, password:1, role:1})
    .then(async (account) =>{  
        if (account) {
            if(account.status == 1){
                const isValidPassword = await account.matchPassword(password, account.password);
                if(!isValidPassword){
                    response.status(StatusCodes.BAD_REQUEST).json({message: ReasonPhrases.BAD_REQUEST});
                }
                else{
                    const token = await tokenSing(account);
                    response.json({token: token, IdAccount: account._id});
                }  
            }
            else{
                response.status(StatusCodes.FORBIDDEN).json({message: "La cuenta esta bloqueada o esta inactiva comuniquese con el administrador"});        
            } 
        }
        else{    
            response.status(StatusCodes.NOT_FOUND).json({message: ReasonPhrases.NOT_FOUND});
        }
    })
    .catch(function (error){
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error, message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}


const patchLogin = async (request, response) => {
    const {username, codeConfirmation} = request.body;
    await Accounts.findOne({username: username}, {_id:1, codeConfirmation:1})
    .then( async (account) =>{ 
        if(account){
            if(account.codeConfirmation == codeConfirmation){
                await Accounts.updateOne({_id: account._id}, {status:1})
                response.status(StatusCodes.OK).json({message:ReasonPhrases.OK});
            }
            else{
                response.status(StatusCodes.BAD_REQUEST)
                .json({message: "El código de confimación es inválido"});
            }
        }
        else{
            response.status(StatusCodes.NOT_FOUND)
            .json({message: ReasonPhrases.NOT_FOUND});
        }
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message: ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}

module.exports = {postLogin, patchLogin};