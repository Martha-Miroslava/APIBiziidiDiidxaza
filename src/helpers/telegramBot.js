const {Telegraf} = require('telegraf');

const  bot  =  new  Telegraf ( process.env.TOKEN_TELEGRAM) ;


const sendToTelegram = async (exception) => {
    bot.telegram.sendMessage(exception,process.env.ID_GROUP);
}

module.exports = { sendToTelegram }