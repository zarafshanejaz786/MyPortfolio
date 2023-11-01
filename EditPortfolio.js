const addExperienceBtn = document.getElementById("addExperienceBtn");
const experienceForm = document.getElementById("experienceForm");
const experienceList = document.getElementById("experienceList");
const experienceEntryForm = document.getElementById("experienceEntryForm");
const filterInput = document.getElementById("filterInput");
const inputCompanyName = document.getElementById("companyName");
const inputStartDate = document.getElementById("startDate");
const inputEndDate = document.getElementById("endDate");
const inputDescription = document.getElementById("description");

const apiUrl = "http://localhost:5501/api/portfolio/experiences";

const getExperiences = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
};

const createExperienceEntry = (experience) => {
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
};

const clearFormInputs = () => {
  inputCompanyName.value = "";
  inputStartDate.value = "";
  inputEndDate.value = "";
  inputDescription.value = "";
};

const addExperience = async (newExperience) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newExperience)
    });

    if (response.ok) {
      const addedExperience = await response.json();
      return addedExperience;
    } else {
      alert("Error adding experience");
      return null;
    }
  } catch (error) {
    console.error("Error adding experience:", error);
    return null;
  }
};

// async function deleteExperience(experienceId) {
//   try {
//     const response = await fetch(
//       `http://localhost:5501/api/portfolio/experiences/${experienceId}`,
//       {
//         method: "DELETE"
//       }
//     );

//     if (response.ok) {
//       // Handle successful deletion
//       console.log("Experience deleted successfully");
//     } else {
//       console.error("Error deleting experience");
//     }
//   } catch (error) {
//     console.error("Error deleting experience:", error);
//   }
// }
async function deleteExperience(experienceId) {
  try {
    const response = await fetch(
      `http://localhost:5501/api/portfolio/experiences/${experienceId}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {
      return true;
    } else {
      alert("Error deleting experience");
      return false;
    }
  } catch (error) {
    console.error("Error deleting experience:", error);
    return false;
  }
}

// const deleteExperience = async (experienceId) => {
//   try {
//     const response = await fetch(
//       `http://localhost:5501/api/portfolio/experiences/delete?experienceId=${experienceId}`,

//       // `http://localhost:5501/api/portfolio/experiences/delete/${experienceId}`,
//       //`http://localhost:5501/api/portfolio/experiences/${experienceId}`,
//       {
//         method: "DELETE"
//       }
//     );

//     if (response.ok) {
//       return true;
//     } else {
//       alert("Error deleting experience");
//       return false;
//     }
//   } catch (error) {
//     console.error("Error deleting experience:", error);
//     return false;
//   }
// };

const updateExperience = async (updatedData, experienceId) => {
  try {
    const response = await fetch(
      `http://localhost:5501/api/portfolio/experiences/${experienceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      }
    );

    if (response.ok) {
      const updatedExperience = await response.json();
      // Handle the updated experience data as needed
      return updatedExperience;
    } else {
      console.error("Error updating experience");
    }
  } catch (error) {
    console.error("Error updating experience:", error);
  }
};

addExperienceBtn.addEventListener("click", () => {
  experienceForm.style.display = "block";
});

experienceEntryForm.addEventListener("submit", async (event) => {
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

  const addedExperience = await addExperience(newExperience);
  if (addedExperience) {
    const experienceEntry = createExperienceEntry(addedExperience);
    experienceList.appendChild(experienceEntry);
    clearFormInputs();
    experienceForm.style.display = "none";
  }
});

filterInput.addEventListener("input", () => {
  const searchTerm = filterInput.value.toLowerCase();
  const experienceEntries = document.querySelectorAll(".experience-item");

  experienceEntries.forEach((entry) => {
    const companyName = entry.querySelector("h3").textContent.toLowerCase();
    if (companyName.includes(searchTerm)) {
      entry.style.display = "block";
    } else {
      entry.style.display = "none";
    }
  });
});
experienceList.addEventListener("click", async (event) => {
  const experiences = await getExperiences();
  if (event.target.classList.contains("deleteBtn")) {
    const experienceEntry = event.target.parentElement.parentElement;

    const experienceId = experienceEntry.dataset.id;

    if (await deleteExperience(experienceId)) {
      experienceEntry.remove();
    }
  } else if (event.target.classList.contains("editBtn")) {
    const experienceEntry = event.target.parentElement.parentElement;
    const experienceId = experienceEntry.dataset.id;

    event.target.disabled = true;

    const experience = experiences.find(
      (experience) => experience._id === experienceId
    );

    if (experience) {
      const editForm = createEditForm(experience);
      experienceEntry.replaceWith(editForm);

      event.target.disabled = false;

      editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const updatedExperience = getFormData(editForm, experienceId);

        const updatedData = await updateExperience(
          updatedExperience,
          experienceId
        );
        if (updatedData) {
          editForm.replaceWith(createExperienceEntry(updatedData));
        }
      });
    }
  }
});
const createEditForm = (experience) => {
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
};
const getFormData = (form, experienceId) => {
  const updatedExperience = {
    _id: experienceId,
    companyName: form.querySelector("#editCompanyName").value,
    startDate: form.querySelector("#editStartDate").value,
    endDate: form.querySelector("#editEndDate").value,
    description: form.querySelector("#editDescription").value
  };
  return updatedExperience;
};

document.addEventListener("DOMContentLoaded", async () => {
  const experiences = await getExperiences();

  experiences.forEach((experience) => {
    const experienceEntry = createExperienceEntry(experience);
    experienceEntry.dataset.id = experience._id;
    experienceList.appendChild(experienceEntry);
  });
});
