const addExperienceBtn = document.getElementById("addExperienceBtn");
const experienceForm = document.getElementById("experienceForm");
const experienceList = document.getElementById("experienceList");
const experienceEntryForm = document.getElementById("experienceEntryForm");
const inputCompanyName = document.getElementById("companyName");
const inputStartDate = document.getElementById("startDate");
const inputEndDate = document.getElementById("endDate");
const inputDescription = document.getElementById("description");

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

  const experienceEntry = document.createElement("li");

  experienceEntry.className = "experience-item";
  experienceEntry.innerHTML = `
     
        <h3>${inputCompanyName.value}</h3>
        <p>From: ${inputStartDate.value}</p>
        <p>To: ${inputEndDate.value}</p>
        <p>${inputDescription.value}</p>
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
