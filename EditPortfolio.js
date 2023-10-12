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
     
        <h3>${companyName}</h3>
        <p>${startDate} - ${endDate}</p>
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
