import React from 'react';
import './ProjectCards.css';

/* ─────────────────────────────────────────────────────────────
   LUMINY CARD
   Dark blue glassmorphism — floating orbs + sensor rings
───────────────────────────────────────────────────────────── */
export function LuminyCard() {
  return (
    <div className="pc-luminy">
      {/* Ambient blobs */}
      <div className="pc-lum-blob pc-lum-blob--1" />
      <div className="pc-lum-blob pc-lum-blob--2" />

      {/* Central sensor ring */}
      <div className="pc-lum-rings">
        <div className="pc-lum-ring pc-lum-ring--3" />
        <div className="pc-lum-ring pc-lum-ring--2" />
        <div className="pc-lum-ring pc-lum-ring--1" />
        <div className="pc-lum-core">
          {/* Pulsing dot */}
          <div className="pc-lum-pulse" />
        </div>
      </div>

      {/* Floating data pills */}
      <div className="pc-lum-pill pc-lum-pill--temp">
        <span className="pc-lum-pill-dot" />
        Temp
      </div>
      <div className="pc-lum-pill pc-lum-pill--hum">
        <span className="pc-lum-pill-dot" />
        Hum
      </div>

      {/* Title */}
      <div className="pc-lum-label">LUMINY</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MILO CARD
   Neo-brutalist yellow/black — scan lines + bold type
───────────────────────────────────────────────────────────── */
export function MiloCard() {
  return (
    <div className="pc-milo">
      {/* Angular accent block */}
      <div className="pc-milo-block pc-milo-block--top" />
      <div className="pc-milo-block pc-milo-block--bot" />

      {/* Ticker dots Top */}
      <div className="pc-milo-ticker pc-milo-ticker--top">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="pc-milo-tick" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>

      {/* Main title with reflection */}
      <div className="pc-milo-hero">
        <span className="pc-milo-title">MILO</span>
        <span className="pc-milo-reflect" aria-hidden="true">MILO</span>
      </div>

      {/* Ticker dots Bottom */}
      <div className="pc-milo-ticker pc-milo-ticker--bot">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="pc-milo-tick" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>
    </div>
  );
}

export function PeairCard() {
  return (
    <div className="pc-peair">
      {/* Sleek rotating turbine/fan blades */}
      <div className="pc-peair-turbine">
        <div className="pc-peair-blade pc-peair-blade--1" />
        <div className="pc-peair-blade pc-peair-blade--2" />
        <div className="pc-peair-blade pc-peair-blade--3" />
        <div className="pc-peair-center-dot" />
      </div>

      {/* Floating elegant airflow lines */}
      <div className="pc-peair-airflow pc-peair-airflow--1" />
      <div className="pc-peair-airflow pc-peair-airflow--2" />

      {/* Title */}
      <div className="pc-peair-label">PEAIR</div>
    </div>
  );
}
