const {verifyToken} = require("../helpers/generateToken");
const accounts = require("../models/accounts");
const {StatusCodes} = require ("http-status-codes");

const checkRoleAuth = (roles) => async (request, response, next) => {
    const token = request.headers.authorization;
    await verifyToken(token)
    .then(async (tokenData) => {
        const accountData = await accounts.findById(tokenData._id);
        if ([].concat(roles).includes(accountData.role)) {
            return next();
        } else {
            return response.status(StatusCodes.FORBIDDEN).json({message: "No tiene permiso para realizar esta funcionalidad"});
        }
    })
    .catch ((error) => {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "No se pudo validar la autorización del token"});
    });
}

module.exports = checkRoleAuth;