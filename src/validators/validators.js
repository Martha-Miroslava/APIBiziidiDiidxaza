const  { check }  =  require ( 'express-validator' )
//const  { validateResult }  =  require ( '../helpers/validateHelper' )

const validationAccount = [
    check('username')
        .exists()
        .not()
        .isLength({ min: 5 })
        .isEmpty(),
    check('password')
        .exists()
        .isNumeric(),
    (req, res, next) => {
        //validateResult(req, res, next) Validación
    }
]


module.exports = {
    validationAccount
};