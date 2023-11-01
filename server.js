const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5501;
const mongoose = require("mongoose");
const About = require("./portfolio-backend/model/About");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONNECTION_DB = "mongodb://127.0.0.1:27017/Portfolio_Storage";

app.use(
  cors({
    origin: "*"
  })
);

mongoose
  .connect(CONNECTION_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server is running on port : " + port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.get("/api/portfolio", async (req, res) => {
  try {
    const aboutData = await About.find();
    res.json(aboutData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/portfolio/experiences", async (req, res) => {
  try {
    const aboutData = await About.findOne();

    if (aboutData && aboutData.experiences) {
      res.json(aboutData.experiences);
    } else {
      res.status(404).json({ error: "Services data not found" });
    }
  } catch (error) {
    console.error("Error fetching services data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/portfolio/experiences", async (req, res) => {
  const newExperience = req.body;

  try {
    const aboutData = await About.findOne();

    if (aboutData) {
      if (!aboutData.experiences) {
        aboutData.experiences = [];
      }

      aboutData.experiences.push(newExperience);
      await aboutData.save();
      res.json(newExperience);
    } else {
      res.status(404).json({ error: "About data not found" });
    }
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/portfolio/experiences/:experienceId", async (req, res) => {
  const { experienceId } = req.params;
  const updatedExperienceData = req.body;

  try {
    const aboutData = await About.findOne();
    if (!aboutData) {
      return res.status(404).json({ error: "About data not found" });
    }

    const experience = aboutData.experiences.id(experienceId);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    experience.set(updatedExperienceData);
    await aboutData.save();

    res.json(experience);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/portfolio/experiences/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({ error: "About data not found" });
    }

    const experienceIndex = about.experiences.findIndex((exp) => exp._id == id);

    if (experienceIndex === -1) {
      return res.status(404).json({ error: "Experience not found" });
    }

    about.experiences.splice(experienceIndex, 1);
    await about.save();

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hello world");
});
