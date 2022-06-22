const { response, request } = require('express');
const { info } = require('winston');
const { logger } = require('../libs/logger');
const { Temp } = require('../models');
const { dataTransform } = require('../helpers/dataTransform');

const tempGet = async(req = request, res = response) => {
    logger.verbose('[Temp, tempGet]', 'Get Temperature List');
    let page = req.query.page || 1;
    const { limit = 48 } = req.query;
    page = page - 1;
    const since = page * 10;
    let temps = [];

    let query = { sensor: "AOI", type: "temperature" };
    let [total, temp] = await Promise.all([
        Temp.countDocuments(),
        Temp.find(query).populate('sensor', '-__v')
        //.skip(Number(since))
        .limit(Number(limit))
        .sort({ "_id" : -1}),
    ])

    temps = [...temps, ...temp.reverse()];

    query = { sensor: "XRAY", type: "temperature" };
        [total, temp] = await Promise.all([
        Temp.countDocuments(),
        Temp.find(query).populate('sensor', '-__v')
        //.skip(Number(since))
        .limit(Number(limit))
        .sort({ "_id" : -1}),
    ])

    temps = [...temps, ...temp.reverse()];

    query = { sensor: "FIS", type: "temperature" };
    [total, temp] = await Promise.all([
    Temp.countDocuments(),
    Temp.find(query).populate('sensor', '-__v')
    //.skip(Number(since))
    .limit(Number(limit))
    .sort({ "_id" : -1}),
    ])

    temps = [...temps, ...temp.reverse()];

    let data2 = dataTransform(temps, 18, 28, 20, 30);

    logger.info('[Temp, tempGet]', 'Temp Get Succesfully')
    logger.debug(`Total Temps: ${total}`)
    res.json({ total, data2 });
};

const temptableGet = async(req = request, res = response) => {
    logger.verbose('[Temp, tempGet]', 'Get Temperature List');
    let page = req.query.page || 1;
    const { limit = 10 } = req.query;
    page = page - 1;
    const since = page * 10;

    let query = { sensor: "AOI" };
    const [total, temps] = await Promise.all([
        Temp.countDocuments(),
        Temp.find(query).populate('sensor', '-__v')
        .skip(Number(since))
        .limit(Number(limit)),
    ])

    logger.info('[Temp, tempGet]', 'Temp Get Succesfully')
    logger.debug(`Total Temps: ${total}`)
    res.json({ total, temps });
};

const tempPost = async(req, res = response) => {
    logger.verbose('[Temp, tempPost]', 'Post Temperature)')
    const { sensor, time, data, date, type } = req.body;
    const temp = new Temp({ sensor, time, data, date, type });

    temp.save()
        .then((response) => {
            logger.debug(response);
            //res.json(response); // Si de respuesta queremos mandar lo que se escribio
            res.json("Succesfully Writed!")
        })
        .catch(err => {
            logger.error('[Temp,TempPost]', err)
            res.status(501).json(dataBase)
        })
}

module.exports = {
    tempGet,
    temptableGet,
    tempPost
}