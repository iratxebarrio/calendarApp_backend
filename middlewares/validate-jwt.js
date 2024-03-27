
const {response} = require('express')
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    // x-token en headers de postman
    const token = req.header('x-token')
    
    // Validar
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const payload = jwt.verify(
            token, 
            process.env.JWT_SIGNING_KEY 
        );
            // En todas las rutas que hagamos la validación obtendremos el uid y el name
        req.uid = payload.uid;
        req.name = payload.name;
      
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next()

}

module.exports = {validateJWT}