
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
const count = 1;

const sampleDates = generateSampleDates(
  startDate,
  endDate,
  startHourET,
  endHourET,
  count
);

const customData = [
  {
    name: "Room 101",
    date: "2024/05/01",
    time: generateSampleDates(
      startDate,
      endDate,
      startHourET,
      endHourET,
      count
    ),
    occupancy: Math.floor(Math.random() * 600),
  },
  {
    name: "Room 102",
    date: "2024/05/02",
    time: generateSampleDates(
      startDate,
      endDate,
      startHourET,
      endHourET,
      count
    ),
    occupancy: Math.floor(Math.random() * 600),
  },
  {
    name: "Room 103",
    date: "2024/05/03",
    time: generateSampleDates(
      startDate,
      endDate,
      startHourET,
      endHourET,
      count
    ),
    occupancy: Math.floor(Math.random() * 600),
  },
  {
    name: "Room 104",
    date: "2024/05/04",
    time: generateSampleDates(
      startDate,
      endDate,
      startHourET,
      endHourET,
      count
    ),
    occupancy: Math.floor(Math.random() * 101),
  },
  {
    name: "Room 105",
    date: "2024/05/05",
    time: generateSampleDates(
      startDate,
      endDate,
      startHourET,
      endHourET,
      count
    ),
    occupancy: Math.floor(Math.random() * 600),
  },
  {
    name: "Room 106",
    date: "2024/05/06",
    time: generateSampleDates(
      startDate,
      endDate,
      startHourET,
      endHourET,
      count
    ),
    occupancy: Math.floor(Math.random() * 600),
  },
  {
    name: "Room 107",
    date: "2024/05/07",
    time: generateSampleDates(
      startDate,
      endDate,
      startHourET,
      endHourET,
      count
    ),
    occupancy: Math.floor(Math.random() * 600),
  },
];

export default customData;

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

function changeToTime(utc) {
      const dateObj = parseJSON(utc);
    // Format the date to HH:MM format
    const formattedTime = format(dateObj, "hh:mm");
    console.log("222", formattedTime); // Output: 14:30
}