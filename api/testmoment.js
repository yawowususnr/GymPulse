var moment = require('moment');
// Example ISO 8601 date
const isoDate = "2024-05-01T14:30:00Z";

// Format the date to HH:mm
const formattedTime = moment(isoDate).format('HH:mm');

console.log(formattedTime);