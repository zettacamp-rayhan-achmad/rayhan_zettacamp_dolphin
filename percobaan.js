const moment = require('moment');

const currentDateTime = moment();
console.log('Current date & time:', currentDateTime.format('YYYY-MM-DD HH:mm:ss'));

const currentUtcDateTime = moment.utc();
console.log('Current date & time on UTC:', currentUtcDateTime.format('YYYY-MM-DD HH:mm:ss'));

const dateString = '2023-10-05 15:30:00';
const parsedDateFromString = moment(dateString);
console.log('Parsed date from string:', parsedDateFromString.format('YYYY-MM-DD HH:mm:ss'));

const dateObj = new Date('2023-10-05T15:30:00');
const parsedDateFromObject = moment(dateObj);
console.log('Parsed date from object:', parsedDateFromObject.format('YYYY-MM-DD HH:mm:ss'));

const invalidDateString = '2023-13-35';
const validDateString = '2023-10-05';

const isValidInvalid = moment(invalidDateString, 'YYYY-MM-DD').isValid();
const isValidValid = moment(validDateString, 'YYYY-MM-DD').isValid();

console.log('Validation result for invalid date string:', isValidInvalid); // false
console.log('Validation result for valid date string:', isValidValid); // true
