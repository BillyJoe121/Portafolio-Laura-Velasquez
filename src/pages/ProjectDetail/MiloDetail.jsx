import React from 'react';
import { motion } from 'motion/react';
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { IconBrandBehance } from '@tabler/icons-react';

import imgPlano1 from '../../assets/proyectos/Milo/plano1.jpeg';
import imgPlano2 from '../../assets/proyectos/Milo/plano2.jpeg';
import imgPlano3 from '../../assets/proyectos/Milo/plano3.jpeg';

import './ProjectDetail.css';
import './MiloDetail.css';

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
  if (!project) return null;

  return (
    <div className="project-detail milo-detail-container">
      <div className="project-top-fade" style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.8) 80px, transparent 100%)' }} />

      <motion.button
        className="project-back-btn"
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
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
          <div className="milo-render-placeholder" style={{ minHeight: '420px' }}>
            <span className="ph-label">Render Principal</span>
            <p className="ph-desc">Espacio para el render del robot Milo — vista hero del producto</p>
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
            <motion.div className="milo-render-placeholder" variants={fadeLeft} style={{ minHeight: '450px' }}>
              <span className="ph-label">Render 02</span>
              <p className="ph-desc">Vista lateral o frontal de Milo en escena</p>
            </motion.div>
            <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <motion.div className="milo-render-placeholder" variants={itemFade} style={{ flex: 1 }}>
                <div className="ph-icon" />
                <span className="ph-label">Render 03</span>
                <p className="ph-desc">Detalle LEDs encendidos o modo activo</p>
              </motion.div>
              <motion.div className="milo-render-placeholder" variants={itemFade} style={{ flex: 1 }}>
                <div className="ph-icon" />
                <span className="ph-label">Render 04</span>
                <p className="ph-desc">Milo en contexto — niño interactuando</p>
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
            <motion.span className="milo-planos-tag" variants={itemFade}>Tech Specs</motion.span>
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
