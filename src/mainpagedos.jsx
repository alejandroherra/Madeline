import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./MainPageDos.css";

const CONTENT = {
  es: {
    navigation: [
      { label: "Inicio", href: "/" },
      { label: "Redes sociales", href: "/socials" },
      { label: "Contáctanos", href: "/contact" },
      { label: "Quiénes somos", href: "/quienes-somos" },
    ],
    navigationLabel: "Navegación principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageLabel: "Seleccionar idioma",
    skipLink: "Ir al contenido",

    hero: {
      eyebrow: "Cacao · Naturaleza · Costa Rica",
      description:
        "CosmoPods combina el cacao y la creatividad en una propuesta de chocolates para descubrir sabores y disfrutar los pequeños momentos.",
      detail:
        "El chocolate es el punto de partida: su aroma, su textura y su sabor invitan a hacer una pausa y apreciar cada detalle.",
      primary: "Descubre CosmoPods",
      secondary: "Explora nuestra propuesta",
      imageAlt: "Presentación de CosmoPods",
      imageCaption: "Un pequeño chocolate. Un universo de sabores.",
      badge: "Un momento para disfrutar",
    },

    product: {
      eyebrow: "Descubre el producto",
      title: "CosmoPods: el cacao como protagonista.",
      description:
        "Nuestra propuesta gira alrededor del chocolate y las posibilidades que ofrece el cacao. Una experiencia para quienes disfrutan explorar sabores y compartir algo diferente.",
      detail:
        "Cada presentación puede tener una composición distinta. Consulta sus ingredientes y características para elegir la opción que se adapte a tus preferencias.",
      imageAlt: "Presentación de chocolates CosmoPods",
      tags: [
        "Chocolate",
        "Cacao",
        "Sabores por descubrir",
        "Momentos para compartir",
      ],
    },

    quality: {
      eyebrow: "Sabor y calidad",
      title: "Una experiencia que se aprecia en los detalles.",
      description:
        "Al elegir un chocolate, el sabor, la textura y la información del producto forman parte de la experiencia.",
      cards: [
        {
          number: "01",
          icon: "✳",
          title: "El sabor del cacao",
          description:
            "El cacao aporta identidad al chocolate. Disfrutarlo con calma permite prestar atención a sus aromas y a los matices de cada combinación.",
        },
        {
          number: "02",
          icon: "✦",
          title: "Textura y presentación",
          description:
            "La experiencia también está en cómo se presenta y se disfruta el producto. Una invitación a apreciar cada bocado.",
        },
        {
          number: "03",
          icon: "♡",
          title: "Una elección informada",
          description:
            "Consulta la composición de cada presentación. Los ingredientes y alérgenos son información importante antes de elegir.",
        },
      ],
    },

    moments: {
      eyebrow: "Encuentra tu momento",
      title: "Para una pausa, un regalo o un encuentro.",
      description:
        "Un chocolate puede acompañar una conversación, convertirse en un detalle para alguien especial o formar parte de un momento para ti.",
      detail:
        "CosmoPods invita a disfrutar el presente a través del sabor, sin necesidad de una ocasión especial.",
      cards: [
        {
          number: "01",
          icon: "☀",
          title: "Disfruta con calma",
          description:
            "Dedica un momento a apreciar el aroma, la textura y el sabor del chocolate.",
        },
        {
          number: "02",
          icon: "♡",
          title: "Comparte un detalle",
          description:
            "Una reunión o una conversación pueden ser una oportunidad para compartir y descubrir sabores.",
        },
        {
          number: "03",
          icon: "✧",
          title: "Conoce tu presentación",
          description:
            "Revisa los ingredientes, la fecha y las indicaciones de conservación que aparecen en el empaque.",
        },
      ],
    },

    contact: {
      eyebrow: "Sigamos conversando",
      title: "¿Quieres conocer más de CosmoPods?",
      description:
        "Descubre nuestras redes o escríbenos. Nos encantará saber de ti.",
      primary: "Contáctanos",
      secondary: "Ver redes sociales",
    },

    footer: {
      tagline: "Cacao con raíces. Sabores por descubrir.",
      note:
        "Consulta los ingredientes, alérgenos y recomendaciones de conservación de cada producto antes de consumirlo.",
    },
  },

  en: {
    navigation: [
      { label: "Home", href: "/" },
      { label: "Social media", href: "/socials" },
      { label: "Contact us", href: "/contact" },
      { label: "About us", href: "/quienes-somos" },
    ],
    navigationLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Select language",
    skipLink: "Skip to content",

    hero: {
      eyebrow: "Cacao · Nature · Costa Rica",
      description:
        "CosmoPods brings together cacao and creativity in a chocolate concept made for discovering flavors and enjoying small moments.",
      detail:
        "Chocolate is the starting point: its aroma, texture, and flavor invite you to pause and appreciate each detail.",
      primary: "Discover CosmoPods",
      secondary: "Explore our approach",
      imageAlt: "CosmoPods presentation",
      imageCaption: "A small chocolate. A universe of flavors.",
      badge: "A moment to enjoy",
    },

    product: {
      eyebrow: "Discover the product",
      title: "CosmoPods: cacao at the heart.",
      description:
        "Our concept revolves around chocolate and the possibilities cacao offers. An experience for those who enjoy exploring flavors and sharing something different.",
      detail:
        "Each presentation may have a different composition. Check its ingredients and characteristics to choose an option that suits your preferences.",
      imageAlt: "CosmoPods chocolate presentation",
      tags: [
        "Chocolate",
        "Cacao",
        "Flavors to discover",
        "Moments to share",
      ],
    },

    quality: {
      eyebrow: "Flavor and quality",
      title: "An experience found in the details.",
      description:
        "When choosing chocolate, flavor, texture, and product information are all part of the experience.",
      cards: [
        {
          number: "01",
          icon: "✳",
          title: "The flavor of cacao",
          description:
            "Cacao gives chocolate its identity. Taking your time allows you to notice its aromas and the nuances of each combination.",
        },
        {
          number: "02",
          icon: "✦",
          title: "Texture and presentation",
          description:
            "The experience also includes how the product is presented and enjoyed. An invitation to appreciate each bite.",
        },
        {
          number: "03",
          icon: "♡",
          title: "An informed choice",
          description:
            "Check the composition of each presentation. Ingredients and allergens are important information before choosing.",
        },
      ],
    },

    moments: {
      eyebrow: "Find your moment",
      title: "For a pause, a gift, or a gathering.",
      description:
        "Chocolate can accompany a conversation, become a small gift for someone special, or be part of a moment to yourself.",
      detail:
        "CosmoPods invites you to enjoy the present through flavor, without needing a special occasion.",
      cards: [
        {
          number: "01",
          icon: "☀",
          title: "Take your time",
          description:
            "Take a moment to appreciate the chocolate's aroma, texture, and flavor.",
        },
        {
          number: "02",
          icon: "♡",
          title: "Share a small detail",
          description:
            "A gathering or conversation can be an opportunity to share and discover flavors.",
        },
        {
          number: "03",
          icon: "✧",
          title: "Know your presentation",
          description:
            "Check the ingredients, date, and storage instructions shown on the packaging.",
        },
      ],
    },

    contact: {
      eyebrow: "Let's keep in touch",
      title: "Want to learn more about CosmoPods?",
      description:
        "Explore our social media or send us a message. We'd love to hear from you.",
      primary: "Contact us",
      secondary: "Explore social media",
    },

    footer: {
      tagline: "Rooted in cacao. Open to discovery.",
      note:
        "Check each product's ingredients, allergens, and storage recommendations before consuming it.",
    },
  },
};

