import { useEffect, useRef, useState } from "react";

export default function MusicaGlobal() {
  const audioRef = useRef(null);

  const [reproduciendo, setReproduciendo] = useState(false);
  const [volumen, setVolumen] = useState(0.3);
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    let activo = true;

    audio.volume = 0.3;

    // Intentamos iniciar la música al abrir la aplicación.
    // Si el navegador lo bloquea, el botón permite activarla.
    audio.play().catch((playError) => {
      if (!activo) return;

      if (playError.name === "NotAllowedError") {
        // Bloqueo habitual de reproducción automática.
        return;
      }

      if (playError.name !== "AbortError") {
        setError("No se pudo reproducir la música.");
      }
    });

    return () => {
      activo = false;
      audio.pause();
    };
  }, []);

  async function alternarMusica() {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      setError("");
      await audio.play();
    } catch {
      setError(
        "No se pudo reproducir. Revisa que musica.mp3 esté en public."
      );
    }
  }

  function cambiarVolumen(event) {
    const nuevoVolumen = Number(event.target.value);

    setVolumen(nuevoVolumen);

    if (audioRef.current) {
      audioRef.current.volume = nuevoVolumen;
    }
  }

  return (
    <>
      <style>{`
        .mg-player,
        .mg-player * {
          box-sizing: border-box;
        }

        .mg-player {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: min(270px, calc(100vw - 32px));
          padding: 14px;
          border: 1px solid #e4c8b2;
          border-radius: 20px;
          background: #fff9f0;
          color: #482c24;
          box-shadow: 0 10px 30px #683c2420;
          font-family: system-ui, -apple-system, sans-serif;
          animation: mg-aparecer 0.5s ease-out both;
        }

        .mg-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 44px;
          padding: 11px 14px;
          border: 1px solid #dfbda2;
          border-radius: 13px;
          background: #ffe9d3;
          color: #783b25;
          font: inherit;
          font-size: 14px;
          font-weight: 750;
          cursor: pointer;
          transition:
            background-color 0.2s ease,
            transform 0.2s ease;
        }

        .mg-button:hover {
          background: #ffdfbe;
          transform: translateY(-1px);
        }

        .mg-button:focus-visible,
        .mg-volume input:focus-visible {
          outline: 3px solid #a3472c;
          outline-offset: 4px;
        }

        .mg-volume {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #684d40;
          font-size: 12px;
          font-weight: 650;
        }

        .mg-volume input {
          flex: 1;
          min-width: 0;
          accent-color: #a3472c;
          cursor: pointer;
        }

        .mg-error {
          margin: 0;
          color: #94352b;
          font-size: 12px;
          line-height: 1.5;
        }

        @keyframes mg-aparecer {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .mg-player {
            right: 10px;
            bottom: 10px;
            width: 200px;
            padding: 10px;
          }

          .mg-button {
            min-height: 36px;
            padding: 8px 10px;
            font-size: 12px;
          }

          .mg-volume {
            font-size: 10px;
          }

          .mg-volume input {
            min-width: 40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mg-player {
            animation: none;
          }

          .mg-button {
            transition: none;
          }

          .mg-button:hover {
            transform: none;
          }
        }
      `}</style>

      <audio
        ref={audioRef}
        src="/musica.mp3"
        loop
        preload="auto"
        onPlay={() => {
          setReproduciendo(true);
          setError("");
        }}
        onPause={() => setReproduciendo(false)}
        onError={() => {
          setReproduciendo(false);
          setError(
            "No se pudo cargar public/musica.mp3."
          );
        }}
        autoPlay
      />

      {error && (
        <p className="mg-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}