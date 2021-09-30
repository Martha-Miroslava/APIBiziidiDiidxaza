const {ResponseREST} = require('./responses');

const jsonErrors = async(codeResult) => {
    /** This function resturns a JSON with information on errors 400, 500, 409 and 404 */
    const result = {message: 'Los datos que ingresó son inválidos, por favor ingrese datos correctos'};
    if(codeResult == ResponseREST.SERVER_ERROR){
        result = {message: 'Problema de conexión, intente más tarde'};
    }
    else{
        if(codeResult == ResponseREST.INVALID_REQUEST){
            result = {message: 'Solicitud inválida, ya hay un registro con de este tipo registrado '};
        }
        else{
            if(codeResult == ResponseREST.NOT_FOUND){
                result = {message: 'No se encontró ningun registro'};
            }
        }
    }
    return result;
}

const jsonTokenErrors = async(codeResult) => {
    /** This function resturns a JSON with information on errors 401 and 419 */
    const result = {message: 'Requiere un token de acceso para poder usar esta funcionalidad'};
    if(codeResult == ResponseREST.TIME_OUT){
        result = {message: 'Se agotado el tiempo en el sistema, por favor vuelva a iniciar sesión'};
    }
    return result;
}

const jsonNotAuthorized = async() => {
    /** This function resturns a JSON with information on error 403 */
    return {message: 'No tiene permiso para realizar esta funcionalidad'};
}

module.exports = { jsonNotAuthorized, jsonTokenErrors,  jsonErrors};