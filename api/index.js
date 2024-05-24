const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Timeperiod = require("./models/Timeperiod");
var moment = require('moment');
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

// express app setUp
app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

function getDayName(dayInt) {
  switch (dayInt) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Invalid day";
  }
}

app.get("/entries", async (req, res) => {
  const allTimeStamps = await Timeperiod.find({});
  res.json(allTimeStamps);
});


app.get("/entries/thursday", async (req, res) => {
  const thursdayStamps = await Timeperiod.find({ day: "Friday" }).exec();
  res.json(thursdayStamps);
});


app.post("/entries", async (req, res) => {
  const { occupancy } = req.body;
  const TimeperiodDoc = await Timeperiod.create({
    occupancy,
  });
  // get day of week
  const date = TimeperiodDoc.createdAt;
  const day = date.getUTCDay();

  //get timestamp in hh:mm
  const formattedTime = moment(date).format('HH:mm');

  // save doc
    TimeperiodDoc.overwrite({
    occupancy: TimeperiodDoc.occupancy,
    day: getDayName(day),
    stamp: formattedTime,
  });
  
  await TimeperiodDoc.save();
  res.json(TimeperiodDoc);
});

app.get("/", (req, res) => {
  res.json("home");
});

app.listen(4000);
