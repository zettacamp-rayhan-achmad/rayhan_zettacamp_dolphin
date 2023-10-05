const moment = require('moment');

function displayDateTime(dateString, dateTimeObject) {
    // 1. Display the current date and time
    const currentDateTime = moment();
    console.log('1. Current date & time:', currentDateTime.format('YYYY-MM-DD HH:mm:ss'));

    // 2. Display the date and time parsed from string
    const parsedDateTimeFromString = moment(dateString);
    console.log('2. from parameter string:', parsedDateTimeFromString.format('YYYY-MM-DD HH:mm:ss'));

    // 3. Display the date and time from object
    console.log('3. from parameter object:', dateTimeObject.format('YYYY-MM-DD HH:mm:ss'));

    // 4. Display the current date and time in UTC
    const currentUtcDateTime = moment.utc();
    console.log('4. Current date & time on UTC:', currentUtcDateTime.format('YYYY-MM-DD HH:mm:ss'));

    // 5. Validate the provided date string
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

// Example usage:
const dateString = '2000-30-01';
const dateTimeObject = moment({ y: 2023, M: 10 - 1, d: 10, h: 15, m: 12, s: 12, ms: 123 });
displayDateTime(dateString, dateTimeObject);
