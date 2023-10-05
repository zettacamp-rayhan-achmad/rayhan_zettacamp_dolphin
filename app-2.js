const moment = require('moment');

function displayDateTime(dateString, dateTimeObject) {
    // 1. Display the current date and time
    const currentDateTime = moment();
    console.log('1. Current date & time:', currentDateTime.format('YYYY-MM-DD HH:mm:ss'));

    // 2. Display the date and time parsed from string
    const parsedDateTimeFromString = moment(dateString);
    console.log('2. from parameter string:', parsedDateTimeFromString.format('YYYY-MM-DD HH:mm:ss'));

    // 3. Display the date and time from object

    const combinedMoment = moment(`${dateTimeObject.date} ${dateTimeObject.time}`);
    console.log('3. from parameter object', combinedMoment.format('YYYY-MM-DD HH:mm:ss'));

    // 4. Display the current date and time in UTC
    const currentUtcDateTime = moment.utc();
    console.log('4. Current date & time on UTC:', currentUtcDateTime.format('YYYY-MM-DD HH:mm:ss'));

    // 5. Validate the provided date string
    const validDateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!validDateFormat.test(dateString)) {
        console.log('5. date of string invalid format');
    } else {
        const isValidDate = parsedDateTimeFromString.isValid();
        const invalidAt = parsedDateTimeFromString.invalidAt();

        if (isValidDate === false) {
            console.log('5. Result of validation:', isValidDate, 'invalid at', invalidAt);
            console.log('please input the valid date string');
        } else {
            console.log('5. Result of validation:', isValidDate);
            console.log('date of string is valid');
        }
    }
}

const dateString = '2020-11-51';
const dateTimeObject = {
    date: '2021-11-02',
    time: '15:20:10',
};
displayDateTime(dateString, dateTimeObject);
