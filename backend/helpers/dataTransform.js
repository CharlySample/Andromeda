const moment = require('moment')

dataTransform = (values, controlmin, controlmax, minlimit, maxlimit) => {

    let datatest = {
        labels: [],
        datasets: [
            {
                label: "AOI",
                color: "success",
                data: []
            },
            {
                label: "XRAY",
                color: "info",
                data: []
            },
            {
                label: "FIS",
                color: "light",
                data: []
            },
            {
                label: "Max Limit",
                color: "error",
                data: [],
                fill: true,
            },
            {
                label: "Min Limit",
                color: "error",
                data: [],
            },
            {
                label: "Max Control",
                color: "warning",
                data: [],
            },
            {
                label: "Min Control",
                color: "warning",
                data: [],
            },
        ]
    }

    let value = values.length;
    for( let i = 0; i < value; i++ ) {
        if(values[i].sensor === "AOI") {
            // let date = moment(values[i].time).format("D/M H:mm")
            datatest.labels.push(values[i].time);
        }
        if(values[i].sensor === "AOI") {
            datatest.datasets[0].data.push(values[i].data);
        }
        else if(values[i].sensor === "XRAY") {
            datatest.datasets[1].data.push(values[i].data);
        }
        else if(values[i].sensor === "FIS") {
            datatest.datasets[2].data.push(values[i].data);
        }

        datatest.datasets[3].data.push(maxlimit);
        datatest.datasets[4].data.push(controlmin);
        datatest.datasets[5].data.push(controlmax);
        datatest.datasets[6].data.push(minlimit);
    }

    return datatest;
};

module.exports = { dataTransform };