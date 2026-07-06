"use client"

const LOGOS = [
  { src: "/Simplytech.png",         alt: "Simplytech"    },
  { src: "/Ricatto.png",            alt: "Ricatto"       },
  { src: "/MXHEALTH.png",           alt: "MX Health"     },
  { src: "/Logo-intela.png",        alt: "Intela"        },
  { src: "/Novogas.png",            alt: "Novogas"       },
  { src: "/Logo_Alertyx_white.png", alt: "Alertyx"       },
  { src: "/Logo.png",               alt: "Logo"          },
  { src: "/Bizhub.png",             alt: "Bizhub"        },
  { src: "/Linkepro.png",           alt: "Linkepro"      },
  { src: "/Factor.png",             alt: "Factor"        },
  { src: "/BrisSandoval.png",       alt: "Bris Sandoval" },
  { src: "/Abogados.png",           alt: "Abogados"      },
  { src: "/Clarioblanco.png",           alt: "Clarioblanco"      },
]

export default function TrustedBrands() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .trusted-section {
          padding: 60px 0;
          background-color: #1b2436;
          overflow: hidden;
        }
        .trusted-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
          padding: 0 16px;
        }
        .trusted-label {
          margin: 0;
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.12em;
        }
        .trusted-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.35);
          border-radius: 999px;
          padding: 4px 14px 4px 10px;
          font-size: 12px;
          font-weight: 600;
          color: #4ade80;
          letter-spacing: 0.04em;
        }
        .trusted-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
          display: inline-block;
        }
        .logo-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .logo-track:hover {
          animation-play-state: paused;
        }
        .logo-slot {
          width: 140px;
          height: 88px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 40px;
        }
        .logo-slot img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0.35;
          filter: grayscale(1);
          transition: opacity 0.2s;
        }
        .logo-slot img:hover {
          opacity: 0.8;
        }
        @media (max-width: 767px) {
          .trusted-section { padding: 32px 0; }
          .logo-slot { width: 110px; height: 64px; margin-right: 28px; }
        }
      `}</style>

      <section className="trusted-section">
        <div className="trusted-header">
          <p className="trusted-label">EMPRESAS QUE YA TRANSFORMARON SU NÓMINA</p>
          <span className="trusted-badge">
            <span className="trusted-badge-dot" />
            +9 clientes nuevos 
          </span>
        </div>

        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div className="logo-track">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} className="logo-slot">
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}