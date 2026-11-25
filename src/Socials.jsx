import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: "facebook",
    className: "sc-facebook",
    description:
      "Descubre nuestras novedades y conoce el lado más dulce de CosmoPods.",
    url: "https://www.facebook.com/cosmopodschoco/",
    button: "Ir a Facebook",
    tag: "Nuestra comunidad",
  },
  {
    name: "Instagram",
    icon: "instagram",
    className: "sc-instagram",
    description:
      "Explora nuestro universo de chocolate, sabores y momentos especiales.",
    url: "https://www.instagram.com/cosmopodschocolate/",
    button: "Ir a Instagram",
    tag: "Un poquito de inspiración",
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    className: "sc-whatsapp",
    description:
      "¿Tienes alguna pregunta? Escríbenos sobre productos y disponibilidad.",
    url: "https://wa.me/50661857715",
    button: "Abrir WhatsApp",
    tag: "Conversemos",
  },
];

function SocialIcon({ name }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: "false",
  };

  if (name === "facebook") {
    return (
      <svg {...commonProps} fill="currentColor">
        <path d="M13.5 21v-8h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5H17V3.4c-.5-.1-1.5-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.6v2H7V13h2.8v8h3.7Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg
        {...commonProps}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  return (
    <svg
      {...commonProps}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.8A8.5 8.5 0 1 1 20.5 11.6Z" />
      <path d="m8.3 7.5 1.4 2.8-1 1c.8 1.6 2 2.8 3.6 3.6l1-1 2.8 1.4c-.3 1.3-1.2 2-2.4 1.7-3.4-.8-6.2-3.6-7-7-.3-1.2.4-2.1 1.6-2.5Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

// Revela el contenido al entrar en pantalla.
// También lo muestra al recibir foco con el teclado.
function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const elements = Array.from(
      container.querySelectorAll("[data-sc-reveal]")
    );

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (
      motionPreference.matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("sc-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.classList.add("sc-pending");
        observer.observe(element);
      }
    });

    const showAll = () => {
      elements.forEach((element) => {
        element.classList.remove("sc-pending");
      });
    };

    const handleFocus = (event) => {
      const element = event.target.closest("[data-sc-reveal]");

      if (element) {
        element.classList.remove("sc-pending");
        observer.unobserve(element);
      }
    };

    const handleMotionChange = () => {
      if (motionPreference.matches) {
        observer.disconnect();
        showAll();
      }
    };

    container.addEventListener("focusin", handleFocus);
    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      observer.disconnect();
      showAll();
      container.removeEventListener("focusin", handleFocus);
      motionPreference.removeEventListener("change", handleMotionChange);
    };
  }, [containerRef]);
}

