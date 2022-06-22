partTransform = (values, controlmin, controlmax, minlimit, maxlimit) => {

    let datatest = {
        labels: [],
        datasets: [
            {
                label: "GENERAL",
                color: "success",
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
        if(values[i].sensor === "GENERAL") {
            datatest.labels.push(values[i].time);
        }
        if(values[i].sensor === "GENERAL") {
            datatest.datasets[0].data.push(values[i].data);
        }

        datatest.datasets[1].data.push(maxlimit);
        datatest.datasets[2].data.push(controlmin);
        datatest.datasets[3].data.push(controlmax);
        datatest.datasets[4].data.push(minlimit);
    }

    return datatest;
};

module.exports = { partTransform };