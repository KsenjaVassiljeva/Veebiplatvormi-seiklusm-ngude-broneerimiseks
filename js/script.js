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

