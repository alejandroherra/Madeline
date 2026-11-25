import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const VALUES = [
  {
    number: "01",
    icon: "🍫",
    title: "El cacao",
    description:
      "El chocolate ocupa un lugar central en CosmoPods: una invitación a apreciar el aroma, la textura y el sabor.",
    className: "qs-card-cacao",
  },
  {
    number: "02",
    icon: "✨",
    title: "La creatividad",
    description:
      "Explorar sabores y formas de presentar el producto es parte de la identidad que queremos compartir.",
    className: "qs-card-creative",
  },
  {
    number: "03",
    icon: "🤎",
    title: "Los momentos compartidos",
    description:
      "Una pausa, una conversación o un detalle para alguien especial. Hay muchas maneras de disfrutar el chocolate.",
    className: "qs-card-moments",
  },
];

// Anima los elementos cuando entran en pantalla.
// Sin IntersectionObserver o con movimiento reducido,
// el contenido permanece visible.
function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const elements = Array.from(
      container.querySelectorAll("[data-qs-reveal]")
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (
      reducedMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const showAll = () => {
      elements.forEach((element) => {
        element.classList.remove("qs-pending");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.remove("qs-pending");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
      }
    );

    elements.forEach((element) => {
      // No ocultamos contenido que ya está en pantalla.
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.classList.add("qs-pending");
        observer.observe(element);
      }
    });

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        observer.disconnect();
        showAll();
      }
    };

    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", handleMotionChange);
      showAll();
    };
  }, [containerRef]);
}

