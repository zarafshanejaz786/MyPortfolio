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

  const name = inputName.value;
  const email = inputEmail.value;
  const password = inputPassword.value;

  var isValid = false;
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
    isValid = false;
  } else {
    isValid = true;
  }

  if (!emailRegex.test(email)) {
    emailError.textContent =
      "The email is required and must have a @ sign in it. ";
    addRedBorder(inputEmail);
    isValid = false;
  } else {
    isValid = true;
  }

  if (password.length < 8) {
    passwordError.textContent = "The password must have at least 8 characters.";
    addRedBorder(inputPassword);
    isValid = false;
  } else {
    isValid = true;
  }
  if (isValid) successMessage.textContent = "Logged In successful 🙂";
});
