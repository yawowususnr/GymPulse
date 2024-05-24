import { parseISO, parseJSON  } from "date-fns";


function getRandomDateInRange(startDate, endDate, startHour, endHour) {
  const date = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
  const randomHour =
    Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
  date.setUTCHours(randomHour, 0, 0, 0); // Set minutes, seconds, and milliseconds to 0
  return date.toISOString();
}

function generateSampleDates(
  startDate,
  endDate,
  startHourET,
  endHourET,
  count
) {
  const startHourUTC = startHourET + 4; // Convert ET to UTC
  const endHourUTC = endHourET + 4; // Convert ET to UTC
  const dates = [];
  for (let i = 0; i < count; i++) {
    dates.push(
      getRandomDateInRange(startDate, endDate, startHourUTC, endHourUTC)
    );
  }
  return dates;
}

// Example usage
const startDate = new Date("2024-05-01T00:00:00Z");
const endDate = new Date("2024-05-10T23:59:59Z");
const startHourET = 9; // 9 AM ET
const endHourET = 17; // 5 PM ET
const count = 10;

const sampleDates = generateSampleDates(
  startDate,
  endDate,
  startHourET,
  endHourET,
  count
);




async function filterDatesByDayOfWeekAsync(dates, dayOfWeek) {
  const filteredDates = await Promise.all(
    dates.map(async (date) => {
      const checkDate = new Date(date);
      if (checkDate.getUTCDay() === dayOfWeek) {
        return date;
      }
      return null;
    })
  );
  return filteredDates.filter((date) => date !== null);
}

// Example usage:
(async () => {
  const sundayDates = await filterDatesByDayOfWeekAsync(sampleDates, 0); // 0 represents Sunday
  //   console.log("Sunday Dates", sundayDates);
})();



function convertArrayToHour(array) {
  array.forEach((value) => {
    const dateObj = parseISO(value);

    // Format the date to HH:MM format
    const formattedTime = format(dateObj, "hh:mm");
    console.log(formattedTime); // Output: 14:30
  });
}


function changeToTime(utc) {
      const dateObj = parseJSON(utc);

    // Format the date to HH:MM format
    const formattedTime = format(dateObj, "hh:mm");
    console.log("222", formattedTime); // Output: 14:30
}
changeToTime("2024-05-23T07:32:35.975Z");
