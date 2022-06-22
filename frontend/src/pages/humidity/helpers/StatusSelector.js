import green from "assets/images/leds/green.gif";
import red from "assets/images/leds/red.gif";

/* eslint-disable no-else-return */
function StatusSelector({ data }) {
  if (data.datasets[4]) {
    let Result;
    const value = [];
    let o;
    const lengthData = data.datasets[0].data.length - 1;
    const lengthSets = data.datasets.length - 1;
    const min = parseFloat(data.datasets[lengthSets].data[0]);
    const max = parseFloat(data.datasets[lengthSets - 1].data[0]);
    // eslint-disable-next-line no-unused-expressions
    data.datasets[0] === "GENERAL" ? (o = 3) : (o = 1);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < o; i++) {
      value[i] = parseFloat(data.datasets[i].data[lengthData]);
      if (value[i] >= max || value[i] <= min) {
        Result = <img src={red} width="6%" height="5%" alt="red" />;
        return Result;
      } else {
        Result = <img src={green} width="5%" height="5%" alt="red" />;
      }
    }
    return Result;
  }
  return "...";
}

export default StatusSelector;
