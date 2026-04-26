import React, { useState, useEffect } from 'react';
import './MobileGate.css';

/**
 * MobileGate — Shows a "rotate your device" overlay on portrait mobile.
 * On landscape or desktop it renders nothing and the site loads normally.
 */
export function MobileGate() {
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 900;
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowGate(isMobile && isPortrait);
    };

    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  if (!showGate) return null;

  return (
    <div className="mobile-gate" aria-live="polite">
      <div className="mobile-gate__card">
        {/* Rotating phone icon */}
        <div className="mobile-gate__icon-wrap" aria-hidden="true">
          <svg
            className="mobile-gate__phone"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
          </svg>
          <svg
            className="mobile-gate__arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 3H5a2 2 0 0 0-2 2v4" />
            <polyline points="7 3 9 3 9 5" />
          </svg>
        </div>

        <h1 className="mobile-gate__title">Rota tu dispositivo</h1>
        <p className="mobile-gate__subtitle">
          Este portafolio está diseñado para verse en horizontal.<br />
          Gira tu teléfono para la mejor experiencia.
        </p>

      </div>

      {/* Decorative blobs */}
      <div className="mobile-gate__blob mobile-gate__blob--1" aria-hidden="true" />
      <div className="mobile-gate__blob mobile-gate__blob--2" aria-hidden="true" />
    </div>
  );
}
