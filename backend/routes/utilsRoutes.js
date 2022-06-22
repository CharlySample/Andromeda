const { Router } = require('express');
const { check } = require('express-validator');
const path = require('path');
const { v4 } = require('uuid');
//Default Data
const { roles } = require('config').get('routes');
const { createPermissions, updatePermissions, deletePermissions, readPermissions } = require('config').get('permissionType');
//Controlllers
const { newAttachmentUser, getAttachment } = require('../controllers/utilsController');
//Validator

//middlewares
const { permission } = require('../middlewares/RoleValidation');
const { validationFields } = require('../middlewares/validation-fields');
const { jwtValidation } = require('../middlewares/webtokenValidation');

//files
const multer = require('multer')
const storage = multer.diskStorage({
    destination: './assets',
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})
const uploadFile = multer({ storage, dest: './assets' })

const router = Router();
////////////////////////////////////Get////////////////////////////////////
router.get('/attachment/:fileId', [
    check('fileId', 'The User Id is required').isMongoId().notEmpty(),
    uploadFile.single('file'),
    validationFields
], getAttachment);

////////////////////////////////////POST///////////////////////////////////
router.post('/attachment/:userId', [
    jwtValidation,
    check('userId', 'The User Id is required').isMongoId().notEmpty(),
    uploadFile.single('file'),
    validationFields
], newAttachmentUser);

module.exports = router;