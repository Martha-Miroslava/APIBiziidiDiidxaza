const Accounts = require("../models/Accounts");
const {StatusCodes} = require ("http-status-codes");
const {generateCode} = require("../helpers/GenerateCode");
const nodemailer = require("nodemailer");
const {responseServer, responseGeneral} = require("../helpers/ResponseResult");

const postEmail = async (request, response) => {
    const email = request.body.email;
    let codeConfirmation = generateCode();
    Accounts.findOne({email:email}, {_id:1, name:1, lastname:1})
    .then(async (account) => {  
        if(account){
            await Accounts.updateOne({_id:account._id}, {codeConfirmation:codeConfirmation});
            const title = "Código de Confirmación de la cuenta";
            const message = "Estimado usuario "+account.name+" "+account.lastname+
            " para terminar el proceso de creación de su cuenta le reenviamos su código de confirmación: "+ codeConfirmation;
            await sendEmail(email,title,message);
            responseGeneral(response, StatusCodes.CREATED, "El código de confirmación se reenvio exitosamente");
        }
        else{
            responseGeneral(response, StatusCodes.NOT_FOUND, "No se encontro la cuenta");
        }
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

const postAccountEmail = async (request, response) => {
    const {email, title, message} = request.body;
    await sendEmail(email, title, message)
    .then(async (information) => {  
        responseGeneral(response, StatusCodes.CREATED, "El mensaje se envio exitosamente");
    })
    .catch(function (error){
        responseServer(response, error);
    });
};

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
        to: toEmail, subject: subject, text: content
    });
};

module.exports = {sendEmail, postAccountEmail, postEmail};