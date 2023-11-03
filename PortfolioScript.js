const EXPERIENCE_URL = "http://localhost:5501/api/portfolio/experiences";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(EXPERIENCE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    loadExperiencesFromAPI(data);
  } catch (error) {
    console.error("Error fetching services data:", error);
  }
});
const loadExperiencesFromAPI = (data) => {
  if (data) {
    console.log("Items Repose: " + data);
    const experienceList = document.getElementById("experienceList");

    data.forEach((experience) => {
      const listItem = document.createElement("li");
      listItem.className = "experience-item";
      listItem.innerHTML = `
            <h3>${experience.companyName}</h3>
            <p>${experience.startDate} - ${experience.endDate}</p>
            <p>${experience.description}</p>
          `;

      experienceList.appendChild(listItem);
    });
  } else {
    console.error("No experiences data found in the API response.");
  }
};
