const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  experiences: [
    {
      companyName: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ]
});

const About = mongoose.model("About", aboutSchema);
module.exports = About;
