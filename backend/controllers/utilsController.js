const { response, request } = require('express');
const { Attachment, User } = require('../models');
const path = require('path');
const fs = require('fs');
const { logger } = require('../libs/logger');
const { dataBase, entityNoExists, entityDelete, entityCreate, entityUpdate, paramsError } = require('config').get('message');

const newAttachmentUser = async(req = request, res = response) => {
    logger.verbose('[Utils, newAttachmentUser]', 'Add new Attachment to a user');
    try {
        const file = req.file;
        const { userId } = req.params;
        const { name, category } = req.body;

        logger.debug(name, category)
        logger.debug(file);

        const attachmentData = {
            name,
            category,
            fileType: file.filename.split('.')[1],
            file: file.path,
            createdBy: req.user._id
        }
        const attachment = await new Attachment(attachmentData)
        await attachment.save();

        const user = await User.findById(userId)
        user.attachments.push(attachment._id)
        await user.save();

        res.json(entityCreate);
    } catch (error) {
        logger.error('[Utils, newAttachmentUser]', error)
        res.json(dataBase)
    }
};

const getAttachment = async(req = request, res = response) => {
    logger.verbose('[Utils, getAttachment]', 'download Attachment ');

    const { fileId } = req.params;
    const attachment = await Attachment.findById(fileId)
    const filePath = `${__dirname}${path.sep}..${path.sep}${attachment.file}`;
    logger.info(filePath);

    try {
        fs.access(filePath, error => {
            if (error) {
                logger.error(error)
                res.status(404).json(paramsError)
            } else {
                logger.debug(filePath)
                res.sendFile(path.resolve(filePath));
            }
        })
    } catch (error) {
        logger.error(error)
        res.status(501).json(dataBase);
    }
};




module.exports = {
    newAttachmentUser,
    getAttachment
}