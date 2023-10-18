const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputName = document.getElementById("name");
  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const successMessage = document.getElementById("successMessage");

  const name = inputName.value.trim();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  let isValid = true;

  inputName.style.border = "";
  inputEmail.style.border = "";
  inputPassword.style.border = "";

  emailError.textContent = "";
  nameError.textContent = "";
  passwordError.textContent = "";
  successMessage.textContent = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function addRedBorder(element) {
    element.style.border = "1px solid red";
  }

  if (!name) {
    nameError.textContent = "The name is required (empty field not allowed)";
    addRedBorder(inputName);
    isValid = false;
  }

  if (!emailRegex.test(email)) {
    if (!email) {
      emailError.textContent = "Email is required (empty field not allowed)";
    } else if (email.indexOf("@") === -1) {
      emailError.textContent = "Please include '@' in the email address.";
    } else if (email.indexOf(".") === -1) {
      emailError.textContent =
        "The '.' is missing or used on the wrong position.";
    } else if (email.indexOf("@") > email.lastIndexOf(".")) {
      emailError.textContent =
        "Incomplete email: The '@' is placed after the '.'";
    } else {
      emailError.textContent = "Invalid email format.";
    }

    addRedBorder(inputEmail);
    isValid = false;
  }

  if (password.length < 8) {
    passwordError.textContent =
      "Password is required and must have at least 8 characters.";
    addRedBorder(inputPassword);
    isValid = false;
  }

  if (isValid) {
    // If the form input is valid, simulate form submission and make an API request
    sendAPIRequest({ name, email, password });
  }
});

// Function to send an API request
function sendAPIRequest(userData) {
  // Mock API URL
  const apiURL = "https://dummyjson.com/api/users"; // Replace with the actual API endpoint

  // Create a new user object
  const newUser = {
    name: userData.name,
    email: userData.email,
    password: userData.password
  };

  // Send a POST request to the API
  fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Successful response, parse JSON
      } else {
        throw new Error("API Error"); // Error response from the API
      }
    })
    .then((data) => {
      // Handle a successful API response
      successMessage.textContent = "Registered successfully 🙂";
    })
    .catch((error) => {
      // Handle API error
      successMessage.textContent = "Registration failed. Please try again.";
    });
}
