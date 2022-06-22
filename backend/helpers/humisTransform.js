humisTransform = (humis) => {

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

    let value = humis.length;
    for( let i = 0; i < value; i++ ) {
        if(humis[i].sensor === "AOI") {
            datatest.labels.push(humis[i].time);
        }
        if(humis[i].sensor === "AOI") {
            datatest.datasets[0].data.push(humis[i].data);
        }
        else if(humis[i].sensor === "XRAY") {
            datatest.datasets[1].data.push(humis[i].data);
        }
        else if(humis[i].sensor === "FIS") {
            datatest.datasets[2].data.push(humis[i].data);
        }

        datatest.datasets[3].data.push(60);
        datatest.datasets[4].data.push(28);
        datatest.datasets[5].data.push(58);
        datatest.datasets[6].data.push(30);
    }

    return datatest;
};

module.exports = { humisTransform };