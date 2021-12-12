const {verifyToken} = require("../helpers/GenerateToken");
const accounts = require("../models/Accounts");
const {StatusCodes} = require ("http-status-codes");
const {responseGeneral} = require("../helpers/ResponseResult");
const {logError} = require("../helpers/LogError");

const checkRoleAuth = (roles) => async (request, response, next) => {
    const token = request.headers.authorization;
    await verifyToken(token)
    .then(async (tokenData) => {
        const accountData = await accounts.findById(tokenData._id);
        if ([].concat(roles).includes(accountData.role)) {
            return next();
        } else {
            return responseGeneral(response, StatusCodes.UNAUTHORIZED, "No tiene permiso para realizar esta funcionalidad");
        }
    })
    .catch ((error) => {
        logError(error);
        return responseGeneral(response, StatusCodes.INTERNAL_SERVER_ERROR, "No se pudo validar la autorización del token");
    });
};

module.exports = checkRoleAuth;