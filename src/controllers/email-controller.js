const Accounts = require('../models/accounts');
const {StatusCodes, ReasonPhrases} = require ('http-status-codes');
const {generateCode} = require('../helpers/generateCode');
const nodemailer = require('nodemailer');

const postEmail = async (request, response) => {
    const {email} = request.body;
    let codeConfirmation = generateCode();
    Accounts.findOne({email:email}, {_id:1, name:1, lastname:1})
    .then(async (account) =>{  
        if(account){
            await Accounts.updateOne({_id:account._id}, {codeConfirmation:codeConfirmation});
            const title = "Código de Confirmación de la cuenta"
            const message = "Estimado usuario "+account.name+" "+account.lastname+
            " para terminar el proceso de creación de su cuenta le reenviamos su código de confirmación: "+ codeConfirmation;
            await sendEmail(email,title,message);
            response.status(StatusCodes.OK).json({message:ReasonPhrases.OK});
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

const postAccountEmail = async (request, response) => {
    const {email, title, message} = request.body;
    await sendEmail(email, title, message)
    .then(async (information) =>{  
        response.status(StatusCodes.OK).json({message:ReasonPhrases.OK});
    })
    .catch(function (error){
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({path: error.path, message:ReasonPhrases.INTERNAL_SERVER_ERROR});
    });
}

const sendEmail = async (toEmail, subject, content) => {
    const transport = nodemailer.createTransport ({
        host: process.env.HOST,
        port: process.env.PORT_EMAIL,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASSWORD
        }
    });
    await transport.sendMail({
        from: '"Biziidi Diidxazá " <'+process.env.USER_EMAIL+'>',
        to: toEmail,
        subject: subject,
        text: content
    })
}

module.exports = {sendEmail, postAccountEmail, postEmail}