const axios = require('axios');
const moment = require('moment');

const main = async () => {

    async function makePostRequest(temp) {

        moment.locale('MT');
    
        let now = moment().format('h:mm:ss');
    
        /// let payload = { sensor: "1", time: now, data: temp };

         if( temp > 27 || temp < 23 ) {
         let payload2 = { Title: "Temperature SMT", Message: `The temperature at IMX3 it's about ${ temp }C.`, Type: "Temperature" };
         let res2 = await axios.post('https://connect.signl4.com/webhook/yr5h1gg57q', payload2);
         let data2 = res2.data;
         console.log(data2);
         };

        // let res = await axios.post('http://smt.cesoft.xyz/temp', payload);
    
        // let data = res.data;
        // console.log(data);
    }

    const sleep = async () => new Promise((resolve) => setTimeout(resolve, 5000))

    do {
        let temp = Math.round(Math.random() * ( 30 - 20 ) + 20);
        await makePostRequest(temp);
        await sleep();
    } while (1);
    
}

main();
