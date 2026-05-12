document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.querySelector(".toggle-password");
  const passwordInput = document.querySelector("#password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "︶";
      } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁";
      }
    });
  }

  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", (e) => {
      const email = form.querySelector('input[type="email"]');
      const password = form.querySelector("#password");

      const emailError = form.querySelector(".email-error");
      const passwordError = form.querySelector(".password-error");

      if (!email || !password || !emailError || !passwordError) return;

      emailError.textContent = "";
      passwordError.textContent = "";

      let valid = true;

      if (!email.value.includes("@")) {
        emailError.textContent = "Неверный email";
        valid = false;
      }

      if (password.value.length < 6) {
        passwordError.textContent = "Минимум 6 символов";
        valid = false;
      }

      if (!valid) e.preventDefault();
    });
  }
});