import React from 'react';
import { CldVideo } from '../../components/CldVideo';
import './SobreMiSection.css';

/**
 * SobreMiSection — About me section with Spline background.
 */
export function SobreMiSection() {
  return (
    <div className="section-inner section-sobremi-inner">
      {/* Background Video — liquid gold purple Optimized via Cloudinary */}
      <div className="sobremi-bg-container">
        <CldVideo 
          publicId="assets/fondos/liquid-gold-purple-slow"
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
