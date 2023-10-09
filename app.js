const moment = require('moment');

function displayDateTime(firstDate, secondDate) {
    // 1
    const indonesianTimes = moment(firstDate);
    if (!indonesianTimes.isValid()) {
        return 'Invalid date';
    }
    const westIndonesianTimes = moment(indonesianTimes, 'DD-MM-YYYY HH:mm:ss').utcOffset(7 * 60);
    westIndonesianTimes.locale('id');
    console.log(westIndonesianTimes);
    console.log(westIndonesianTimes.format('dddd, DD MMMM YYYY [WIB] [UTC+7]'));

    // 2
    const firstDateMoment = moment(firstDate);
    const secondDateMoment = moment(secondDate);
    const differentiation = secondDateMoment.diff(firstDateMoment, 'week');
    console.log('difference', differentiation, 'weeks');

    // 3
    const sameOrAfter = moment(firstDate).isSameOrAfter(secondDate);
    console.log('is same or after: ', sameOrAfter);

    // 4
    const currentDate = moment().format('YYYY-MM-DD');
    const between = moment(currentDate).isBetween(firstDate, secondDate, undefined, '()');
    console.log('is between: ', between);
}

const firstDate = '2023-10-09';
const secondDate = '2023-11-09';
displayDateTime(firstDate, secondDate);
