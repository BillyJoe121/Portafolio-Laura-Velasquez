import React from 'react';
import purpleVideo from '../../assets/fondos/liquid-gold-purple-slow.mp4';
import './SobreMiSection.css';

/**
 * SobreMiSection — About me section with Spline background.
 */
export function SobreMiSection() {
  return (
    <div className="section-inner section-sobremi-inner">
      {/* Background Video — liquid gold purple */}
      <div className="sobremi-bg-container">
        <video 
          src={purpleVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="sobremi-bg-video"
        />
      </div>

      {/* Content overlay */}
      <div className="sobremi-content">
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Acerca de mí</h2>
        {/* Aquí puedes agregar más contenido sobre Laura */}
      </div>
    </div>
  );
}
