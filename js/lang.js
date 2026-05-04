const translations = {
  en: {
    catalog: "Catalog",
    contact: "Contact",
    about: "About us",
    login: "Log in",
    recommended: "Recommended quests",

    quest1: "The Secret of the Kidnapper",
    price1: "€5 per person",

    quest2: "Hunter and prey",
    price2: "€3 per person",

    quest3: "Magium",
    price3: "€7 per person",

    more: "More",

    aboutTitle: "About us",
    aboutText:
      "Questoria is a team of enthusiasts who create live role-playing games where participants become the heroes of the story.",

    seeMore: "See more"
  },

  et: {
    catalog: "Kataloog",
    contact: "Kontakt",
    about: "Meist",
    login: "Logi sisse",
    recommended: "Soovitatud mängud",

    quest1: "Röövija saladus",
    price1: "€5 inimese kohta",

    quest2: "Kütt ja saak",
    price2: "€3 inimese kohta",

    quest3: "Magium",
    price3: "€7 inimese kohta",

    more: "Rohkem",

    aboutTitle: "Meist",
    aboutText:
      "Questoria on entusiastide meeskond, kes loob rollimänge, kus osalejad saavad loo kangelasteks.",

    seeMore: "Vaata rohkem"
  }
};

const btn = document.querySelector(".language");

let currentLang = localStorage.getItem("lang") || "en";

function changeLang(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // показываем текущий язык
  btn.textContent = lang.toUpperCase();

  localStorage.setItem("lang", lang);
}

btn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "et" : "en";
  changeLang(currentLang);
});

// запуск при загрузке
changeLang(currentLang);