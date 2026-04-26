import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { FlipWords } from '../../components/FlipWords';
import Spline from '@splinetool/react-spline';
import './HomeSection.css';

/**
 * HomeSection — Landing section with background video, presentation text, and CTAs.
 */
export function HomeSection({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Observer que resetea la animación cuando sales de la sección
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle isVisible based on intersection
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 } // Se activa cuando un 15% del Home está en pantalla
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const titleWords = ["Donde", "la", "estrategia", "cobra", "forma."];
  const ease = [0.16, 1, 0.3, 1];

  const titleVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
    },
  };

  const paraDelay = 0.5 + 0.6; // delay inicial + tiempo para que el título avance

  const paraVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease, delay: paraDelay },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease, delay: paraDelay + 0.4 },
    },
  };

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
          pointerEvents: 'auto',
        }}
      >
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Nivel 1: Titular */}
          <motion.h1
            variants={titleVariants}
            style={{
              fontFamily: 'Surgena, sans-serif',
              fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
              fontWeight: 500,
              lineHeight: 1.1,
              marginBottom: '24px',
              color: '#28282B',
              transformOrigin: 'left center'
            }}
          >
            Donde la <span style={{ color: '#9013fe' }}>estrategia</span> cobra forma.
          </motion.h1>

          {/* Nivel 2: Subtítulo */}
          <motion.p
            variants={paraVariants}
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
            Soy Laura Velásquez, diseñadora industrial enfocada en transformar ideas
            complejas en soluciones tangibles. Mezclo el rigor del análisis con la
            pasión por el prototipado. Explora cómo convierto la fricción en funcionalidad.
          </motion.p>

          {/* Nivel 3: Llamados a la Acción (CTA) */}
          <motion.div
            variants={ctaVariants}
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

      {/* Spline Background Bottom Right - Replaces previous video */}
      {isVisible && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '130vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}>
          <Spline 
            scene="https://prod.spline.design/yQZuolty99pNi1Td/scene.splinecode" 
          />
        </div>
      )}
    </div>
  );
}