const styles = `
  .qs-page,
  .qs-page *,
  .qs-page *::before,
  .qs-page *::after {
    box-sizing: border-box;
  }

  .qs-page {
    --qs-ink: #44271d;
    --qs-muted: #684d40;
    --qs-accent: #a34225;
    --qs-border: #e5c9af;
    --qs-white: #fffdf9;

    position: relative;
    isolation: isolate;
    min-height: 100vh;
    min-height: 100svh;
    padding: 24px 24px 40px;
    background:
      radial-gradient(
        ellipse at 95% 8%,
        #ffd9b5 0%,
        transparent 44%
      ),
      radial-gradient(
        ellipse at 0% 65%,
        #ffe9c6 0%,
        transparent 42%
      ),
      #fff8ef;
    color: var(--qs-ink);
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
  }

  .qs-container {
    width: 100%;
    max-width: 1120px;
    margin-inline: auto;
  }

  .qs-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--qs-border);
  }

  .qs-back {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    min-height: 48px;
    padding: 8px 12px;
    border: 1px solid transparent;
    border-radius: 18px;
    color: var(--qs-ink);
    text-decoration: none;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease;
  }

  .qs-back:hover {
    border-color: var(--qs-border);
    background: #ffffffb3;
  }

  .qs-logo {
    display: block;
    width: 100px;
    height: 72px;
    object-fit: contain;
    transition: transform 0.25s ease;
  }

  .qs-back:hover .qs-logo {
    transform: rotate(-3deg) scale(1.04);
  }

  .qs-back-label {
    font-size: 14px;
    font-weight: 750;
    white-space: nowrap;
  }

  .qs-top-note {
    margin: 0;
    color: var(--qs-muted);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .qs-hero {
    display: grid;
    grid-template-columns: 1.12fr 0.88fr;
    align-items: center;
    gap: clamp(28px, 5vw, 64px);
    padding: 64px 0 72px;
  }

  .qs-hero-content {
    min-width: 0;
    animation: qs-enter 0.7s ease-out both;
  }

  .qs-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin: 0 0 22px;
    padding: 10px 15px;
    border: 1px solid #eac7a6;
    border-radius: 999px;
    background: #ffedda;
    color: #843b23;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .qs-eyebrow::before {
    content: "";
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--qs-accent);
  }

  .qs-title {
    margin: 0 0 24px;
    color: var(--qs-ink);
    font-size: clamp(38px, 5.8vw, 68px);
    font-weight: 850;
    line-height: 1.08;
    letter-spacing: -2.5px;
    overflow-wrap: anywhere;
  }

  .qs-title span {
    display: block;
    margin-top: 6px;
    color: var(--qs-accent);
  }

  .qs-copy {
    max-width: 580px;
    margin: 0 0 18px;
    color: var(--qs-muted);
    font-size: 16px;
    line-height: 1.85;
    text-wrap: pretty;
  }

  .qs-copy strong {
    color: var(--qs-ink);
    font-weight: 750;
  }

  .qs-location {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
    padding: 12px 18px;
    border: 1px solid var(--qs-border);
    border-radius: 999px;
    background: var(--qs-white);
    color: var(--qs-ink);
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 6px 16px #7f49200a;
  }

  .qs-image {
    position: relative;
    isolation: isolate;
    min-width: 0;
    width: 100%;
    margin: 0;
    padding: clamp(22px, 4vw, 38px);
    border: 1px solid #e8c5a5;
    border-radius: 36px;
    background: linear-gradient(145deg, #fffdf9, #ffe7c9);
    box-shadow:
      0 24px 55px #9d5f2220,
      inset 0 1px 0 #ffffff;
    animation: qs-enter 0.85s ease-out both;
  }

  .qs-image::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 16% 12% 25%;
    border-radius: 50%;
    background: #ffd8a8;
    filter: blur(28px);
    opacity: 0.75;
    pointer-events: none;
  }

  .qs-image-label {
    display: table;
    margin: 0 auto 20px;
    padding: 8px 13px;
    border: 1px solid #e4c3a1;
    border-radius: 999px;
    background: #fffaf2;
    color: #814026;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.6px;
    text-align: center;
    text-transform: uppercase;
  }

  .qs-image-frame {
    display: grid;
    place-items: center;
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  .qs-product-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 16px 16px #844c2320);
    animation: qs-float 5s ease-in-out infinite;
  }

  .qs-image figcaption {
    margin-top: 20px;
    color: var(--qs-ink);
    font-size: 14px;
    font-weight: 650;
    text-align: center;
    line-height: 1.7;
    text-wrap: pretty;
  }

  .qs-values {
    padding-bottom: 12px;
  }

  .qs-section-heading {
    max-width: 650px;
    margin: 0 auto 32px;
    text-align: center;
  }

  .qs-section-kicker {
    margin: 0 0 12px;
    color: var(--qs-accent);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .qs-section-title {
    margin: 0 0 14px;
    color: var(--qs-ink);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 800;
    line-height: 1.18;
    letter-spacing: -1.2px;
    text-wrap: balance;
  }

  .qs-section-copy {
    margin: 0;
    color: var(--qs-muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .qs-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
  }

  .qs-card {
    --qs-card-tint: #fff0db;

    position: relative;
    min-width: 0;
    height: 100%;
    padding: 28px;
    overflow: hidden;
    border: 1px solid var(--qs-border);
    border-radius: 26px;
    background: var(--qs-white);
    box-shadow: 0 10px 28px #83471d0a;
    transition:
      transform 0.25s ease,
      border-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  .qs-card-creative {
    --qs-card-tint: #ffe7df;
  }

  .qs-card-moments {
    --qs-card-tint: #edf2da;
  }

  .qs-card::before {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 5px;
    background: var(--qs-card-tint);
  }

  .qs-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
  }

  .qs-card-icon {
    display: grid;
    place-items: center;
    width: 58px;
    height: 58px;
    flex-shrink: 0;
    border-radius: 18px;
    background: var(--qs-card-tint);
    font-size: 27px;
    transition: transform 0.25s ease;
  }

  .qs-number {
    color: #85543a;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .qs-card h3 {
    margin: 0 0 14px;
    color: var(--qs-ink);
    font-size: 21px;
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.5px;
  }

  .qs-card p {
    margin: 0;
    color: var(--qs-muted);
    font-size: 15px;
    line-height: 1.85;
    text-wrap: pretty;
  }

  .qs-reveal {
    opacity: 1;
    transform: none;
    transition:
      opacity 0.65s ease,
      transform 0.65s ease;
  }

  .qs-reveal.qs-pending {
    opacity: 0;
    transform: translateY(24px);
  }

  .qs-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 14px;
    margin-top: 46px;
    padding-top: 24px;
    border-top: 1px solid var(--qs-border);
    color: var(--qs-muted);
    font-size: 13px;
    line-height: 1.7;
  }

  .qs-bottom p {
    margin: 0;
  }

  .qs-bottom strong {
    color: var(--qs-ink);
  }

  .qs-page a:focus-visible {
    outline: 3px solid var(--qs-accent);
    outline-offset: 5px;
  }

  @keyframes qs-enter {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes qs-float {
    0%, 100% {
      transform: translateY(0) rotate(-1deg);
    }
    50% {
      transform: translateY(-9px) rotate(1deg);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .qs-card:hover {
      transform: translateY(-7px);
      border-color: #c38b5f;
      box-shadow: 0 20px 38px #83471d17;
    }

    .qs-card:hover .qs-card-icon {
      transform: rotate(-7deg) scale(1.08);
    }
  }

  @media (max-width: 900px) {
    .qs-hero {
      grid-template-columns: 1fr;
      gap: 36px;
      padding: 42px 0 54px;
    }

    .qs-hero-content {
      max-width: 680px;
      margin-inline: auto;
    }

    .qs-image {
      max-width: 450px;
      margin-inline: auto;
    }

    .qs-grid {
      grid-template-columns: 1fr;
      max-width: 650px;
      margin-inline: auto;
    }

    .qs-card {
      padding: 28px;
    }
  }

  @media (max-width: 480px) {
    .qs-page {
      padding: 16px 16px 30px;
    }

    .qs-topbar {
      justify-content: center;
      padding-bottom: 12px;
    }

    .qs-top-note {
      display: none;
    }

    .qs-logo {
      width: 85px;
      height: 62px;
    }

    .qs-title {
      letter-spacing: -1.5px;
    }

    .qs-copy {
      font-size: 15px;
    }

    .qs-eyebrow {
      font-size: 10px;
      letter-spacing: 1.5px;
    }

    .qs-image {
      padding: 24px;
      border-radius: 28px;
    }

    .qs-card {
      padding: 24px;
      border-radius: 22px;
    }

    .qs-bottom {
      flex-direction: column;
      align-items: center;
      margin-top: 32px;
      text-align: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .qs-page *,
    .qs-page *::before,
    .qs-page *::after {
      animation: none !important;
      transition: none !important;
    }

    .qs-reveal.qs-pending {
      opacity: 1;
      transform: none;
    }

    .qs-card:hover,
    .qs-card:hover .qs-card-icon,
    .qs-back:hover .qs-logo {
      transform: none;
    }
  }
`;

