const { response, request } = require('express');
const { info } = require('winston');
const { logger } = require('../libs/logger');
const { Temp } = require('../models')

const tempGet = async(req = request, res = response) => {
    logger.verbose('[Temp, tempGet]', 'Get Temperature List');
    //let page = req.query.page || 1;
    //const { limit = 10 } = req.query;
    //page = page - 1;
    //const since = page * 10;
    //const query = { status: true };
    const [total, temps] = await Promise.all([
        Temp.countDocuments(),
        Temp.find()//.populate('role', '-__v')
        //.skip(Number(since))
        //.limit(Number(limit)),
    ])

    tempsTransform = (temps) => {

        let datatest = {
            labels: [],
            datasets: [
                {
                    label: "Sensor 1",
                    color: "success",
                    data: []
                },
                {
                    label: "Max Limit",
                    color: "info",
                    data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
                    fill: true,
                    backgroundColor: "info"
                },
                {
                    label: "Min Limit",
                    color: "info",
                    data: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                },
                {
                    label: "Max Control",
                    color: "warning",
                    data: [28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
                },
                {
                    label: "Min Control",
                    color: "warning",
                    data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
                },
            ]
        }

        let value = temps.length;
        for( let i = value-47; i < value; i++ ) {
            datatest.labels.push(temps[i].time);
            datatest.datasets[0].data.push(temps[i].data);
        }
        
        return datatest;
    };

    let data2 = tempsTransform(temps);

    logger.info('[Temp, tempGet]', 'Temp Get Succesfully')
    logger.debug(`Total Temps: ${total}`)
    res.json({ total, data2 });
};

const tempPost = async(req, res = response) => {
    logger.verbose('[Temp, tempPost]', 'Post Temperature)')
    const { sensor, time, data } = req.body;
    const temp = new Temp({ sensor, time, data });

    temp.save()
        .then((response) => {
            logger.debug(response);
            res.json(response)
        })
        .catch(err => {
            logger.error('[Temp,TempPost]', err)
            res.status(501).json(dataBase)
        })
}

module.exports = {
    tempGet,
    tempPost
}