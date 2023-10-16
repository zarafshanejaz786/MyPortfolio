const addExperienceBtn = document.getElementById("addExperienceBtn");
const experienceForm = document.getElementById("experienceForm");
const experienceList = document.getElementById("experienceList");
const experienceEntryForm = document.getElementById("experienceEntryForm");

addExperienceBtn.addEventListener("click", () => {
  experienceForm.style.display = "block";
});

experienceEntryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const companyName = document.getElementById("companyName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;

  const experienceEntry = document.createElement("li");
  experienceEntry.className = "experience-item";
  experienceEntry.innerHTML = `
    <div class="buttons">
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    </div>
    <h3>${companyName}</h3>
    <p>${startDate} - ${endDate}</p>
    <p>${description}</p>
  `;

  experienceList.appendChild(experienceEntry);
  clearFormInputs();
  experienceForm.style.display = "none";

  updateLocalStorage({
    companyName,
    startDate,
    endDate,
    description
  });
});

function clearFormInputs() {
  document.getElementById("companyName").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("description").value = "";
}

function updateLocalStorage(newExperience) {
  const experiences = JSON.parse(localStorage.getItem("experiences")) || [];

  experiences.push(newExperience);

  localStorage.setItem("experiences", JSON.stringify(experiences));
}

document.addEventListener("DOMContentLoaded", function () {
  loadExperiencesFromLocalStorage();
});

function loadExperiencesFromLocalStorage() {
  const experiences = JSON.parse(localStorage.getItem("experiences")) || [];

  experiences.forEach((experience) => {
    const experienceEntry = document.createElement("li");
    experienceEntry.className = "experience-item";
    experienceEntry.innerHTML = `
      <div class="buttons">
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </div>
      <h3>${experience.companyName}</h3>
      <p>${experience.startDate} - ${experience.endDate}</p>
      <p>${experience.description}</p>
    `;

    experienceList.appendChild(experienceEntry);
  });
}
