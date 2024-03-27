const {Schema, model} = require('mongoose')

const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Tiene que ser unico, no puede repetirse
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = model('User', UserSchema);