import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DURACION = 8000;

export default function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      navigate("/mainpagedos");
    }, DURACION);

    return () => {
      window.clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <>
      <style>{`
        .intro-fondo {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 8px;
          overflow: hidden;
          background: #090511;
        }

        /* Imagen y texto comparten el mismo movimiento. */
        .intro-escena {
          position: relative;
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          animation: intro-fondo-flotar 6s ease-in-out infinite;
        }

        .intro-fondo-imagen {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          user-select: none;
        }

        .intro-texto {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 20px;
          text-align: center;
          pointer-events: none;
        }

        .intro-titulo {
          margin: 0;
          max-width: 100%;
          color: #fff5df;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.5rem, 10vw, 7rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.035em;
          text-shadow:
            0 3px 8px rgba(0, 0, 0, 0.8),
            0 8px 30px rgba(0, 0, 0, 0.6);
          animation: intro-texto-aparecer 1.5s ease-out both;
        }

        .intro-subtitulo {
          display: block;
          margin-top: 14px;
          color: #d5ab5c;
          background: #090511;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(0.85rem, 3vw, 1.6rem);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        @keyframes intro-fondo-flotar {
          0%, 100% {
            transform: translate(-3px, 2px);
          }

          50% {
            transform: translate(3px, -2px);
          }
        }

        @keyframes intro-texto-aparecer {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-escena,
          .intro-titulo {
            animation: none;
          }
        }
      `}</style>

      <main className="intro-fondo">
        <div className="intro-escena">
          <img
            className="intro-fondo-imagen"
            src="/fondo.png"
            alt=""
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />

          <div className="intro-texto">
            <h1 className="intro-titulo">
              CosmoPods
              <span className="intro-subtitulo">
                Chocolate
              </span>
            </h1>
          </div>
        </div>
      </main>
    </>
  );
}