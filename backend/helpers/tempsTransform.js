tempsTransform = (temps) => {

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

    // let value = temps.length/3;
    // for( let i = 0; i < value; i++ ) {
    //     datatest.labels.push(temps[i].time);
    //     for( let o = 0; o <= 2; o++ ) {
    //         datatest.datasets[o].data.push(temps[(i+(10 * o))].data);
    //     }
    //     datatest.datasets[3].data.push(30);
    //     datatest.datasets[4].data.push(18);
    //     datatest.datasets[5].data.push(28);
    //     datatest.datasets[6].data.push(20);
    // }

    let value = temps.length;
    for( let i = 0; i < value; i++ ) {
        if(temps[i].sensor === "AOI") {
            datatest.labels.push(temps[i].time);
        }
        if(temps[i].sensor === "AOI") {
            datatest.datasets[0].data.push(temps[i].data);
        }
        else if(temps[i].sensor === "XRAY") {
            datatest.datasets[1].data.push(temps[i].data);
        }
        else if(temps[i].sensor === "FIS") {
            datatest.datasets[2].data.push(temps[i].data);
        }

        datatest.datasets[3].data.push(30);
        datatest.datasets[4].data.push(18);
        datatest.datasets[5].data.push(28);
        datatest.datasets[6].data.push(20);
    }

    return datatest;
};

module.exports = { tempsTransform };