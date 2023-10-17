document.addEventListener("DOMContentLoaded", function () {
  loadExperiencesFromLocalStorage();
});

function loadExperiencesFromLocalStorage() {
  const experiences = JSON.parse(localStorage.getItem("experiences")) || [];

  experiences.forEach((experience) => {
    const experienceEntry = document.createElement("li");
    experienceEntry.className = "experience-item";
    experienceEntry.innerHTML = `
       
        <h3>${experience.companyName}</h3>
        <p>${experience.startDate} - ${experience.endDate}</p>
        <p>${experience.description}</p>
      `;

    experienceList.appendChild(experienceEntry);
  });
}
