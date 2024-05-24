const mongoose = require("mongoose");
const { Schema } = mongoose;

const TimePeriodSchema = new Schema(
  {
    occupancy: { type: Number, required: true },
    day: { type: String },
    stamp: { type: String },
  },
  { timestamps: true }
);

const TimePeriodModel = mongoose.model("Timeperiod", TimePeriodSchema);

module.exports = TimePeriodModel;
