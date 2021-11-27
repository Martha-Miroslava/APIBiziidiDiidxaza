const {verifyToken} = require("../helpers/generate-token");
const {StatusCodes} = require ("http-status-codes");
const {responseGeneral} = require("../helpers/response-result");
const {logError} = require("../helpers/log-error");

const checkAuth = async (request, response, next) => {
    let token = request.headers.authorization;
    if(!token){
        return responseGeneral(response, StatusCodes.UNAUTHORIZED, "Requiere un token de acceso para poder usar esta funcionalidad");
    }
    await verifyToken(token)
    .then((tokenData) => {
        if (tokenData._id) {
            return next();
        } else {
            return responseGeneral(response, StatusCodes.FORBIDDEN, "No tiene permiso para realizar esta funcionalidad");
        }
    })
    .catch ((error) => {
        if(error.message === "jwt expired"){
            return responseGeneral(response, StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE, "Se agotado su tiempo en el sistema, por favor vuelva a iniciar sesión");
        }
        logError(error);
        return responseGeneral(response, StatusCodes.UNAUTHORIZED, "El token no es válido");
    });
};

module.exports = checkAuth;