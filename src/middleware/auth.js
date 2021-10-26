const {verifyToken} = require("../helpers/generateToken");
const {StatusCodes} = require ("http-status-codes");


const checkAuth = async (request, response, next) => {
    let token = request.headers.authorization;
    if(!token){
        return response.status(StatusCodes.UNAUTHORIZED).json({message: "Requiere un token de acceso para poder usar esta funcionalidad"});
    }
    await verifyToken(token)
    .then((tokenData) => {
        if (tokenData._id) {
            return next();
        } else {
            return response.status(StatusCodes.FORBIDDEN).json({message: "No tiene permiso para realizar esta funcionalidad"});
        }
    })
    .catch ((error) => {
        if(error.message === "jwt expired"){
            return response.status(StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE).json({message: "Se agotado se tiempo en el sistema, por favor vuelva a iniciar sesión"});
        }
        return response.status(StatusCodes.UNAUTHORIZED).json({message: "El token no es válido"});
    });
};

module.exports = checkAuth;