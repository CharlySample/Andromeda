const { response, request } = require('express');
const { info } = require('winston');
const { logger } = require('../libs/logger');
const { Humi } = require('../models');
const { dataTransform } = require('../helpers/dataTransform');

const humiGet = async(req = request, res = response) => {
    logger.verbose('[Humi, humiGet]', 'Get Humidity List');
    let page = req.query.page || 1;
    const { limit = 48 } = req.query;
    page = page - 1;
    const since = page * 10;
    let humis = [];

    let query = { sensor: "AOI", type: "humidity" };
    let [total, humi] = await Promise.all([
        Humi.countDocuments(),
        Humi.find(query).populate('sensor', '-__v')
        //.skip(Number(since))
        .limit(Number(limit))
        .sort({ "_id" : -1}),
    ])

    humis = [...humis, ...humi.reverse()];

    query = { sensor: "XRAY", type: "humidity" };
        [total, humi] = await Promise.all([
        Humi.countDocuments(),
        Humi.find(query).populate('sensor', '-__v')
        //.skip(Number(since))
        .limit(Number(limit))
        .sort({ "_id" : -1}),
    ])

    humis = [...humis, ...humi.reverse()];

    query = { sensor: "FIS", type: "humidity" };
    [total, humi] = await Promise.all([
    Humi.countDocuments(),
    Humi.find(query).populate('sensor', '-__v')
    //.skip(Number(since))
    .limit(Number(limit))
    .sort({ "_id" : -1}),
    ])

    humis = [...humis, ...humi.reverse()];

    let data2 = dataTransform(humis, 28, 58, 30, 60);

    logger.info('[Humi, humiGet]', 'Humi Get Succesfully')
    logger.debug(`Total Humis: ${total}`)
    res.json({ total, data2 });
};

const humitableGet = async(req = request, res = response) => {
    logger.verbose('[Humi, humiGet]', 'Get Humidity List');
    let page = req.query.page || 1;
    const { limit = 48 } = req.query;
    page = page - 1;
    const since = page * 10;

    let query = { sensor: "AOI" , type: "humidity" };
    const [total, humis] = await Promise.all([
        Humi.countDocuments(),
        Humi.find(query).populate('sensor', '-__v')
        .skip(Number(since))
        .limit(Number(limit)),
    ])

    // let data2 = tempsTransform(temps);

    logger.info('[Humi, humiGet]', 'Humi Get Succesfully')
    logger.debug(`Total Humis: ${total}`)
    res.json({ total, humis });
};

const humiPost = async(req, res = response) => {
    logger.verbose('[Humi, humiPost]', 'Post Humidity)')
    const { sensor, time, data, date, type } = req.body;
    const humi = new Humi({ sensor, time, data, date, type });

    humi.save()
        .then((response) => {
            logger.debug(response);
            //res.json(response); // Si de respuesta queremos mandar lo que se escribio
            res.json("Succesfully Writed!")
        })
        .catch(err => {
            logger.error('[Humi,HumiPost]', err)
            res.status(501).json(dataBase)
        })
}

module.exports = {
    humiGet,
    humitableGet,
    humiPost
}