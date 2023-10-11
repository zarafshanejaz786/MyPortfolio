document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const addItemBtn = document.getElementById("addItemBtn");
  const itemModal = document.getElementById("itemModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalProjectName = document.getElementById("modalProjectName");
  const modalCompanyName = document.getElementById("modalCompanyName");
  const modalYear = document.getElementById("modalYear");
  const modalDescription = document.getElementById("modalDescription");
  const closeBtn = document.querySelector(".close");
  const addForm = document.getElementById("addForm");
  const addItemForm = document.getElementById("addItemForm"); // Add this line
  const nameInput = document.getElementById("nameInput");
  const projectNameInput = document.getElementById("projectNameInput");
  const companyNameInput = document.getElementById("companyNameInput");
  const yearInput = document.getElementById("yearInput");
  const descriptionInput = document.getElementById("descriptionInput");

  let items = [
    {
      name: "Project 1",
      projectName: "K-Solar -",
      companyName: "CodeNinja",
      year: "2023",
      description:
        " Using K-Solar app user will be able to monitor their solar panels systems in mobile phone."
    },
    {
      name: "Project 2",
      projectName: "Aflatoon -",
      companyName: "Codeninja",
      year: "2023",
      description:
        " Using this app organization will be able to know their employee’s mood and to improve their productivity at work."
    },
    {
      name: "Project 3",
      projectName: "Blood Donor App -",
      companyName: "Codeninja",
      year: "2023",
      description:
        "Designed to make interaction between Blood Donor Companies and needy persons."
    }
  ];

  function renderList() {
    productList.innerHTML = "";
    items.forEach((item, index) => {
      const listItem = document.createElement("div"); // Create a <div> for each item
      listItem.classList.add("item"); // Add a class for styling
      listItem.innerHTML = `
      <div class="item-content" : hover>
        <span class="item-name">${item.name}</span>
        <span class="item-project"> ${item.projectName}</span>
        <span class="item-company">${item.companyName}</span>
      </div>
      <button class="deleteBtn">Delete</button>
    `;
      productList.appendChild(listItem);

      const deleteBtn = listItem.querySelector(".deleteBtn");

      listItem.addEventListener("click", () => showModal(index));
      deleteBtn.addEventListener("click", () => deleteItem(index));
    });
  }

  function showModal(index) {
    modalTitle.textContent = items[index].name;
    modalProjectName.textContent = items[index].projectName;
    modalCompanyName.textContent = items[index].companyName;
    modalYear.textContent = items[index].year;
    modalDescription.textContent = items[index].description;
    itemModal.style.display = "block";
  }

  function hideModal() {
    itemModal.style.display = "none";
  }

  function deleteItem(index) {
    items.splice(index, 1);
    renderList();
  }

  function clearFormInputs() {
    nameInput.value = "";

    projectNameInput.value = "";
    companyNameInput.value = "";
    yearInput.value = "";

    descriptionInput.value = "";
  }

  addItemBtn.addEventListener("click", () => {
    addForm.style.display = "block";
  });

  addItemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const itemName = nameInput.value;

    const itemProjectName = projectNameInput.value;
    const itemCompanyName = companyNameInput.value;
    const itemYear = yearInput.value;

    const itemDescription = descriptionInput.value;

    if (
      itemName &&
      itemCompanyName &&
      itemProjectName &&
      itemYear &&
      itemDescription
    ) {
      const newItem = {
        name: itemName,
        projectName: itemDescription,
        companyName: itemCompanyName,
        year: itemYear,
        description: itemDescription
      };
      items.push(newItem);
      renderList();
      addForm.style.display = "none";
      clearFormInputs();
    } else {
      alert("Please enter all the information.");
    }
  });

  closeBtn.addEventListener("click", () => {
    hideModal();
    clearFormInputs();
  });

  window.addEventListener("click", (event) => {
    if (event.target === itemModal) {
      hideModal();
      clearFormInputs();
    }
  });

  renderList();
});
