const { Router } = require('express');
const { check } = require('express-validator');

const { validationFields } = require('../middlewares/validation-fields');

const { temps } = require('config').get('routes');

//Controllers
const { tempGet, temptableGet, tempPost } = require('../controllers/temperatureController');
//middlewares
// const { UserRole, permission } = require('../middlewares/RoleValidation');
// const { validationFields } = require('../middlewares/validation-fields');
// const { jwtValidation } = require('../middlewares/webtokenValidation');
//Validaciones

//Ruta de Usuarios
const router = Router();
////////////////////////////////////Get////////////////////////////////////
router.get('/', 
    //jwtValidation,
    //permission(readPermissions, users),
    validationFields
, tempGet);

router.get('/table', 
    //jwtValidation,
    //permission(readPermissions, users),
    validationFields
, temptableGet);

///////////////////////////////////POST////////////////////////////////////
router.post('/', [
    check('sensor', 'The location is required').notEmpty(),
    check('time', 'The time is required').notEmpty(),
    check('data', 'The value is required').isNumeric(),
    validationFields
], tempPost);

//router.get('/auth', [
//   jwtValidation,
//   validationFields
//, userAuthGet);

module.exports = router;