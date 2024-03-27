const {Schema, model} = require('mongoose')

const EventSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        //Esto relaciona este user con el Schema de User.js
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

EventSchema.method('toJSON', function() {
    // Estraemos la __v y _id y el resto vendrá como un objeto
    // Ahora en postman no aparecerá __v y en vez de aparecer _id aparecerá id
    const {__v, _id, ...object} = this.toObject()
    object.id = _id;
    return object
} )

module.exports = model('Event', EventSchema);