function Brand({ onClick }) {
  return (
    <Link className="cosmo-logo" to="/" onClick={onClick}>
      <span className="cosmo-logo-symbol" aria-hidden="true">
        ✳
      </span>

      <span>
        Cosmo<span className="cosmo-logo-accent">Pods</span>
      </span>
    </Link>
  );
}

function Cards({ cards, variant = "" }) {
  return (
    <div className="cosmo-values-grid">
      {cards.map((card, index) => (
        <article
          key={card.number}
          className={`cosmo-value-card ${variant}`}
          style={{ "--card-delay": `${index * 90}ms` }}
        >
          <div className="cosmo-card-top">
            <span className="cosmo-card-icon" aria-hidden="true">
              {card.icon}
            </span>

            <span className="cosmo-card-number">
              {card.number}
            </span>
          </div>

          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </article>
      ))}
    </div>
  );
}

export default function MainPageDos() {
  const [language, setLanguage] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const pageRef = useRef(null);

  const location = useLocation();
  const text = CONTENT[language];

  // Cierra el menú cuando cambia la ruta.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Cierra el menú con Escape o al hacer clic fuera.
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function handlePointerDown(event) {
      if (!navRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  // Evita conservar el menú abierto al pasar a escritorio.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 981px)");

    function handleResize() {
      if (media.matches) {
        setMenuOpen(false);
      }
    }

    handleResize();
    media.addEventListener("change", handleResize);

    return () => {
      media.removeEventListener("change", handleResize);
    };
  }, []);

  // Animaciones al entrar en pantalla.
  // Sin IntersectionObserver, el contenido permanece visible.
  useEffect(() => {
    const page = pageRef.current;

    if (
      !page ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const elements = page.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -24px 0px",
      }
    );

    elements.forEach((element) => {
      element.classList.add("cosmo-reveal-ready");
      observer.observe(element);
    });

    return () => {
      observer.disconnect();

      elements.forEach((element) => {
        element.classList.remove("cosmo-reveal-ready", "is-visible");
      });
    };
  }, []);

  function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    setMenuOpen(false);
  }

  function scrollToSection(event, sectionId) {
    // Conserva el comportamiento normal de clics modificados.
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) return;

    event.preventDefault();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    section.focus({ preventScroll: true });
    section.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${sectionId}`);
  }

  return (
    <div className="cosmo-page" lang={language} ref={pageRef}>
      <a className="cosmo-skip-link" href="#main-content">
        {text.skipLink}
      </a>

      <header className="cosmo-header">
        <nav
          ref={navRef}
          className="cosmo-nav cosmo-container"
          aria-label={text.navigationLabel}
        >
          <Brand onClick={() => setMenuOpen(false)} />

          <div className="cosmo-nav-controls">
            <div
              className="cosmo-language"
              role="group"
              aria-label={text.languageLabel}
            >
              <button
                type="button"
                lang="es"
                aria-label="Español"
                aria-pressed={language === "es"}
                onClick={() => changeLanguage("es")}
              >
                ES
              </button>

              <button
                type="button"
                lang="en"
                aria-label="English"
                aria-pressed={language === "en"}
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
            </div>

            <button
              ref={menuButtonRef}
              id="cosmo-menu-toggle"
              type="button"
              className={`cosmo-menu-toggle ${
                menuOpen ? "is-open" : ""
              }`}
              aria-expanded={menuOpen}
              aria-controls="cosmo-navigation"
              aria-label={menuOpen ? text.closeMenu : text.openMenu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <div
            id="cosmo-navigation"
            className={`cosmo-nav-links ${
              menuOpen ? "is-open" : ""
            }`}
            onBlur={(event) => {
              if (!navRef.current?.contains(event.relatedTarget)) {
                setMenuOpen(false);
              }
            }}
          >
            {text.navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `cosmo-nav-link ${isActive ? "is-active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main
        id="main-content"
        className="cosmo-main"
        tabIndex={-1}
      >
        <section
          id="home"
          className="cosmo-hero cosmo-container"
          aria-labelledby="cosmo-hero-title"
        >
          <div className="cosmo-hero-copy">
            <p className="cosmo-eyebrow">
              <span className="cosmo-eyebrow-dot" aria-hidden="true" />
              {text.hero.eyebrow}
            </p>

            <h1 id="cosmo-hero-title">
              Cosmo<span>Pods</span>
              <span className="cosmo-title-star" aria-hidden="true">
                ✦
              </span>
            </h1>

            <p className="cosmo-hero-description">
              {text.hero.description}
            </p>

            <p className="cosmo-hero-detail">
              {text.hero.detail}
            </p>

            <div className="cosmo-actions">
              <a
                href="#product"
                className="cosmo-button cosmo-button-primary"
                onClick={(event) =>
                  scrollToSection(event, "product")
                }
              >
                {text.hero.primary}
                <span aria-hidden="true">↘</span>
              </a>

              <a
                href="#quality"
                className="cosmo-button cosmo-button-outline"
                onClick={(event) =>
                  scrollToSection(event, "quality")
                }
              >
                {text.hero.secondary}
              </a>
            </div>
          </div>

          <figure className="cosmo-hero-figure">
            <div className="cosmo-hero-orbit" aria-hidden="true" />

            <span
              className="cosmo-floating-star cosmo-floating-star-one"
              aria-hidden="true"
            >
              ✳
            </span>

            <span
              className="cosmo-floating-star cosmo-floating-star-two"
              aria-hidden="true"
            >
              ✦
            </span>

            <div className="cosmo-hero-image-wrap">
              <img
                className="cosmo-hero-image"
                src="/cosmopops.png"
                alt={text.hero.imageAlt}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="cosmo-product-badge">
              <span aria-hidden="true">♡</span>
              {text.hero.badge}
            </div>

            <figcaption>
              <span aria-hidden="true">✦</span>
              {text.hero.imageCaption}
            </figcaption>
          </figure>
        </section>

        <section
          id="product"
          className="cosmo-experiences cosmo-section cosmo-container"
          aria-labelledby="cosmo-product-title"
          tabIndex={-1}
          data-reveal
        >
          <div className="cosmo-experience-copy">
            <p className="cosmo-eyebrow">
              {text.product.eyebrow}
            </p>

            <h2 id="cosmo-product-title">
              {text.product.title}
            </h2>

            <p className="cosmo-lead">
              {text.product.description}
            </p>

            <p className="cosmo-body-copy">
              {text.product.detail}
            </p>

            <ul className="cosmo-tags">
              {text.product.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>

          <figure className="cosmo-experience-figure">
            <img
              src="/cosmopod1.jpg"
              alt={text.product.imageAlt}
              loading="lazy"
              decoding="async"
            />

            <span className="cosmo-image-stamp" aria-hidden="true">
              ✳
            </span>
          </figure>
        </section>

        <section
          id="quality"
          className="cosmo-values cosmo-section cosmo-container"
          aria-labelledby="cosmo-quality-title"
          tabIndex={-1}
          data-reveal
        >
          <div className="cosmo-section-heading">
            <p className="cosmo-eyebrow">
              {text.quality.eyebrow}
            </p>

            <h2 id="cosmo-quality-title">
              {text.quality.title}
            </h2>

            <p>{text.quality.description}</p>
          </div>

          <Cards cards={text.quality.cards} />
        </section>

        <section
          className="cosmo-moments cosmo-section cosmo-container"
          aria-labelledby="cosmo-moments-title"
          data-reveal
        >
          <div className="cosmo-section-heading">
            <p className="cosmo-eyebrow">
              {text.moments.eyebrow}
            </p>

            <h2 id="cosmo-moments-title">
              {text.moments.title}
            </h2>

            <p>{text.moments.description}</p>
            <p className="cosmo-moments-detail">
              {text.moments.detail}
            </p>
          </div>

          <Cards
            cards={text.moments.cards}
            variant="cosmo-value-card-soft"
          />
        </section>

        <section
          className="cosmo-contact-section cosmo-container"
          aria-labelledby="cosmo-contact-title"
          data-reveal
        >
          <div className="cosmo-contact-panel">
            <span className="cosmo-contact-star" aria-hidden="true">
              ✳
            </span>

            <div className="cosmo-contact-copy">
              <p className="cosmo-eyebrow">
                {text.contact.eyebrow}
              </p>

              <h2 id="cosmo-contact-title">
                {text.contact.title}
              </h2>

              <p>{text.contact.description}</p>
            </div>

            <div className="cosmo-actions">
              <Link
                to="/contact"
                className="cosmo-button cosmo-button-light"
              >
                {text.contact.primary}
                <span aria-hidden="true">↗</span>
              </Link>

              <Link
                to="/socials"
                className="cosmo-button cosmo-button-ghost"
              >
                {text.contact.secondary}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="cosmo-footer cosmo-container">
        <div className="cosmo-footer-top">
          <div className="cosmo-footer-brand">
            <Brand />
            <p>{text.footer.tagline}</p>
          </div>

          <nav
            className="cosmo-footer-links"
            aria-label={text.navigationLabel}
          >
            {text.navigation
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link key={item.href} to={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>

        <div className="cosmo-footer-bottom">
          <p>© {new Date().getFullYear()} CosmoPods</p>
          <p>{text.footer.note}</p>
        </div>
      </footer>
    </div>
  );
}