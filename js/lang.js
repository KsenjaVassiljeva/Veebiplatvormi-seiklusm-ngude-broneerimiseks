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
    quest4: "Elven Workshop",
    quest5: "Investigator's Game",
    quest6: "The robbery of the century",
    price4: "from €4 per person",
    more: "more",
    aboutTitle: "About us",
    aboutText: "Questoria is a team of enthusiasts who create live role-playing games (questories), where participants become the heroes of the story.",
    seeMore: "see more",
    loginTitle: "Login",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot your password?",
    loginBtn: "Login",
    needAccount: "Need an account?",
    signUpWith: "Sign-Up with",
    profile: "👤 Profile",
    logout: "🚪 Logout",
    registerTitle: "Register",
    firstName: "Name",
    lastName: "Last Name",
    registerBtn: "Register",
    haveAccount: "Have account?",
    continueGoogle: "Continue with Google",
    personalInfo: "Personal Information",
    myBookings: "My Bookings",
    accountSettings: "Account Settings",
    editProfile: "Edit Profile",
    logoutBtn: "Logout",
    bookingTitle: "Choose date and time",
    bookingBtn: "Booking",
    peopleCount: "Number of people",
    gallery: "Gallery",
    reviews: "Reviews",
    bookBtn: "Book",
    contactsTitle: "Contacts",
    contactAddress: "Address",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactHours: "🕘 Opening Hours",
    contactSocial: "🌐 Social Media",
    aboutTitle: "About us",
    teamMembers: "Team Members",
    roleCreative: "Creative Director",
    roleDesigner: "Game Designer",
    roleVisual: "Visual & Props Designer",
    roleProducer: "Experience Producer",
    galleryAbout: "Gallery",
    questName: "Quest Name",
    questDescription: "Description",
    questDifficulty: "Difficulty",
    questDuration: "Duration",
    bookingDate: "Date",
    bookingTime: "Time",
    bookingPeople: "Number of People",
    bookingStatus: "Status",
    bookingPrice: "Total Price",
    close: "Close",
    cancelBooking: "Cancel Booking"
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
    price4: "alates 4€ inimese kohta",
    more: "rohkem",
    aboutTitle: "Meist",
    aboutText: "Questoria on entusiastide meeskond, kes loob elavaid rollimänge, kus osalejad saavad loo kangelasteks.",
    seeMore: "vaata rohkem",
    loginTitle: "Sisselogimine",
    email: "E-post",
    password: "Parool",
    forgotPassword: "Unustasid parooli?",
    loginBtn: "Logi sisse",
    needAccount: "Vajad kontot?",
    signUpWith: "Registreeru koos",
    profile: "👤 Profiil",
    logout: "🚪 Välju",
    registerTitle: "Registreerimine",
    firstName: "Nimi",
    lastName: "Perekonnanimi",
    registerBtn: "Registreeri",
    haveAccount: "Juba kontol olemas?",
    continueGoogle: "Jätka Googlega",
    personalInfo: "Isikuandmed",
    myBookings: "Minu broneerings",
    accountSettings: "Konto seaded",
    editProfile: "Muuda profiili",
    logoutBtn: "Välju",
    bookingTitle: "Vali kuupäev ja aeg",
    bookingBtn: "Broneeri",
    peopleCount: "Inimeste arv",
    gallery: "Galerii",
    reviews: "Arvustused",
    bookBtn: "Broneeri",
    contactsTitle: "Kontaktid",
    contactAddress: "Aadress",
    contactPhone: "Telefon",
    contactEmail: "E-post",
    contactHours: "🕘 Tööaeg",
    contactSocial: "🌐 Sotsiaalmeedia",
    aboutTitle: "Meist",
    teamMembers: "Meeskonna liikmed",
    roleCreative: "Loovtegelane",
    roleDesigner: "Mängudeisainer",
    roleVisual: "Visuaalne-ja kinnistedeisainer",
    roleProducer: "Kogemuse tootja",
    galleryAbout: "Galerii",
    questName: "Mängu nimi",
    questDescription: "Kirjeldus",
    questDifficulty: "Raskusaste",
    questDuration: "Kestus",
    bookingDate: "Kuupäev",
    bookingTime: "Kellaaeg",
    bookingPeople: "Inimeste arv",
    bookingStatus: "Staatus",
    bookingPrice: "Kokku hind",
    close: "Sule",
    cancelBooking: "Tühista broneering"
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

    // Update placeholders
    document.querySelectorAll("[data-placeholder]").forEach((element) => {
      const key = element.dataset.placeholder;
      element.placeholder = translations[lang][key];
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