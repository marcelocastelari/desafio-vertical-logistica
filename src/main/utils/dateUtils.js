const moment = require('moment');

const formatData = (data, format) => {
    return moment(data).format(format);
}

module.exports = { formatData };