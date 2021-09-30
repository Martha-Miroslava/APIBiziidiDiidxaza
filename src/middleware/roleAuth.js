const { verifyToken } = require('../helpers/generateToken');
const accounts = require('../models/accounts');
const {sendToTelegram} = require('../helpers/telegramBot');
const {jsonErrors, jsonNotAuthorized} = require('../helpers/exception-responses');
const {ResponseREST} = require('../helpers/responses');

const checkRoleAuth = (roles) => async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        const accountData = await accounts.findById(tokenData._id);

        if ([].concat(roles).includes(accountData.role)) {
            next();
        } else {
            response.status(ResponseREST.NOT_AUTHORIZED).json(jsonNotAuthorized());
        }

    } catch (exception) {
        sendToTelegram(exception);
        response.status(ResponseREST.SERVER_ERROR).json(jsonErrors(ResponseREST.SERVER_ERROR));
    }
}

module.exports = checkRoleAuth;