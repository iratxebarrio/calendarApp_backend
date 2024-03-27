const {response} = require('express')
const { validationResult } = require("express-validator");


const fieldsValidate = (req, res = response, next) => {
    // next es una function que se llama si todo el middleware se ejecuta correctamente.
    // Si next pasa correctamente todos los middlewares entonces pasará al controller
      // Control de errores
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
        ok: false,
        errors: errors.mapped(),
        });
    }
    next()
}

module.exports = {fieldsValidate };