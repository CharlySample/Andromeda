const { Router } = require('express');
const { check } = require('express-validator');

const { validationFields } = require('../middlewares/validation-fields');

const { parts } = require('config').get('routes');

//Controllers
const { partGet, parttableGet, partPost } = require('../controllers/particleController');
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
, partGet);

router.get('/table', 
    //jwtValidation,
    //permission(readPermissions, users),
    validationFields
, parttableGet);

///////////////////////////////////POST////////////////////////////////////
router.post('/', [
    check('sensor', 'The location is required').notEmpty(),
    check('time', 'The time is required').notEmpty(),
    check('data', 'The value is required').isNumeric(),
    validationFields
], partPost);

//router.get('/auth', [
//   jwtValidation,
//   validationFields
//, userAuthGet);

module.exports = router;