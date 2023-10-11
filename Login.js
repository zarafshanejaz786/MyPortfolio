const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const inputName = document.getElementById("name");
  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const successMessage = document.getElementById("successMessage");

  const name = inputName.value;
  const email = inputEmail.value;
  const password = inputPassword.value;

  emailError.textContent = "";
  nameError.textContent = "";
  passwordError.textContent = "";

  inputName.style.border = "";
  inputEmail.style.border = "";
  inputPassword.style.border = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function addRedBorder(element) {
    element.style.border = "1px solid red";
  }

  if (!name) {
    nameError.textContent = "The name is required (empty field not allowed) ";
    addRedBorder(inputName);
    return;
  }

  if (!emailRegex.test(email)) {
    emailError.textContent =
      "The email is required and must have a @ sign in it. ";
    addRedBorder(inputEmail);
    return;
  }

  if (!(password.length > 7)) {
    passwordError.textContent = "The password must have at least 8 characters.";
    addRedBorder(inputPassword);
    return;
  }

  if (name && emailRegex.test(email) && password.length > 7) {
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "Logged In successful 🙂";
    return;
  }
});
