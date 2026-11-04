/* ==========================================================================
   Comportements du site :
   1. Changement de langue (FR / EN)
   2. Menu mobile
   3. Bordure de l'en-tête au défilement
   4. Animations d'apparition
   5. Photo manquante → initiales
   6. Année du pied de page
   ========================================================================== */
(function () {
  "use strict";

  /* 1. Changement de langue ----------------------------------------------- */
  const STORAGE_KEY = "portfolio-lang";
  const metaDescription = document.querySelector('meta[name="description"]');
  const langButtons = document.querySelectorAll(".lang-switch__button");

  // On mémorise le français d'origine pour pouvoir y revenir sans recharger.
  const original = {
    title: document.title,
    description: metaDescription ? metaDescription.content : "",
    text: new Map(),
    html: new Map(),
    attrs: new Map()
  };

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    original.text.set(el, el.textContent);
  });
  document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
    original.html.set(el, el.innerHTML);
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
    // Format : data-i18n-attr="nom-attribut:cle"
    const [attr] = el.dataset.i18nAttr.split(":");
    original.attrs.set(el, el.getAttribute(attr));
  });

  function translate(key, fallback, lang) {
    if (lang !== "en") return fallback;
    if (key in TRANSLATIONS_EN) return TRANSLATIONS_EN[key];
    console.warn("Traduction manquante : " + key);
    return fallback;
  }

  function setLanguage(lang) {
    original.text.forEach(function (fr, el) {
      el.textContent = translate(el.dataset.i18n, fr, lang);
    });
    original.html.forEach(function (fr, el) {
      // Les traductions viennent de notre propre fichier i18n.js : innerHTML est sûr ici.
      el.innerHTML = translate(el.dataset.i18nHtml, fr, lang);
    });
    original.attrs.forEach(function (fr, el) {
      const [attr, key] = el.dataset.i18nAttr.split(":");
      el.setAttribute(attr, translate(key, fr, lang));
    });

    document.documentElement.lang = lang;
    document.title = translate("meta.title", original.title, lang);
    if (metaDescription) {
      metaDescription.content = translate("meta.description", original.description, lang);
    }

    langButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      // Stockage indisponible (navigation privée…) : le choix ne sera pas mémorisé.
    }
  }

  langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.dataset.lang);
    });
  });

  // Priorité : ?lang=en dans l'URL (lien à partager), puis le dernier choix mémorisé.
  let initialLang = new URLSearchParams(window.location.search).get("lang");
  if (!initialLang) {
    try {
      initialLang = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      initialLang = null;
    }
  }
  if (initialLang === "en") {
    setLanguage("en");
  }

  /* 2. Menu mobile -------------------------------------------------------- */
  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector(".menu-toggle");

  function setMenuOpen(isOpen) {
    header.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.documentElement.classList.toggle("menu-is-open", isOpen);
  }

  menuToggle.addEventListener("click", function () {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  document.querySelectorAll(".site-nav__link").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  // Si on repasse en affichage desktop, le menu mobile ne doit pas rester ouvert.
  window.matchMedia("(min-width: 60em)").addEventListener("change", function (event) {
    if (event.matches) setMenuOpen(false);
  });

  /* 3. Bordure de l'en-tête au défilement --------------------------------- */
  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* 4. Animations d'apparition -------------------------------------------- */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // une seule fois par élément
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* 5. Photo manquante → initiales ---------------------------------------- */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    function showInitials() {
      img.parentElement.classList.add("is-empty");
      img.remove();
    }
    // L'image a pu échouer avant l'exécution de ce script.
    if (img.complete && img.naturalWidth === 0) {
      showInitials();
    } else {
      img.addEventListener("error", showInitials);
    }
  });

  /* 6. Année du pied de page ---------------------------------------------- */
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
})();
