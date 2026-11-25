import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "50661857715";

const WHATSAPP_MESSAGE =
  "Hola, me gustaría recibir información sobre CosmoPods.";

function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const WHATSAPP_URL = createWhatsAppUrl(WHATSAPP_MESSAGE);

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
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

function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const elements = Array.from(
      container.querySelectorAll("[data-ct-reveal]")
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
            entry.target.classList.remove("ct-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.classList.add("ct-pending");
        observer.observe(element);
      }
    });

    const showAll = () => {
      elements.forEach((element) => {
        element.classList.remove("ct-pending");
      });
    };

    const handleFocus = (event) => {
      const element = event.target.closest("[data-ct-reveal]");

      if (element) {
        element.classList.remove("ct-pending");
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
  .ct-page,
  .ct-page *,
  .ct-page *::before,
  .ct-page *::after {
    box-sizing: border-box;
  }

  .ct-page {
    --ct-ink: #482c24;
    --ct-muted: #6b5147;
    --ct-accent: #a3472c;
    --ct-border: #e8cdbb;
    --ct-green: #246140;
    --ct-green-light: #e4f2df;

    min-height: 100vh;
    min-height: 100svh;
    padding: 24px 24px 40px;
    color: var(--ct-ink);
    background:
      radial-gradient(ellipse at 10% 0%, #ffe0c7, transparent 45%),
      radial-gradient(ellipse at 95% 45%, #ffe8df, transparent 42%),
      radial-gradient(ellipse at 10% 100%, #eff0db, transparent 40%),
      #fffbf5;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
  }

  .ct-container {
    width: 100%;
    max-width: 1120px;
    margin-inline: auto;
  }

  .ct-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--ct-border);
  }

  .ct-back {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    min-height: 48px;
    padding: 8px 12px;
    border: 1px solid transparent;
    border-radius: 18px;
    color: var(--ct-ink);
    text-decoration: none;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease;
  }

  .ct-back:hover {
    border-color: var(--ct-border);
    background: #ffffffb3;
  }

  .ct-logo {
    display: block;
    width: 100px;
    height: 72px;
    object-fit: contain;
    transition: transform 0.25s ease;
  }

  .ct-back:hover .ct-logo {
    transform: rotate(-3deg) scale(1.04);
  }

  .ct-back-label {
    font-size: 14px;
    font-weight: 750;
    white-space: nowrap;
  }

  .ct-top-note {
    margin: 0;
    color: var(--ct-muted);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .ct-heading {
    max-width: 780px;
    margin: 54px auto 38px;
    text-align: center;
    animation: ct-enter 0.75s ease-out both;
  }

  .ct-symbol {
    display: grid;
    place-items: center;
    width: 68px;
    height: 68px;
    margin: 0 auto 22px;
    border-radius: 22px;
    background: var(--ct-green-light);
    color: var(--ct-green);
    animation: ct-float 5s ease-in-out infinite;
  }

  .ct-symbol svg {
    width: 34px;
    height: 34px;
  }

  .ct-eyebrow,
  .ct-kicker {
    margin: 0 0 16px;
    color: var(--ct-accent);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .ct-title {
    margin: 0 0 22px;
    color: var(--ct-ink);
    font-size: clamp(36px, 5.5vw, 64px);
    font-weight: 850;
    line-height: 1.08;
    letter-spacing: -2px;
    overflow-wrap: anywhere;
  }

  .ct-title span {
    display: block;
    margin-top: 6px;
    color: var(--ct-accent);
  }

  .ct-copy {
    max-width: 590px;
    margin: 0 auto;
    color: var(--ct-muted);
    font-size: 16px;
    line-height: 1.85;
    text-wrap: pretty;
  }

  .ct-layout {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    align-items: start;
    gap: 26px;
  }

  .ct-info {
    display: grid;
    gap: 20px;
    min-width: 0;
  }

  .ct-card,
  .ct-form-panel {
    min-width: 0;
    border: 1px solid var(--ct-border);
    border-radius: 28px;
    background: #fffdf9;
    box-shadow: 0 12px 32px #8354370c;
  }

  .ct-card {
    padding: 28px;
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .ct-card-direct {
    background: linear-gradient(145deg, #ffffff, #f0f7e9);
  }

  .ct-card-location {
    background: linear-gradient(145deg, #ffffff, #fff0df);
  }

  .ct-card-queries {
    background: linear-gradient(145deg, #ffffff, #fff0ed);
  }

  .ct-card-icon {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    margin-bottom: 18px;
    border-radius: 16px;
    background: #ffe8d4;
    font-size: 24px;
  }

  .ct-label {
    display: block;
    margin-bottom: 12px;
    color: var(--ct-accent);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.6px;
    text-transform: uppercase;
  }

  .ct-card h2 {
    margin: 0 0 12px;
    color: var(--ct-ink);
    font-size: 23px;
    line-height: 1.25;
    letter-spacing: -0.6px;
  }

  .ct-card p {
    margin: 0;
    color: var(--ct-muted);
    font-size: 14px;
    line-height: 1.85;
  }

  .ct-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    min-height: 54px;
    padding: 15px 18px;
    border: 1px solid transparent;
    border-radius: 16px;
    background: var(--ct-green-light);
    color: var(--ct-green);
    font: inherit;
    font-size: 14px;
    font-weight: 800;
    line-height: 1.4;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease,
      transform 0.25s ease;
  }

  .ct-button svg {
    width: 21px;
    height: 21px;
    flex-shrink: 0;
  }

  .ct-button:hover {
    border-color: var(--ct-green);
    background: #f5fff0;
    color: var(--ct-green);
    transform: translateY(-2px);
  }

  .ct-direct-button {
    margin-top: 22px;
  }

  .ct-card .ct-phone {
    margin-top: 14px;
    text-align: center;
    font-weight: 700;
  }

  .ct-phone a {
    color: var(--ct-green);
    text-decoration: none;
    text-underline-offset: 4px;
  }

  .ct-phone a:hover {
    text-decoration: underline;
  }

  .ct-form-panel {
    padding: 34px;
    background: linear-gradient(160deg, #ffffff, #fff9f1);
  }

  .ct-form-title {
    margin: 0 0 12px;
    color: var(--ct-ink);
    font-size: clamp(26px, 3vw, 34px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.8px;
  }

  .ct-form-description {
    margin: 0 0 26px;
    color: var(--ct-muted);
    font-size: 14px;
    line-height: 1.8;
  }

  .ct-fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 16px;
  }

  .ct-field {
    display: flex;
    flex-direction: column;
    gap: 9px;
    min-width: 0;
  }

  .ct-field-full {
    grid-column: 1 / -1;
  }

  .ct-field label {
    color: var(--ct-ink);
    font-size: 13px;
    font-weight: 750;
    line-height: 1.5;
  }

  .ct-required {
    color: var(--ct-accent);
  }

  .ct-optional {
    color: var(--ct-muted);
    font-size: 12px;
    font-weight: 500;
  }

  .ct-field input,
  .ct-field textarea {
    width: 100%;
    min-width: 0;
    min-height: 50px;
    padding: 13px 15px;
    border: 1px solid #d9bdab;
    border-radius: 14px;
    background: #ffffff;
    color: var(--ct-ink);
    font: inherit;
    font-size: 16px;
    line-height: 1.5;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .ct-field textarea {
    min-height: 135px;
    resize: vertical;
  }

  .ct-field input::placeholder,
  .ct-field textarea::placeholder {
    color: #80685d;
    opacity: 1;
  }

  .ct-field input:focus,
  .ct-field textarea:focus {
    outline: 2px solid var(--ct-accent);
    outline-offset: 2px;
    border-color: var(--ct-accent);
    box-shadow: 0 0 0 5px #a3472c0a;
  }

  .ct-help {
    margin: 0;
    color: var(--ct-muted);
    font-size: 12px;
    line-height: 1.65;
  }

  .ct-submit {
    margin-top: 24px;
  }

  .ct-privacy {
    margin: 14px 0 0;
    color: var(--ct-muted);
    font-size: 12px;
    line-height: 1.75;
    text-align: center;
  }

  .ct-result {
    margin-top: 18px;
    padding: 16px;
    border: 1px solid #bdd6b5;
    border-radius: 14px;
    background: #eff8e9;
    color: #28543a;
    font-size: 13px;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }

  .ct-result p {
    margin: 0;
  }

  .ct-result a {
    display: inline-block;
    margin-top: 8px;
    color: #215137;
    font-weight: 800;
    text-underline-offset: 4px;
  }

  .ct-reveal {
    min-width: 0;
    opacity: 1;
    transform: none;
    transition:
      opacity 0.65s ease,
      transform 0.65s ease;
  }

  .ct-reveal.ct-pending {
    opacity: 0;
    transform: translateY(24px);
  }

  .ct-note {
    max-width: 750px;
    margin: 32px auto 0;
    padding: 18px 22px;
    border: 1px solid var(--ct-border);
    border-radius: 18px;
    background: #fff2e3;
    color: var(--ct-muted);
    text-align: center;
    font-size: 13px;
    line-height: 1.8;
  }

  .ct-footer {
    margin-top: 30px;
    color: var(--ct-muted);
    font-size: 12px;
    line-height: 1.7;
    text-align: center;
  }

  .ct-page a:focus-visible,
  .ct-page button:focus-visible {
    outline: 3px solid var(--ct-accent);
    outline-offset: 5px;
  }

  @keyframes ct-enter {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes ct-float {
    0%, 100% {
      transform: translateY(0) rotate(-2deg);
    }
    50% {
      transform: translateY(-6px) rotate(2deg);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .ct-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 36px #83543715;
    }
  }

  @media (max-width: 900px) {
    .ct-layout {
      grid-template-columns: 1fr;
      max-width: 680px;
      margin-inline: auto;
    }

    .ct-form-wrap {
      grid-row: 1;
    }

    .ct-heading {
      margin-top: 40px;
    }
  }

  @media (max-width: 540px) {
    .ct-page {
      padding: 16px 16px 30px;
    }

    .ct-topbar {
      justify-content: center;
      padding-bottom: 12px;
    }

    .ct-top-note {
      display: none;
    }

    .ct-logo {
      width: 85px;
      height: 62px;
    }

    .ct-title {
      letter-spacing: -1.4px;
    }

    .ct-copy {
      font-size: 15px;
    }

    .ct-form-panel,
    .ct-card {
      padding: 24px 20px;
      border-radius: 24px;
    }

    .ct-fields {
      grid-template-columns: 1fr;
      gap: 18px;
    }

    .ct-button {
      font-size: 13px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ct-page *,
    .ct-page *::before,
    .ct-page *::after {
      animation: none !important;
      transition: none !important;
    }

    .ct-reveal.ct-pending {
      opacity: 1;
      transform: none;
    }

    .ct-card:hover,
    .ct-button:hover,
    .ct-back:hover .ct-logo {
      transform: none;
    }
  }
`;

export default function Contact() {
  const containerRef = useRef(null);
  const [preparedUrl, setPreparedUrl] = useState("");

  useScrollReveal(containerRef);

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Además de la validación del navegador,
    // evitamos campos obligatorios con solo espacios.
    const requiredFields = [
      "name",
      "country",
      "location",
      "phone",
      "comment",
    ];

    for (const fieldName of requiredFields) {
      const field = form.elements.namedItem(fieldName);

      if (!String(formData.get(fieldName) ?? "").trim()) {
        field.setCustomValidity("Completa este campo.");
        field.reportValidity();
        return;
      }
    }

    const getValue = (key) =>
      String(formData.get(key) ?? "").trim();

    const message = [
      "Hola, me gustaría contactar con CosmoPods.",
      "",
      `Nombre: ${getValue("name")}`,
      `País: ${getValue("country")}`,
      `Ubicación: ${getValue("location")}`,
      `Teléfono preferido: ${getValue("phone")}`,
      `Correo: ${getValue("email") || "No indicado"}`,
      "",
      "Comentario:",
      getValue("comment"),
    ].join("\n");

    const url = createWhatsAppUrl(message);

    setPreparedUrl(url);

    // Se ejecuta directamente desde el envío del formulario.
    // El enlace de respaldo queda disponible si no se abre.
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleFormInput(event) {
    event.target.setCustomValidity?.("");

    // Si los datos cambian, quitamos el enlace anterior.
    setPreparedUrl("");
  }

  return (
    <div className="ct-page" lang="es" ref={containerRef}>
      <style>{styles}</style>

      <div className="ct-container">
        <nav className="ct-topbar" aria-label="Navegación principal">
          <Link className="ct-back" to="/mainpagedos">
            <img
              className="ct-logo"
              src="/cosmopops.png"
              alt=""
              width="100"
              height="72"
              loading="eager"
              decoding="async"
            />

            <span className="ct-back-label">Ir a inicio</span>
          </Link>

          <p className="ct-top-note">
            Un universo de chocolate
          </p>
        </nav>

        <main>
          <header className="ct-heading">
            <div className="ct-symbol">
              <WhatsAppIcon />
            </div>

            <p className="ct-eyebrow">Contáctanos</p>

            <h1 className="ct-title">
              Todo comienza con
              <span>una conversación.</span>
            </h1>

            <p className="ct-copy">
              ¿Quieres conocer más sobre CosmoPods? Cuéntanos
              qué buscas y déjanos tus datos para poder
              contactarte.
            </p>
          </header>

          <div className="ct-layout">
            <aside className="ct-info" aria-label="Información de contacto">
              <div className="ct-reveal" data-ct-reveal>
                <section className="ct-card ct-card-direct">
                  <span className="ct-label">Contacto directo</span>

                  <h2>¿Prefieres escribirnos?</h2>

                  <p>
                    También puedes conversar con nosotros
                    directamente por WhatsApp, sin completar
                    el formulario.
                  </p>

                  <a
                    className="ct-button ct-direct-button"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escribir a CosmoPods por WhatsApp (se abre en una pestaña nueva)"
                  >
                    <WhatsAppIcon />
                    <span>Abrir WhatsApp</span>
                    <ArrowIcon />
                  </a>

                  <p className="ct-phone">
                    <a href="tel:+50661857715">
                      +506 6185 7715
                    </a>
                  </p>
                </section>
              </div>

              <div className="ct-reveal" data-ct-reveal>
                <section className="ct-card ct-card-location">
                  <span className="ct-card-icon" aria-hidden="true">
                    📍
                  </span>

                  <span className="ct-label">Ubicación</span>

                  <h2>
                    <span aria-hidden="true">🇨🇷 </span>
                    Costa Rica
                  </h2>

                  <p>
                    Consulta las opciones de entrega o los
                    puntos disponibles antes de realizar
                    tu pedido.
                  </p>
                </section>
              </div>

              <div className="ct-reveal" data-ct-reveal>
                <section className="ct-card ct-card-queries">
                  <span className="ct-card-icon" aria-hidden="true">
                    💬
                  </span>

                  <span className="ct-label">Consultas</span>

                  <h2>Cuéntanos qué buscas</h2>

                  <p>
                    Puedes indicar la presentación que te
                    interesa, la cantidad aproximada o tus
                    preguntas sobre ingredientes y disponibilidad.
                  </p>
                </section>
              </div>
            </aside>

            <div
              className="ct-form-wrap ct-reveal"
              data-ct-reveal
            >
              <section
                className="ct-form-panel"
                aria-labelledby="ct-form-title"
              >
                <p className="ct-kicker">Estamos para escucharte</p>

                <h2 id="ct-form-title" className="ct-form-title">
                  Cuéntanos un poquito de ti
                </h2>

                <p
                  id="ct-form-description"
                  className="ct-form-description"
                >
                  Completa tus datos para preparar tu mensaje.
                  Los campos con * son obligatorios; el correo
                  es opcional.
                </p>

                <form
                  onSubmit={handleSubmit}
                  onInput={handleFormInput}
                  aria-describedby="ct-form-description ct-privacy"
                >
                  <div className="ct-fields">
                    <div className="ct-field ct-field-full">
                      <label htmlFor="ct-name">
                        Nombre completo{" "}
                        <span className="ct-required" aria-hidden="true">
                          *
                        </span>
                      </label>

                      <input
                        id="ct-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="¿Cómo te llamas?"
                        maxLength={100}
                        required
                      />
                    </div>

                    <div className="ct-field">
                      <label htmlFor="ct-country">
                        País{" "}
                        <span className="ct-required" aria-hidden="true">
                          *
                        </span>
                      </label>

                      <input
                        id="ct-country"
                        name="country"
                        type="text"
                        autoComplete="country-name"
                        placeholder="Ej. Costa Rica"
                        maxLength={80}
                        required
                      />
                    </div>

                    <div className="ct-field">
                      <label htmlFor="ct-phone">
                        Teléfono preferido{" "}
                        <span className="ct-required" aria-hidden="true">
                          *
                        </span>
                      </label>

                      <input
                        id="ct-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Ej. +506 8888 8888"
                        aria-describedby="ct-phone-help"
                        maxLength={30}
                        required
                      />

                      <p id="ct-phone-help" className="ct-help">
                        Incluye el código de tu país.
                      </p>
                    </div>

                    <div className="ct-field ct-field-full">
                      <label htmlFor="ct-location">
                        Lugar exacto / ubicación{" "}
                        <span className="ct-required" aria-hidden="true">
                          *
                        </span>
                      </label>

                      <textarea
                        id="ct-location"
                        name="location"
                        autoComplete="street-address"
                        placeholder="Provincia, ciudad, barrio o referencias de tu ubicación"
                        aria-describedby="ct-location-help"
                        rows={3}
                        maxLength={350}
                        required
                      />

                      <p id="ct-location-help" className="ct-help">
                        Para una consulta inicial puedes indicar
                        solo tu zona. Comparte una dirección
                        detallada únicamente si es necesaria
                        para coordinar una entrega.
                      </p>
                    </div>

                    <div className="ct-field ct-field-full">
                      <label htmlFor="ct-email">
                        Correo electrónico{" "}
                        <span className="ct-optional">(opcional)</span>
                      </label>

                      <input
                        id="ct-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="nombre@correo.com"
                        maxLength={150}
                      />
                    </div>

                    <div className="ct-field ct-field-full">
                      <label htmlFor="ct-comment">
                        Tu comentario{" "}
                        <span className="ct-required" aria-hidden="true">
                          *
                        </span>
                      </label>

                      <textarea
                        id="ct-comment"
                        name="comment"
                        placeholder="Cuéntanos qué producto te interesa, qué cantidad buscas o cómo podemos ayudarte…"
                        rows={5}
                        maxLength={1500}
                        required
                      />
                    </div>
                  </div>

                  <button className="ct-button ct-submit" type="submit">
                    <WhatsAppIcon />
                    <span>Continuar en WhatsApp</span>
                    <ArrowIcon />
                  </button>

                  <p id="ct-privacy" className="ct-privacy">
                    Tus datos se incluirán en el mensaje que
                    abrirás en WhatsApp. Revisa el contenido y
                    pulsa Enviar allí para compartirlo con
                    CosmoPods. Esta página no guarda el formulario.
                  </p>

                  <div role="status" aria-live="polite">
                    {preparedUrl && (
                      <div className="ct-result">
                        <p>
                          <strong>Tu mensaje está preparado.</strong>{" "}
                          Todavía debes enviarlo desde WhatsApp.
                          Si no se abrió, utiliza este enlace:
                        </p>

                        <a
                          href={preparedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Abrir mi mensaje en WhatsApp ↗
                        </a>
                      </div>
                    )}
                  </div>
                </form>
              </section>
            </div>
          </div>

          <p className="ct-note">
            Consulta los ingredientes y alérgenos de la
            presentación que te interesa antes de consumirla.
          </p>
        </main>

        <footer className="ct-footer">
          CosmoPods · Costa Rica · Pequeños momentos, mucho chocolate.
        </footer>
      </div>
    </div>
  );
}