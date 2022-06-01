const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema({
  class: {
    type: Number
  },
  department: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  meetingTiming: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("timeTable", timeTableSchema);
