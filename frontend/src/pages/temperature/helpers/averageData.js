const averageData = (data) => {
  const lengthData = data.datasets[0].data.length - 1;
  const lastAOIData = parseFloat(data.datasets[1].data[lengthData]);
  const lastXRAYData = parseFloat(data.datasets[2].data[lengthData]);
  const lastFISData = parseFloat(data.datasets[3].data[lengthData]);

  let result = (lastAOIData + lastXRAYData + lastFISData) / 3;
  result = result.toFixed(2);

  return result;
};

module.exports = { averageData };
