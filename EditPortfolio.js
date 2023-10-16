const addExperienceBtn = document.getElementById("addExperienceBtn");
const experienceForm = document.getElementById("experienceForm");
const experienceList = document.getElementById("experienceList");
const experienceEntryForm = document.getElementById("experienceEntryForm");
const experienceEntry = document.createElement("li");
const inputCompanyName = document.getElementById("companyName");
const inputStartDate = document.getElementById("startDate");
const inputEndDate = document.getElementById("endDate");
const inputDescription = document.getElementById("description");

addExperienceBtn.addEventListener("click", () => {
  experienceForm.style.display = "block";
});

experienceEntryForm.addEventListener("submit", (event) => {
  event.preventDefault();
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
});

function clearFormInputs() {
  inputCompanyName.value = "";
  inputStartDate.value = "";
  inputEndDate.value = "";
  inputDescription.value = "";
}
