/*
    Events Routes
    /api/events
*/ 

const { Router } = require("express");
const {validateJWT} = require('../middlewares/validate-jwt')

const router = Router();
const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');
const { check } = require("express-validator");
const { fieldsValidate } = require("../middlewares/fields-validate");


router.use(validateJWT); // Cualquier petición debajo de este router.use debe aplicar validateJWT

router.get('/', getEvents)

router.post('/',[
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').isDate(),
    check('end', 'La fecha de finalización es obligatoria').isDate(),
    fieldsValidate
],  createEvent )

router.put('/:id',
[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').isDate(),
    check('end', 'La fecha de finalización es obligatoria').isDate(),
    fieldsValidate
],
updateEvent )

router.delete('/:id', deleteEvent )

module.exports = router;
