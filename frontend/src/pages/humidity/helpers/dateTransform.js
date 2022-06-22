const moment = require("moment");

const dateTransform = (values) => {
  // eslint-disable-next-line prefer-const
  let size = values.labels.length;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < size; i++) {
    // eslint-disable-next-line prefer-const
    let date = moment(values.labels[i]).format("D/M H:mm");
    // eslint-disable-next-line no-param-reassign
    values.labels[i] = date;
  }
  return values;
};

module.exports = { dateTransform };
