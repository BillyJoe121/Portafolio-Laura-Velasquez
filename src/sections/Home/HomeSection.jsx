import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { FlipWords } from '../../components/FlipWords';
import { CldVideo } from '../../components/CldVideo';
import './HomeSection.css';

/**
 * HomeSection — Landing section with background video, presentation text, and CTAs.
 */
export function HomeSection({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Lazy loading logic: only load video when section is near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '300px' } // Start loading 300px before it enters
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const shouldAnimate = true;

  return (
    <div
      ref={sectionRef}
      className="section-home"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '130vh',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 150px)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 150px)',
        paddingTop: '30vh',
      }}
    >
      {/* Texto de Presentación */}
      <div
        className="home-presentation-text"
        style={{
          position: 'absolute',
          left: '10%',
          top: '65%',
          transform: 'translateY(-50%)',
          textAlign: 'left',
          width: '45vw',
          maxWidth: '650px',
          color: '#28282B',
          zIndex: 10,
          pointerEvents: shouldAnimate ? 'auto' : 'none',
        }}
      >
        <motion.div
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 },
            },
          }}
        >
          {/* Nivel 1: Titular */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            style={{
              fontFamily: 'Surgena, sans-serif',
              fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
              fontWeight: 500,
              lineHeight: 1.1,
              marginBottom: '24px',
              color: '#28282B',
            }}
          >
            Donde la <span style={{ color: '#9013fe' }}>estética</span> impulsa
            el negocio.
          </motion.h1>

          {/* Nivel 2: Subtítulo con FlipWords */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: '55ch',
              color: '#4B5563',
              marginBottom: '36px',
            }}
          >
            Desarrollo productos físicos y estrategias de diseño que son{' '}
            <span
              style={{
                display: 'inline-block',
                position: 'relative',
                color: '#9013fe',
                fontWeight: 700,
                fontSize: '1.1em',
                fontFamily: 'Surgena, sans-serif',
              }}
            >
              {/* Texto fantasma invisible para asegurar el tamaño y línea base estricta */}
              <span style={{ visibility: 'hidden' }}>deseables.</span>

              {/* Contenedor animado flotante */}
              <span style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
                {shouldAnimate && (
                  <FlipWords
                    words={['creativas.', 'viables.', 'deseables.']}
                  />
                )}
              </span>
            </span>
            <br />
            Una convergencia exacta entre funcionalidad técnica, experiencia de
            usuario y viabilidad comercial.
          </motion.p>

          {/* Nivel 3: Llamados a la Acción (CTA) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => onNavigate('proyectos')}
              style={{
                backgroundColor: '#9013fe',
                color: '#ffffff',
                padding: '14px 32px',
                borderRadius: '30px',
                fontFamily: 'var(--font-main)',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer',
                display: 'inline-block',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#b44fff')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#9013fe')
              }
            >
              Explorar Proyectos
            </button>
            <button
              onClick={() => onNavigate('sobre-mi')}
              style={{
                backgroundColor: 'transparent',
                color: '#28282B',
                padding: '12px 30px',
                borderRadius: '30px',
                border: '2px solid #28282B',
                fontFamily: 'var(--font-main)',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#9013fe';
                e.currentTarget.style.color = '#9013fe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#28282B';
                e.currentTarget.style.color = '#28282B';
              }}
            >
              Conoce mi proceso
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Background Bottom Right - Optimized via Cloudinary with Lazy Load */}
      {isVisible && (
        <CldVideo
          publicId="hero_bg_optimized_xw8nrh"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '130vh',
            zIndex: 0,
            pointerEvents: 'none',
            objectFit: 'contain',
            objectPosition: 'bottom right',
          }}
        />
      )}
    </div>
  );
}
