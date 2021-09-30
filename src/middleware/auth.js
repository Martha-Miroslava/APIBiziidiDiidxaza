const { verifyToken } = require('../helpers/generateToken');
const {sendToTelegram} = require('../helpers/telegramBot');
const {jsonErrors, jsonNotAuthorized} = require('../helpers/exception-responses');
const {ResponseREST} = require('../helpers/responses');


const checkAuth = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        if (tokenData._id) {
            next();
        } else {
            response.status(ResponseREST.NOT_AUTHENTICATED).json(jsonNotAuthorized(ResponseREST.NOT_AUTHENTICATED));
        }
    } catch (exception) {
        response.status(ResponseREST.SERVER_ERROR).json(jsonErrors(ResponseREST.SERVER_ERROR));
        sendToTelegram(exception);
    }
}

module.exports = checkAuth;