export default function QuienesSomos() {
  const containerRef = useRef(null);

  useScrollReveal(containerRef);

  return (
    <div className="qs-page" lang="es" ref={containerRef}>
      <style>{styles}</style>

      <div className="qs-container">
        <nav className="qs-topbar" aria-label="Navegación principal">
          <Link className="qs-back" to="/mainpagedos">
            <img
              className="qs-logo"
              src="/cosmopops.png"
              alt=""
              width="100"
              height="72"
              loading="eager"
              decoding="async"
            />

            <span className="qs-back-label">Ir a inicio</span>
          </Link>

          <p className="qs-top-note">
            Un universo de chocolate
          </p>
        </nav>

        <main>
          <section className="qs-hero" aria-labelledby="qs-title">
            <div className="qs-hero-content">
              <p className="qs-eyebrow">Quiénes somos</p>

              <h1 id="qs-title" className="qs-title">
                Conoce el universo
                <span>CosmoPods.</span>
              </h1>

              <p className="qs-copy">
                <strong>Chocolate, creatividad y naturaleza.</strong>{" "}
                CosmoPods reúne estas inspiraciones en una propuesta
                para descubrir sabores y disfrutar el momento.
              </p>

              <p className="qs-copy">
                El cacao es el punto de partida de nuestra identidad.
                Nos inspira la posibilidad de transformar un pequeño
                detalle en una experiencia para compartir.
              </p>

              <div className="qs-location">
                <span aria-hidden="true">🇨🇷</span>
                <span>Costa Rica</span>
              </div>
            </div>

            <figure className="qs-image">
              <span className="qs-image-label">
                Nuestro universo
              </span>

              <div className="qs-image-frame">
                <img
                  className="qs-product-image"
                  src="/cosmopops.png"
                  alt="Presentación de CosmoPods"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <figcaption>
                Un pequeño chocolate.
                <br />
                Un universo de sabores.
              </figcaption>
            </figure>
          </section>

          <section
            className="qs-values"
            aria-labelledby="qs-values-title"
          >
            <header
              className="qs-section-heading qs-reveal"
              data-qs-reveal
            >
              <p className="qs-section-kicker">
                Nuestra esencia
              </p>

              <h2
                id="qs-values-title"
                className="qs-section-title"
              >
                Lo que inspira nuestra propuesta
              </h2>

              <p className="qs-section-copy">
                Tres ideas que dan sentido a nuestro universo
                de chocolate.
              </p>
            </header>

            <div className="qs-grid">
              {VALUES.map((value) => (
                <div
                  className="qs-reveal"
                  data-qs-reveal
                  key={value.number}
                >
                  <article className={`qs-card ${value.className}`}>
                    <div className="qs-card-top">
                      <span className="qs-card-icon" aria-hidden="true">
                        {value.icon}
                      </span>

                      <span className="qs-number" aria-hidden="true">
                        {value.number}
                      </span>
                    </div>

                    <h3>{value.title}</h3>

                    <p>{value.description}</p>
                  </article>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="qs-bottom">
          <p>
            <strong>CosmoPods</strong> · Costa Rica
          </p>

          <p>Pequeños momentos, mucho chocolate.</p>
        </footer>
      </div>
    </div>
  );
}