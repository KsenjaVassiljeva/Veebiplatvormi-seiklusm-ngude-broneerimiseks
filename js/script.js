const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

cards.forEach(card => observer.observe(card));



document.addEventListener("DOMContentLoaded", () => {

  const togglePassword =
    document.querySelector(".toggle-password");

  const passwordInput =
    document.querySelector("#password");

  togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

      passwordInput.type = "text";
      togglePassword.textContent = "︶";

    } else {

      passwordInput.type = "password";
      togglePassword.textContent = "👁";

    }

  });

});

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');

    const emailError = form.querySelector(".email-error");
    const passwordError = form.querySelector(".password-error");

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

});

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {
  button.addEventListener("click", () => {

    const isLoggedIn = localStorage.getItem("user");

    if (!isLoggedIn) {
      window.location.href = "login.html";
      return;
    }

    alert("Лайк поставлен!");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const userArea = document.querySelector(".user-area");
  const user = localStorage.getItem("user");

  if (user && userArea) {
    userArea.innerHTML = `
      <a href="profile.html" class="profile-icon">👤</a>
    `;
  }
});
