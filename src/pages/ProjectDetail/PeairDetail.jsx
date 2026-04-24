import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { IconBrandBehance } from '@tabler/icons-react';
import './ProjectDetail.css';
import './PeairDetail.css';
import { SplineHint } from '../../components/SplineHint';

/* ── Variants ── */
const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } };
const fadeLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } };
const fadeRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const itemFade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const vp = { once: true, margin: '-60px' };

export function PeairDetail({ project, onBack }) {
  const splineRef1 = useRef(null);
  const splineRef2 = useRef(null);
  const isSplineInView1 = useInView(splineRef1, { margin: "200px" });
  const isSplineInView2 = useInView(splineRef2, { margin: "200px" });

  if (!project) return null;

  return (
    <div className="project-detail peair-detail-container">
      <div className="project-top-fade" />

      <motion.button
        className="project-back-btn"
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        aria-label="Volver a proyectos"
        style={{ background: 'rgba(26,107,40,0.18)', borderColor: 'rgba(26,107,40,0.45)', color: '#1a6b28' }}
      >
        ‹
      </motion.button>

      {/* ══ 1. HERO ══════════════════════════════ */}
      <section className="peair-hero">
        <motion.span
          className="peair-hero-eyebrow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Diseño Industrial · Colección · 2024
        </motion.span>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <span className="peair-hero-title">PEAIR</span>
          <span className="peair-hero-title-reflection" aria-hidden="true">PEAIR</span>
        </motion.div>

        <div className="peair-scroll-cue">
          <span>scroll</span>
          <div className="peair-scroll-line" />
        </div>
      </section>

      {/* ══ WAVE ═══════════════════════════════ */}
      <div className="peair-wave-top">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,45 C200,90 400,0 600,45 C800,90 1050,10 1200,50 C1300,75 1380,30 1440,45 L1440,90 L0,90 Z" />
        </svg>
      </div>

      {/* ══ 2. CONTEXT ══════════════════════════ */}
      <section className="peair-context-section">
        <motion.div
          className="peair-context-inner"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
        >
          {/* Parchment card */}
          <motion.div variants={fadeLeft}>
            <div className="peair-parchment-card">
              <p>
                El fenómeno de Plants vs. Zombies dejó una huella profunda. Muchos fans, hoy adultos,
                buscan integrar esos recuerdos en sus espacios modernos. Peair es la respuesta.
              </p>
              <p>
                Más que una figura, es un aliado cotidiano. Diseñado para acompañar al fan en cada
                etapa de su vida, Peair evoluciona:
              </p>
              <ul className="peair-evolution-list">
                {[
                  { stage: 'Infancia', desc: 'El recuerdo de la pantalla.' },
                  { stage: 'Juventud', desc: 'La figura de colección.' },
                  { stage: 'Madurez', desc: 'El dispositivo tecnológico que refresca tu mesa de trabajo.' },
                ].map(({ stage, desc }) => (
                  <li key={stage}>
                    <div className="pvz-bullet" />
                    <div className="peair-evo-item">
                      <strong>{stage}:</strong> {desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Render placeholder */}
          <motion.div variants={fadeRight}>
            <div className="peair-render-slot" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1776032858/WhatsApp_Image_2026-04-02_at_6.12.47_PM_rp1pux.jpg"
                alt="Peair en su contexto"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: 'inherit'
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ WAVE orange ════════════════════════ */}
      <div className="peair-wave-bottom" style={{ background: 'var(--pvz-green)' }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ fill: 'var(--pvz-orange)' }}>
          <path d="M0,0 C300,90 600,0 900,60 C1050,90 1250,20 1440,50 L1440,90 L0,90 Z" />
        </svg>
      </div>

      {/* ══ 3. PRODUCT ══════════════════════════ */}
      <section className="peair-product-section">
        <motion.div
          className="peair-product-header"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
        >
          <motion.p variants={itemFade}>02 · El Producto</motion.p>
          <motion.h2 variants={fadeUp}>Un ventilador<br />con personalidad</motion.h2>
        </motion.div>

        {/* Split 1 — Render left, text right */}
        <motion.div
          className="peair-product-inner"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
        >
          <motion.div variants={fadeLeft}>
            <div className="peair-render-slot-orange" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1776032857/WhatsApp_Image_2026-04-02_at_6.12.50_PM_kdgl25.jpg"
                alt="Detalle de Peair"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: 'inherit'
                }}
              />
            </div>
          </motion.div>
          <motion.div className="peair-product-text" variants={fadeRight}>
            <span className="peair-product-label">Diseño Compacto</span>
            <h3>Refrescante y<br />reconocible</h3>
            <p>
              Con diseño inspirado en videojuegos, pensado para refrescar y darle personalidad a tu espacio.
              Cada curva de Peair existe por dos razones: funcionar y sorprender.
            </p>
          </motion.div>
        </motion.div>

        {/* Split 2 — text left, Render right */}
        <motion.div
          className="peair-product-inner reverse"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
        >
          <motion.div className="peair-product-text" variants={fadeLeft}>
            <span className="peair-product-label">03 · Empaque</span>
            <h3>La Caja<br />de Peair</h3>
            <p>
              El empaque prolonga la experiencia del coleccionista. Cada elemento gráfico
              refuerza el universo Plants vs. Zombies y posiciona Peair como pieza de edición especial.
            </p>
          </motion.div>
          <motion.div variants={fadeRight}>
            <div className="peair-render-slot-orange" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1776032856/WhatsApp_Image_2026-04-02_at_6.12.42_PM_t7cym8.jpg"
                alt="Perspectiva de Peair"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: 'inherit',
                  transform: 'scale(1.3) translateY(-30px)'
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ WAVE dark ══════════════════════════ */}
      <div className="peair-wave-bottom" style={{ background: 'var(--pvz-orange-deep)' }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ fill: 'var(--pvz-deeper-green)' }}>
          <path d="M0,20 C400,90 800,0 1100,55 C1250,85 1360,20 1440,40 L1440,90 L0,90 Z" />
        </svg>
      </div>

      {/* ══ 4. PACKAGING ════════════════════════ */}
      <section className="peair-packaging-section">
        <div className="peair-packaging-inner">
          <motion.div
            className="peair-packaging-header"
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger}
          >
            <div>
              <motion.span className="peair-section-label" variants={itemFade}>04 · Experiencia</motion.span>
              <motion.h2 className="peair-section-heading" variants={fadeUp}>Aire con<br />identidad</motion.h2>
            </div>
            <motion.p className="peair-packaging-desc" variants={fadeRight}>
              Su diseño único transforma el aire en una experiencia visual llamativa, ideal para
              escritorios, habitaciones y espacios creativos.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fadeUp}
          >
            <div className="peair-final-grid">
              <div 
                className="peair-render-slot-dark" 
                ref={splineRef1}
                style={{ padding: 0, position: 'relative', overflow: 'hidden' }}
              >
                {isSplineInView1 ? (
                  <SplineHint>
                    <Spline scene="https://prod.spline.design/Cvvx3qTJricA9uWI/scene.splinecode" />
                  </SplineHint>
                ) : (
                  <div className="spline-placeholder">
                    <span className="slot-label-dark">Cargando Escena 3D...</span>
                  </div>
                )}
              </div>
              <div 
                className="peair-render-slot-dark" 
                ref={splineRef2}
                style={{ padding: 0, position: 'relative', overflow: 'hidden' }}
              >
                {isSplineInView2 ? (
                  <SplineHint>
                    <Spline scene="https://prod.spline.design/xQ4CEqEepGQNe7x8/scene.splinecode" />
                  </SplineHint>
                ) : (
                  <div className="spline-placeholder">
                    <span className="slot-label-dark">Cargando Escena 3D...</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 5. FOOTER ════════════════════════════ */}
      <motion.div
        className="peair-footer"
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={stagger}
      >
        <motion.div className="peair-footer-divider" variants={itemFade} />
        <motion.p className="peair-credits" variants={itemFade}>
          Créditos: Laura Velasquez
        </motion.p>
        <motion.a
          href="https://www.behance.net/gallery/246212159/Peair-Ventilador-decorativo"
          target="_blank"
          rel="noreferrer"
          className="peair-behance-btn"
          variants={itemFade}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <IconBrandBehance size={22} stroke={2} />
          Descubre más en Behance
        </motion.a>
      </motion.div>

    </div>
  );
}
