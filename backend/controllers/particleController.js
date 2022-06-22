const { response, request } = require('express');
const { info } = require('winston');
const { logger } = require('../libs/logger');
const { Part } = require('../models');
const { partTransform } = require('../helpers/partTransform');

const partGet = async(req = request, res = response) => {
    logger.verbose('[Part, partGet]', 'Get Particle List');
    let page = req.query.page || 1;
    const { limit = 48 } = req.query;
    page = page - 1;
    const since = page * 10;
    let parts = [];

    let query = { sensor: "GENERAL", type: "particles" };
    let [total, part] = await Promise.all([
        Part.countDocuments(),
        Part.find(query).populate('sensor', '-__v')
        //.skip(Number(since))
        .limit(Number(limit))
        .sort({ "_id" : -1}),
    ])

    parts = [...parts, ...part.reverse()];

    let data2 = partTransform(parts, 0, 25000, 0, 29700);

    logger.info('[Part, partGet]', 'Part Get Succesfully')
    logger.debug(`Total Parts: ${total}`)
    res.json({ total, data2 });
};

const parttableGet = async(req = request, res = response) => {
    logger.verbose('[Part, partGet]', 'Get Particle List');
    let page = req.query.page || 1;
    const { limit = 48 } = req.query;
    page = page - 1;
    const since = page * 10;

    let query = { sensor: "AOI" , type: "particle" };
    const [total, parts] = await Promise.all([
        Part.countDocuments(),
        Part.find(query).populate('sensor', '-__v')
        .skip(Number(since))
        .limit(Number(limit)),
    ])

    logger.info('[Part, partGet]', 'Part Get Succesfully')
    logger.debug(`Total Parts: ${total}`)
    res.json({ total, parts });
};

const partPost = async(req, res = response) => {
    logger.verbose('[Part, partPost]', 'Post Particle)')
    const { sensor, time, data, date, type } = req.body;
    const part = new Part({ sensor, time, data, date, type });

    part.save()
        .then((response) => {
            logger.debug(response);
            //res.json(response); // Si de respuesta queremos mandar lo que se escribio
            res.json("Succesfully Writed!")
        })
        .catch(err => {
            logger.error('[Part,HumiPost]', err)
            res.status(501).json(dataBase)
        })
}

module.exports = {
    partGet,
    parttableGet,
    partPost
}