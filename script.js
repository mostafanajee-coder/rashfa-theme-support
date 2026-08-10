(() => {
  const storageKey = "rashfa-support-language";
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll("[data-language]")];
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector("#site-nav");

  const pageCopy = {
    ar: {
      title: "ثيم رشفة | Rashfa Theme — Help & Documentation",
      description: "دليل الاستخدام والدعم الرسمي لثيم رشفة على منصة سلة."
    },
    en: {
      title: "Rashfa Theme | Help & Documentation",
      description: "Official bilingual help and documentation for the Rashfa Salla Theme."
    }
  };

  function applyLanguage(language) {
    const lang = language === "en" ? "en" : "ar";
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = pageCopy[lang].title;
    document.querySelector('meta[name="description"]').setAttribute("content", pageCopy[lang].description);

    document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
      element.textContent = element.dataset[lang];
    });

    buttons.forEach((button) => {
      const active = button.dataset.language === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (menuToggle) {
      menuToggle.setAttribute("aria-label", lang === "ar" ? "فتح القائمة" : "Open menu");
    }
    localStorage.setItem(storageKey, lang);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  });

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.querySelector(".sr-only").textContent = isOpen
        ? (root.lang === "ar" ? "إغلاق القائمة" : "Close menu")
        : (root.lang === "ar" ? "فتح القائمة" : "Open menu");
    });

    siteNav.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const savedLanguage = localStorage.getItem(storageKey);
  applyLanguage(savedLanguage || "ar");
})();
