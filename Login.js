document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("registrationForm")
    .addEventListener("submit", async function (event) {
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

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name && emailRegex.test(email) && password.length > 7) {
        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        successMessage.textContent = "Logged In successful 🙂";
        return;
      }

      if (!name) {
        nameError.textContent =
          "The name is required (empty field not allowed) ";
        return;
      } else {
        nameError.textContent = "";
      }

      if (!emailRegex.test(email)) {
        emailError.textContent =
          "The email is required and must have a @ sign in it. ";
        return;
      } else {
        emailError.textContent = "";
      }

      if (!(password.length > 7)) {
        passwordError.textContent =
          "The password must have at least 8 characters.";
        return;
      } else {
        passwordError.textContent = "";
      }
    });
});
