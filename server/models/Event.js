const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    trim: true
  },
  startTime: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    trim: true
  },
  description: {
    type: String,
    maxlength: 200,
    trim: true
  }
});

const Event = mongoose.model("Event", EventSchema);
module.exports = { Event };
