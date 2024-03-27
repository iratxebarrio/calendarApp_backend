const {response} = require('express')

const {generateJWT} = require('../helpers/jwt')
const Event = require('../models/Event')

const getEvents = async(req, res = response) => {
    
    const events = await Event.find()
  .populate('user', 'name') // trae la info del user, en este caso name y el id que viene siempre
    try {
       res.status(200).json({
        ok: true,
        events
       })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hay errores'
        })
    }
}
const createEvent = async (req, res = response) => {
    // verificar que tenga el evento --> console.log(req.body)

    const event = new Event(req.body) 
    console.log(req)

    try {
        event.user = req.uid; // Traemos el id
        const saveEvent = await event.save() 
       res.status(200).json({
        ok: true,
        event: saveEvent
       })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateEvent = async(req, res = response) => {

    const eventsId = req.params.id;


    try {
    const event = await Event.findById(eventsId);
    const uid = req.uid;

    if(!event) {
         return res.status(404).json({
            ok: false,
            msg: 'Evento no existe con ese id'
        })
    }

    if(event.user.toString() != uid){
        return res.status(401).json({
            ok: false,
            msg: 'No tiene acceso para editar este evento'
        })

    }
    const newEvent = {
        ...req.body,
        user: uid
    }

    const eventUpdated = await Event.findByIdAndUpdate(eventsId, newEvent, {new: true}) // Actualizar el evento
    console.log(eventUpdated)

       res.status(200).json({
        ok: true,
        event: eventUpdated
       })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {
        
        const eventToDelete = await Event.findById(eventId)

        if(!eventToDelete) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento con el id proporcionado.'
            })
        }
        if(eventToDelete.user.toString() != uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene acceso para eliminar este evento'
            })
        }
        await Event.findByIdAndDelete(eventId)

       res.status(200).json({
        ok: true
       })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hay errores'
        })
    }
}



module.exports = {getEvents, createEvent, updateEvent, deleteEvent}