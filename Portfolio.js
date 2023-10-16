function loadExperiencesFromLocalStorage() {
  const experienceList = document.getElementById("experienceList");

  const experiences = JSON.parse(localStorage.getItem("experiences")) || [];

  experiences.forEach((experience) => {
    const experienceEntry = document.createElement("li");
    experienceEntry.className = "experience-item";
    experienceEntry.innerHTML = `
              
              <h3>${experience.name}</h3>
              <p>${experience.projectName} - ${experience.companyName}</p>
              <p>${experience.year}</p>
              <p>${experience.description}</p>
            `;

    experienceList.appendChild(experienceEntry);
  });
}

loadExperiencesFromLocalStorage();
