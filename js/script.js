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

  const passwordInput = document.querySelector('input[type="password"]');

  if (!passwordInput) return;

  const toggle = document.createElement("button");
  toggle.textContent = "👁";
  toggle.type = "button";

  passwordInput.parentElement.append(toggle);

  toggle.addEventListener("click", () => {
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
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