const styles = `
  .sc-page,
  .sc-page *,
  .sc-page *::before,
  .sc-page *::after {
    box-sizing: border-box;
  }

  .sc-page {
    --sc-ink: #482c24;
    --sc-muted: #6b5147;
    --sc-accent: #a3472c;
    --sc-border: #e8cdbb;

    position: relative;
    isolation: isolate;
    min-height: 100vh;
    min-height: 100svh;
    padding: 24px 24px 40px;
    color: var(--sc-ink);
    background:
      radial-gradient(
        ellipse at 12% 0%,
        #ffe1c7,
        transparent 46%
      ),
      radial-gradient(
        ellipse at 95% 48%,
        #ffe7e2,
        transparent 42%
      ),
      radial-gradient(
        ellipse at 8% 100%,
        #f3efd9,
        transparent 40%
      ),
      #fffbf5;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
  }

  .sc-container {
    width: 100%;
    max-width: 1120px;
    margin-inline: auto;
  }

  .sc-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--sc-border);
  }

  .sc-back {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    min-height: 48px;
    padding: 8px 12px;
    border: 1px solid transparent;
    border-radius: 18px;
    color: var(--sc-ink);
    text-decoration: none;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease;
  }

  .sc-back:hover {
    border-color: var(--sc-border);
    background: #ffffffb3;
  }

  .sc-logo {
    display: block;
    width: 100px;
    height: 72px;
    object-fit: contain;
    transition: transform 0.25s ease;
  }

  .sc-back:hover .sc-logo {
    transform: rotate(-3deg) scale(1.04);
  }

  .sc-back-label {
    font-size: 14px;
    font-weight: 750;
    white-space: nowrap;
  }

  .sc-top-note {
    margin: 0;
    color: var(--sc-muted);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .sc-heading {
    max-width: 780px;
    margin: 62px auto 44px;
    text-align: center;
    animation: sc-enter 0.75s ease-out both;
  }

  .sc-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    max-width: 100%;
    margin: 0 0 24px;
    padding: 10px 16px;
    border: 1px solid #eac6b1;
    border-radius: 999px;
    background: #ffecdf;
    color: #873d28;
    font-size: 11px;
    font-weight: 800;
    line-height: 1.5;
    letter-spacing: 1.8px;
    text-transform: uppercase;
  }

  .sc-eyebrow::before {
    content: "";
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--sc-accent);
    animation: sc-pulse 3s ease-in-out infinite;
  }

  .sc-title {
    margin: 0 0 22px;
    color: var(--sc-ink);
    font-size: clamp(38px, 6vw, 68px);
    font-weight: 850;
    line-height: 1.08;
    letter-spacing: -2.5px;
    overflow-wrap: anywhere;
  }

  .sc-title span {
    display: block;
    margin-top: 8px;
    color: var(--sc-accent);
  }

  .sc-description {
    max-width: 560px;
    margin: 0 auto;
    color: var(--sc-muted);
    font-size: 16px;
    line-height: 1.85;
    text-wrap: pretty;
  }

  .sc-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
  }

  .sc-reveal {
    min-width: 0;
    opacity: 1;
    transform: none;
    transition:
      opacity 0.65s ease,
      transform 0.65s ease;
  }

  .sc-reveal.sc-pending {
    opacity: 0;
    transform: translateY(26px);
  }

  .sc-card {
    --sc-social: #28549a;
    --sc-tint: #e8f0ff;
    --sc-card-end: #f5f8ff;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    height: 100%;
    overflow: hidden;
    padding: 30px 28px 28px;
    border: 1px solid var(--sc-border);
    border-radius: 28px;
    background: linear-gradient(
      155deg,
      #ffffff,
      var(--sc-card-end)
    );
    box-shadow: 0 12px 32px #8354370c;
    transition:
      transform 0.25s ease,
      border-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  .sc-instagram {
    --sc-social: #963a64;
    --sc-tint: #ffe5ee;
    --sc-card-end: #fff5f7;
  }

  .sc-whatsapp {
    --sc-social: #246140;
    --sc-tint: #e2f2df;
    --sc-card-end: #f5faf0;
  }

  .sc-card::before {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 5px;
    background: var(--sc-tint);
  }

  .sc-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    margin-bottom: 25px;
  }

  .sc-icon {
    display: grid;
    place-items: center;
    width: 62px;
    height: 62px;
    flex-shrink: 0;
    border-radius: 20px;
    background: var(--sc-tint);
    color: var(--sc-social);
    transition: transform 0.25s ease;
  }

  .sc-icon svg {
    width: 31px;
    height: 31px;
  }

  .sc-number {
    color: #805941;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .sc-tag {
    margin: 0 0 11px;
    color: var(--sc-social);
    font-size: 10px;
    font-weight: 800;
    line-height: 1.6;
    letter-spacing: 1.4px;
    text-transform: uppercase;
  }

  .sc-card h2 {
    margin: 0 0 14px;
    color: var(--sc-ink);
    font-size: 27px;
    font-weight: 800;
    letter-spacing: -0.7px;
  }

  .sc-card-description {
    margin: 0 0 28px;
    color: var(--sc-muted);
    font-size: 15px;
    line-height: 1.85;
    text-wrap: pretty;
  }

  .sc-link {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    min-height: 52px;
    margin-top: auto;
    padding: 14px 17px;
    border: 1px solid transparent;
    border-radius: 15px;
    background: var(--sc-tint);
    color: var(--sc-social);
    text-decoration: none;
    font-size: 14px;
    font-weight: 800;
    line-height: 1.4;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  .sc-link svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    transition: transform 0.25s ease;
  }

  .sc-link:hover,
  .sc-link:focus-visible {
    border-color: var(--sc-social);
    background: #ffffff;
    color: var(--sc-social);
    box-shadow: 0 5px 14px #5b39200d;
  }

  .sc-link:hover svg {
    transform: translate(2px, -2px);
  }

  .sc-location {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 14px 28px;
    margin-top: 36px;
    padding: 22px;
    border: 1px solid var(--sc-border);
    border-radius: 22px;
    background: #fff4e7;
    color: var(--sc-muted);
    font-size: 13px;
    text-align: center;
    line-height: 1.7;
  }

  .sc-location a {
    color: #873d28;
    font-weight: 750;
    text-decoration: none;
    text-underline-offset: 4px;
  }

  .sc-location a:hover {
    text-decoration: underline;
  }

  .sc-footer-note {
    margin: 24px 0 0;
    color: var(--sc-muted);
    font-size: 12px;
    text-align: center;
    line-height: 1.7;
    letter-spacing: 0.3px;
  }

  .sc-page a:focus-visible {
    outline: 3px solid var(--sc-accent);
    outline-offset: 5px;
  }

  @keyframes sc-enter {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes sc-pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 #a3472c00;
    }
    50% {
      box-shadow: 0 0 0 5px #a3472c15;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .sc-card:hover {
      transform: translateY(-7px);
      border-color: var(--sc-social);
      box-shadow: 0 22px 42px #83543718;
    }

    .sc-card:hover .sc-icon {
      transform: rotate(-6deg) scale(1.06);
    }
  }

  .sc-card:focus-within {
    border-color: var(--sc-social);
    box-shadow: 0 18px 36px #83543714;
  }

  @media (max-width: 900px) {
    .sc-grid {
      grid-template-columns: 1fr;
      max-width: 580px;
      margin-inline: auto;
    }

    .sc-heading {
      margin-top: 44px;
    }
  }

  @media (max-width: 480px) {
    .sc-page {
      padding: 16px 16px 30px;
    }

    .sc-topbar {
      justify-content: center;
      padding-bottom: 12px;
    }

    .sc-top-note {
      display: none;
    }

    .sc-logo {
      width: 85px;
      height: 62px;
    }

    .sc-heading {
      margin: 36px auto 30px;
    }

    .sc-eyebrow {
      font-size: 10px;
      letter-spacing: 1.2px;
    }

    .sc-title {
      letter-spacing: -1.5px;
    }

    .sc-description {
      font-size: 15px;
    }

    .sc-card {
      padding: 26px 22px;
      border-radius: 24px;
    }

    .sc-location {
      flex-direction: column;
      gap: 10px;
      padding: 20px 16px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sc-page *,
    .sc-page *::before,
    .sc-page *::after {
      animation: none !important;
      transition: none !important;
    }

    .sc-reveal.sc-pending {
      opacity: 1;
      transform: none;
    }

    .sc-card:hover,
    .sc-card:hover .sc-icon,
    .sc-back:hover .sc-logo,
    .sc-link:hover svg {
      transform: none;
    }
  }
`;

