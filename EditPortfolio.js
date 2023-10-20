const addExperienceBtn = document.getElementById("addExperienceBtn");
const experienceForm = document.getElementById("experienceForm");
const experienceList = document.getElementById("experienceList");
const experienceEntryForm = document.getElementById("experienceEntryForm");
const filterInput = document.getElementById("filterInput");
const inputCompanyName = document.getElementById("companyName");
const inputStartDate = document.getElementById("startDate");
const inputEndDate = document.getElementById("endDate");
const inputDescription = document.getElementById("description");

function createExperienceEntry(experience) {
  const experienceEntry = document.createElement("li");
  experienceEntry.className = "experience-item";
  experienceEntry.innerHTML = `
    <div class="buttons">
      <i class="fas fa-edit editBtn" title="Edit"></i>
      <i class="fas fa-trash deleteBtn" title="Delete"></i>
    </div>
    <h3>${experience.companyName}</h3>
    <p>From: ${experience.startDate}</p>
    <p>To: ${experience.endDate}</p>
    <p>${experience.description}</p>
  `;
  return experienceEntry;
}

function clearFormInputs() {
  inputCompanyName.value = "";
  inputStartDate.value = "";
  inputEndDate.value = "";
  inputDescription.value = "";
}

function updateLocalStorage(newExperience) {
  const experiences = JSON.parse(localStorage.getItem("experiences")) || [];
  experiences.push(newExperience);
  localStorage.setItem("experiences", JSON.stringify(experiences));
}

function removeExperienceFromLocalStorage(companyName) {
  const experiences = JSON.parse(localStorage.getItem("experiences")) || [];
  const index = experiences.findIndex(
    (experience) => experience.companyName === companyName
  );
  if (index !== -1) {
    experiences.splice(index, 1);
    localStorage.setItem("experiences", JSON.stringify(experiences));
  }
}

function loadExperiencesFromLocalStorage() {
  const experiences = JSON.parse(localStorage.getItem("experiences")) || [];

  experiences.forEach((experience) => {
    const experienceEntry = createExperienceEntry(experience);
    experienceList.appendChild(experienceEntry);
  });
}

addExperienceBtn.addEventListener("click", () => {
  experienceForm.style.display = "block";
});

experienceEntryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const companyName = inputCompanyName.value;
  const startDate = inputStartDate.value;
  const endDate = inputEndDate.value;
  const description = inputDescription.value;

  if (new Date(endDate) < new Date(startDate)) {
    alert("End Date should be greater than or equal to Start Date");
    return;
  }

  const newExperience = {
    companyName,
    startDate,
    endDate,
    description
  };

  const experienceEntry = createExperienceEntry(newExperience);
  experienceList.appendChild(experienceEntry);
  clearFormInputs();
  experienceForm.style.display = "none";

  updateLocalStorage(newExperience);
});

filterInput.addEventListener("input", function () {
  const searchTerm = filterInput.value.toLowerCase();
  const experienceEntries = document.querySelectorAll(".experience-item");

  experienceEntries.forEach(function (entry) {
    const companyName = entry.querySelector("h3").textContent.toLowerCase();
    if (companyName.includes(searchTerm)) {
      entry.style.display = "block";
    } else {
      entry.style.display = "none";
    }
  });
});

experienceList.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    const experienceEntry = event.target.parentElement.parentElement;
    const companyName = experienceEntry.querySelector("h3").textContent;
    experienceEntry.remove();
    removeExperienceFromLocalStorage(companyName);
  } else if (event.target.classList.contains("editBtn")) {
    const experienceEntry = event.target.parentElement.parentElement;
    const companyName = experienceEntry.querySelector("h3").textContent;
    const experiences = JSON.parse(localStorage.getItem("experiences")) || [];
    const experience = experiences.find(
      (exp) => exp.companyName === companyName
    );

    const editForm = createEditForm(experience);
    experienceEntry.replaceWith(editForm);

    editForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const updatedExperience = getFormData(editForm);
      updateExperienceInLocalStorage(updatedExperience, companyName);
      editForm.replaceWith(createExperienceEntry(updatedExperience));
    });
  }
});

function createEditForm(experience) {
  const form = document.createElement("form");
  form.className = "experience-item";
  form.innerHTML = `
    <input class="filterInput" type="text" id="editCompanyName" value="${experience.companyName}" required>
    <input class="filterInput" type="date" id="editStartDate" value="${experience.startDate}" required>
    <input class="filterInput" type="date" id="editEndDate" value="${experience.endDate}" required>
    <textarea class="filterInput" id="editDescription" required>${experience.description}</textarea>
    <button class="addButton" type="submit">Save</button>
    `;
  return form;
}

function getFormData(form) {
  const updatedExperience = {
    companyName: form.querySelector("#editCompanyName").value,
    startDate: form.querySelector("#editStartDate").value,
    endDate: form.querySelector("#editEndDate").value,
    description: form.querySelector("#editDescription").value
  };
  return updatedExperience;
}

function updateExperienceInLocalStorage(updatedExperience, companyName) {
  const experiences = JSON.parse(localStorage.getItem("experiences")) || [];
  const index = experiences.findIndex((exp) => exp.companyName === companyName);
  if (index !== -1) {
    experiences[index] = updatedExperience;
    localStorage.setItem("experiences", JSON.stringify(experiences));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadExperiencesFromLocalStorage();
});
