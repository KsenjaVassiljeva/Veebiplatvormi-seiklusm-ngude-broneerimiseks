const translations = {
  en: {
    catalog: "Catalog",
    contact: "Contact",
    about: "About us",
    login: "Log in",
    recommended: "Recommended quests",
    quest1: "The Secret of the Kidnapper",
    quest2: "Hunter and prey",
    quest3: "Magium",
    price3: "from €3 per person",
    price1: "from €1 per person",
    more: "more",
    aboutTitle: "About us",
    aboutText: "Questoria is a team of enthusiasts who create live role-playing games (questories), where participants become the heroes of the story.",
    seeMore: "see more"
  },

  et: {
    catalog: "Kataloog",
    contact: "Kontakt",
    about: "Meist",
    login: "Logi sisse",
    recommended: "Soovitatud mängud",
    quest1: "Röövija saladus",
    quest2: "Kütt ja saak",
    quest3: "Magium",
    price3: "alates 3€ inimese kohta",
    price1: "alates 1€ inimese kohta",
    more: "rohkem",
    aboutTitle: "Meist",
    aboutText: "Questoria on entusiastide meeskond, kes loob elavaid rollimänge, kus osalejad saavad loo kangelasteks.",
    seeMore: "vaata rohkem"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const langButton = document.querySelector(".lang");
  let currentLang = localStorage.getItem("lang") || "en";

  function setLanguage(lang) {
    document.querySelectorAll("[data-key]").forEach((element) => {
      const key = element.dataset.key;
      element.textContent = translations[lang][key];
    });

    langButton.textContent = lang === "en" ? "Et" : "En";
  }

  setLanguage(currentLang);

  langButton.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "et" : "en";
    localStorage.setItem("lang", currentLang);
    setLanguage(currentLang);
  });
});