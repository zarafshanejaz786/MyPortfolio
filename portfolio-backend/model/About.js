const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  companyName: String,
  startDate: String,
  endDate: String,
  description: String
});

const aboutSchema = new mongoose.Schema({
  experiences: [experienceSchema]
});

const About = mongoose.model("About", aboutSchema);
module.exports = About;
