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
     
        <h3>${companyName}</h3>
        <p>From: ${startDate}</p>
        <p>To: ${endDate}</p>
        <p>${description}</p>
      `;

  experienceList.appendChild(experienceEntry);
  clearFormInputs();
  experienceForm.style.display = "none";
});

function clearFormInputs() {
  document.getElementById("companyName").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("description").value = "";
}
