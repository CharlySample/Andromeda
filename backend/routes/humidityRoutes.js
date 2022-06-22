const { Router } = require('express');
const { check } = require('express-validator');

const { validationFields } = require('../middlewares/validation-fields');

const { humis } = require('config').get('routes');

//Controllers
const { humiGet, humitableGet, humiPost } = require('../controllers/humidityController');
//middlewares

//Validaciones

//Ruta de Usuarios
const router = Router();
////////////////////////////////////Get////////////////////////////////////
router.get('/', 
    validationFields
, humiGet);

router.get('/table', 
    validationFields
, humitableGet);

///////////////////////////////////POST////////////////////////////////////
router.post('/', [
    check('sensor', 'The location is required').notEmpty(),
    check('time', 'The time is required').notEmpty(),
    check('data', 'The value is required').isNumeric(),
    validationFields
], humiPost);

module.exports = router;