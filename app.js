const moment = require('moment');

function displayDateTime(dateString) {
    const plusTwoHours = moment(dateString, 'YYYY-MM-DD HH:mm:ss').add(2, 'hours');
    console.log('a. +2 hours:', plusTwoHours.format('DD-MM-YYYY HH:mm:ss'));

    const plusFiveDay = moment(dateString, 'YYYY-MM-DD HH:mm:ss').add(5, 'days');
    console.log('b. +5 days:', plusFiveDay.format('DD-MM-YYYY HH:mm:ss'));

    const plusOneWeek = moment(dateString, 'YYYY-MM-DD HH:mm:ss').add(1, 'weeks');
    console.log('c. +1 week:', plusOneWeek.format('DD-MM-YYYY HH:mm:ss'));

    const minFiveDay = moment(dateString, 'YYYY-MM-DD HH:mm:ss').subtract(5, 'days');
    console.log('d. -5 days:', minFiveDay.format('DD-MM-YYYY HH:mm:ss'));

    const startOfWeek = moment(dateString, 'YYYY-MM-DD HH:mm:ss').startOf('week');
    const endOfMonth = moment(dateString, 'YYYY-MM-DD HH:mm:ss').endOf('month');
    console.log('e. start of week:', startOfWeek.format('DD-MM-YYYY HH:mm:ss'));
    console.log('f. end of month:', endOfMonth.format('DD-MM-YYYY HH:mm:ss'));
}

const dateString = '2023-10-06';
displayDateTime(dateString);
