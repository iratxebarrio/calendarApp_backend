
const jwt = require('jsonwebtoken');

const generateJWT = async(uid, name) => {
    let generateToken;
    await new Promise((resolve, reject) => {

        const payload = {uid, name}

        //Firma del token
        jwt.sign(payload, process.env.JWT_SIGNING_KEY, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err) {
                console.log(err)
                reject('No se pudo generar el token')
            }
            resolve(token)
        })

    }) .then((token) => {
        generateToken = token;
    })
    return generateToken;

}

module.exports = {generateJWT}