import React from 'react';
import { motion } from 'motion/react';
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { IconBrandBehance } from '@tabler/icons-react';
import Spline from '@splinetool/react-spline';
import { useInView } from 'motion/react';

import imgPlano1 from '../../assets/proyectos/Milo/plano1.jpeg';
import imgPlano2 from '../../assets/proyectos/Milo/plano2.jpeg';
import imgPlano3 from '../../assets/proyectos/Milo/plano3.jpeg';

import './ProjectDetail.css';
import './MiloDetail.css';
import { SplineHint } from '../../components/SplineHint';

/* ── Animation variants ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemFade = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const vp = { once: true, margin: '-80px' };

export function MiloDetail({ project, onBack }) {
  const splineRef = React.useRef(null);
  const isSplineInView = useInView(splineRef, { margin: "200px" });

  if (!project) return null;

  return (
    <div className="project-detail milo-detail-container">
      <div className="project-top-fade" />

      <motion.button
        className="project-back-btn"
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        aria-label="Volver a proyectos"
        style={{ background: 'rgba(249,252,61,0.1)', borderColor: 'rgba(249,252,61,0.3)', color: '#f9fc3d' }}
      >
        ‹
      </motion.button>

      {/* ══ 1. HERO ══════════════════════════════════ */}
      <section className="milo-hero">
        <div className="milo-hero-glow" />

        <motion.span
          className="milo-hero-eyebrow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Estrategia de Diseño · IoT · 2024
        </motion.span>

        <motion.div
          className="milo-hero-title-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <span className="milo-hero-title">MILO</span>
          <span className="milo-hero-title-reflection" aria-hidden="true">MILO</span>
        </motion.div>

        <div className="milo-hero-scroll-cue">
          <span>scroll</span>
          <div className="milo-scroll-line" />
        </div>
      </section>

      {/* ══ 2. RETO ══════════════════════════════════ */}
      <motion.section
        className="milo-reto-section"
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={stagger}
      >
        <div className="milo-reto-bg-text" aria-hidden="true">RETO</div>

        <div className="milo-reto-inner">
          <motion.div className="milo-reto-number" variants={fadeLeft} aria-hidden="true">01</motion.div>

          <div>
            <motion.div className="milo-reto-content" variants={stagger}>
              <motion.span variants={itemFade}>01 · El Reto</motion.span>
              <motion.h2 variants={fadeUp}>RETO</motion.h2>
              <motion.p variants={fadeUp}>
                Comprender las capacidades y limitaciones de sensores y actuadores para materializarlas
                en acciones y características de un objeto inteligente con intención, entendiendo el flujo
                de trabajo y adaptándolas en la creación de aprendizajes significativos y de alto valor.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Render placeholder below reto text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          style={{ maxWidth: '1200px', margin: '60px auto 0' }}
        >
          <div className="milo-render-placeholder" style={{ minHeight: '420px', padding: 0, overflow: 'hidden' }}>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src="https://res.cloudinary.com/dacmlsbqc/video/upload/v1776031468/milo-despiece_optimized_v2_g6bk6x.mp4" type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          </div>
        </motion.div>
      </motion.section>

      {/* ══ 3. CONCEPTO ══════════════════════════════ */}
      <motion.section
        className="milo-concepto-section"
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={stagger}
      >
        <div className="milo-concepto-inner">
          <motion.div className="milo-concepto-header" variants={stagger}>
            <motion.h2 variants={fadeLeft}>
              <span className="skew-highlight">CONCEPTO</span>
            </motion.h2>
            <motion.p className="milo-intro-text" variants={fadeRight}>
              Milo es un robot-mascota interactivo que combina juego, emoción y aprendizaje
              para enseñar a los niños valores como el cuidado y la empatía. Reacciona a la
              luz, al sonido y a la cercanía con expresiones emocionales visibles:
            </motion.p>
          </motion.div>

          <motion.div className="milo-features-grid" variants={stagger}>
            {[
              'Detecta proximidad',
              'Tarjeta de comida',
              'Modo sueño por luz',
            ].map((text) => (
              <motion.div key={text} className="milo-feature-card" variants={itemFade}>
                {text}
              </motion.div>
            ))}
          </motion.div>

          <motion.p className="milo-outro-text" variants={fadeUp}>
            Su propósito es transformar el aprendizaje en una experiencia sensorial y afectiva:
            los niños no solo juegan, sino que aprenden a reconocer y responder a las emociones
            de otro ser, fortaleciendo su <strong>responsabilidad</strong> y <strong>sensibilidad social</strong>.
          </motion.p>
        </div>
      </motion.section>

      {/* ══ 4. RENDER BAND (despiece / interacción) ═ */}
      <section className="milo-render-band">
        <div className="milo-render-band-inner">
          <motion.span
            className="milo-band-label"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          >
            03 · Renders del Producto
          </motion.span>
          <motion.h2
            className="milo-band-heading"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          >
            El robot en detalle
          </motion.h2>

          <motion.div
            className="milo-render-split"
            variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
          >
            <motion.div 
              className="milo-render-placeholder" 
              variants={fadeLeft} 
              ref={splineRef}
              style={{ minHeight: '450px', padding: 0, overflow: 'hidden' }}
            >
              <div className="spline-nologo-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
                {isSplineInView ? (
                  <SplineHint>
                    <Spline scene="https://prod.spline.design/zoynXt5ZqJhOh84Y/scene.splinecode" />
                  </SplineHint>
                ) : (
                  <div style={{ background: 'var(--milo-surface-2)', width: '100%', height: '100%' }} />
                )}
              </div>
            </motion.div>
            <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <motion.div className="milo-render-placeholder" variants={itemFade} style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
                <img 
                  src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1775767446/WhatsApp_Image_2026-04-02_at_6.11.05_PM_s4ko8k.jpg" 
                  alt="Milo Detalle Render" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </motion.div>
              <motion.div className="milo-render-placeholder" variants={itemFade} style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
                <img 
                  src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1775767843/WhatsApp_Image_2026-04-02_at_6.11.05_PM_1_x7tjxc.jpg" 
                  alt="Milo en contexto" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ 5. PLANOS ════════════════════════════════ */}
      <section className="milo-planos-section">
        <div className="milo-planos-inner">
          <motion.div
            className="milo-planos-header"
            variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
          >
            <motion.h2 variants={fadeLeft}>PLANOS</motion.h2>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          >
            <AnimatedTestimonials
              testimonials={[
                { src: imgPlano1 },
                { src: imgPlano2 },
                { src: imgPlano3 },
              ]}
              autoplay={true}
              variant="planos"
              showText={false}
              arrowColor="#f9fc3d"
              arrowBorder="rgba(249,252,61,0.3)"
              arrowHoverBg="rgba(249,252,61,0.15)"
            />
          </motion.div>
        </div>
      </section>

      {/* ══ 6. COMPONENTES ═══════════════════════════ */}
      <motion.section
        className="milo-componentes-section"
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={stagger}
      >
        <div className="milo-comp-inner">
          <motion.h2 className="milo-comp-heading" variants={fadeUp}>
            Com<em>pon</em>entes
          </motion.h2>
          <div className="milo-comp-divider" />

          <div className="milo-comp-grid">
            {/* Sensores */}
            <motion.div className="milo-hardware-card" variants={fadeLeft}>
              <h3><span className="hw-count">01</span> Sensores</h3>
              <ul className="milo-hardware-list">
                <li>
                  <div className="hw-dot" />
                  <div><strong>Ultrasonido (proximidad):</strong> detecta cuando algo está cerca y lo evita.</div>
                </li>
                <li>
                  <div className="hw-dot" />
                  <div><strong>LDR (fotorresistencia):</strong> simula día/noche para enseñar ciclo biológico.</div>
                </li>
                <li>
                  <div className="hw-dot" />
                  <div><strong>RFID:</strong> simula el alimento de la mascota y activa modo hiperactivo.</div>
                </li>
              </ul>
            </motion.div>

            {/* Actuadores */}
            <motion.div className="milo-hardware-card" variants={fadeRight}>
              <h3><span className="hw-count">02</span> Actuadores</h3>
              <ul className="milo-hardware-list">
                <li>
                  <div className="hw-dot" />
                  <div><strong>Motores + L298N:</strong> permiten que Milo se mueva emocionado al interactuar.</div>
                </li>
                <li>
                  <div className="hw-dot" />
                  <div><strong>LEDs RGB en la cabeza:</strong> indican estados emocionales por proximidad.</div>
                </li>
                <li>
                  <div className="hw-dot" />
                  <div><strong>Buzzer:</strong> suena para representar hambre y alertar de obstáculos cercanos.</div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ══ 7. FOOTER ════════════════════════════════ */}
      <motion.div
        className="milo-footer"
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={stagger}
      >
        <motion.p className="milo-credits" variants={itemFade}>
          Créditos: Isabella Salazar, Laura S. Velásquez y José M. Pérez
        </motion.p>
        <motion.a
          href="https://www.behance.net/gallery/239426631/MILO-Juguete-Robot"
          target="_blank"
          rel="noreferrer"
          className="milo-behance-btn"
          variants={itemFade}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <IconBrandBehance size={22} stroke={2} />
          Descubre más detalles aquí
        </motion.a>
      </motion.div>

    </div>
  );
}
