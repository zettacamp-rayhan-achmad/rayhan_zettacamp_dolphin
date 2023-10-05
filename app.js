const moment = require('moment');

function displayDateTimeInfo(dateString, dateTimeObj) {
   // 1. Display the current date and time
   const currentDateTime = moment();
   console.log('1. Current date & time:', currentDateTime.format('YYYY-MM-DD HH:mm:ss'));

   // 2. Display the date and time parsed from the provided date string
   const parsedDateTimeFromString = moment(dateString, 'YYYY-MM-DD HH:mm:ss');
   console.log('2. Date & time from parameter string of date:', parsedDateTimeFromString.format('YYYY-MM-DD HH:mm:ss'));

   // 3. Display the date and time from the provided date & time object
   console.log('3. Date & time from parameter object of date & time:', dateTimeObj.format('YYYY-MM-DD HH:mm:ss'));

   // 4. Display the current date and time in UTC
   const currentUtcDateTime = moment.utc();
   console.log('4. Current date & time on UTC:', currentUtcDateTime.format('YYYY-MM-DD HH:mm:ss'));

   // 5. Validate the provided date string
   const isValidDate = parsedDateTimeFromString.isValid();
   console.log('5. Result of validation when checking parameter string of date:', isValidDate);
}

// Example usage:
const dateString = '2023-10-05 15:30:00';
const dateTimeObj = moment('2023-10-05 15:30:00', 'YYYY-MM-DD HH:mm:ss'); // Example date & time object
displayDateTimeInfo(dateString, dateTimeObj);