export default function Socials() {
  const containerRef = useRef(null);

  useScrollReveal(containerRef);

  return (
    <div className="sc-page" lang="es" ref={containerRef}>
      <style>{styles}</style>

      <div className="sc-container">
        <nav className="sc-topbar" aria-label="Navegación principal">
          <Link className="sc-back" to="/mainpagedos">
            <img
              className="sc-logo"
              src="/cosmopops.png"
              alt=""
              width="100"
              height="72"
              loading="eager"
              decoding="async"
            />

            <span className="sc-back-label">Ir a inicio</span>
          </Link>

          <p className="sc-top-note">
            Un universo de chocolate
          </p>
        </nav>

        <main>
          <header className="sc-heading">
            <p className="sc-eyebrow">
              Síguenos y conversemos
            </p>

            <h1 className="sc-title">
              Lo más dulce es
              <span>conectar contigo.</span>
            </h1>

            <p className="sc-description">
              Sé parte del universo CosmoPods. Descubre nuestras
              novedades, encuentra inspiración o escríbenos:
              nos encantará saber de ti.
            </p>
          </header>

          <section
            className="sc-grid"
            aria-label="Redes sociales de CosmoPods"
          >
            {SOCIAL_LINKS.map((social, index) => (
              <div
                className="sc-reveal"
                data-sc-reveal
                key={social.name}
              >
                <article className={`sc-card ${social.className}`}>
                  <div className="sc-card-top">
                    <span className="sc-icon">
                      <SocialIcon name={social.icon} />
                    </span>

                    <span className="sc-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="sc-tag">{social.tag}</p>

                  <h2>{social.name}</h2>

                  <p className="sc-card-description">
                    {social.description}
                  </p>

                  <a
                    className="sc-link"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.button} de CosmoPods (se abre en una pestaña nueva)`}
                  >
                    <span>{social.button}</span>
                    <ArrowIcon />
                  </a>
                </article>
              </div>
            ))}
          </section>
        </main>

        <footer className="sc-reveal" data-sc-reveal>
          <div className="sc-location">
            <span>
              <span aria-hidden="true">🇨🇷 </span>
              Desde Costa Rica, con mucho sabor
            </span>

            <a
              href="https://wa.me/50661857715"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp al +506 6185 7715 (se abre en una pestaña nueva)"
            >
              WhatsApp: +506 6185 7715
            </a>
          </div>

          <p className="sc-footer-note">
            CosmoPods · Pequeños momentos, mucho chocolate.
          </p>
        </footer>
      </div>
    </div>
  );
}