import React from 'react';
import { motion } from 'motion/react';
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { IconBrandBehance } from '@tabler/icons-react';
import Spline from '@splinetool/react-spline';
import { useInView } from 'motion/react';
import { CldImage } from '../../components/CldImage';
import { getCldImageUrl } from '../../lib/cloudinary';
import './ProjectDetail.css';
import './LuminyDetail.css';
import { SplineHint } from '../../components/SplineHint';

/* ── Reusable animation variants ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const fadeLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const fadeRight = {
  hidden:  { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const staggerChildren = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemFade = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const vp = { once: true, margin: '-80px' };

export function LuminyDetail({ project, onBack }) {
  const splineRef = React.useRef(null);
  const isSplineInView = useInView(splineRef, { margin: "200px" });

  if (!project) return null;

  return (
    <div className="project-detail luminy-detail-container">
      <div className="project-top-fade" />

      {/* Back button */}
      <motion.button
        className="project-back-btn"
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Volver a proyectos"
        style={{ color: '#fff', borderColor: 'rgba(79,140,247,0.5)', background: 'rgba(79,140,247,0.1)' }}
      >
        ‹
      </motion.button>

      <div className="luminy-scroll-content">

        {/* ══ 1. HERO ══════════════════════════ */}
        <motion.section
          className="luminy-hero"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {/* Background blobs */}
          <div className="luminy-hero-blob blob-1" />
          <div className="luminy-hero-blob blob-2" />

          <motion.span className="luminy-hero-eyebrow" variants={itemFade}>
            Proyecto de Diseño de Producto · 2025
          </motion.span>

          <motion.h1 className="luminy-hero-title" variants={itemFade}>
            {project.title}
          </motion.h1>

          {/* Scroll indicator */}
          <div className="luminy-hero-scroll-cue">
            <span>scroll</span>
            <div className="luminy-scroll-line" />
          </div>
        </motion.section>

        {/* ══ 2. CONCEPTO ══════════════════════ */}
        <section className="luminy-concept-section">
          <div className="luminy-concept-inner">
            {/* Left: text */}
            <motion.div
              className="luminy-concept-text-col"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              <span className="luminy-concept-label">01 · Concepto</span>
              <h2 className="luminy-concept-heading">Donde la planta<br/>habla contigo</h2>
              {Array.isArray(project.concept) ? (
                project.concept.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>{project.concept}</p>
              )}

            </motion.div>

            {/* Right: render placeholder */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              <div className="luminy-render-placeholder" ref={splineRef} style={{ minHeight: '600px', width: '90%', margin: '0 auto', padding: 0, overflow: 'hidden' }}>
                <div className="spline-nologo-wrapper" style={{ width: '100%', height: '100%' }}>
                  {isSplineInView ? (
                    <SplineHint>
                      <Spline scene={project.splineUrl} />
                    </SplineHint>
                  ) : (
                    <div className="spline-placeholder-optimized" style={{ background: 'var(--milo-surface-2)', width: '100%', height: '100%' }} />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 3. SECOND RENDER BAND (full-width) ══ */}
        <motion.section
          className="luminy-band"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeUp}
        >
          <div className="luminy-band-inner">
            <span className="luminy-band-label">02 · Producto</span>
            <h2 className="luminy-band-heading">El sistema que cuida</h2>
            <div className="luminy-double-render-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              <div className="luminy-render-frame" style={{ height: '500px' }}>
                <img 
                  src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1775771032/WhatsApp_Image_2026-04-02_at_6.10.40_PM_xg3ns0.jpg" 
                  alt="Render visualización de Luminy 1" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="luminy-render-frame" style={{ height: '500px' }}>
                <img 
                  src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1775771031/WhatsApp_Image_2026-04-02_at_6.10.41_PM_rp3rga.jpg" 
                  alt="Render visualización de Luminy 2" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══ 4. BLUE SYSTEM SECTION ══════════ */}
        <motion.section
          className="luminy-system-section"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeUp}
        >
          <div className="luminy-system-card">
            <motion.div
              className="luminy-system-tags"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              {['Dashboard', 'Sensores', 'Actuadores', 'IoT'].map(tag => (
                <motion.span key={tag} className="luminy-system-tag" variants={itemFade}>{tag}</motion.span>
              ))}
            </motion.div>

            <motion.h2
              className="luminy-system-brand"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              Luminy
            </motion.h2>

            <div className="luminy-system-desc">
              <p>
                El dashboard de Luminy permite monitorear el mini invernadero en tiempo real.
                Presenta variables esenciales como temperatura, humedad del aire y del suelo, 
                con alertas inteligentes cuando alguna condición se desvía de los rangos ideales.
              </p>
              <p>
                Su lenguaje visual en LEDs crea un vínculo emocional con la planta: rojo indica
                que necesita atención, verde que todo marcha bien.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ══ 5. PC + DASHBOARD (Split) ════════ */}
        <motion.section
          className="luminy-band"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={staggerChildren}
        >
          <div className="luminy-band-inner luminy-split-band">
            <motion.div variants={fadeLeft} className="luminy-render-frame">
              <CldImage
                publicId="assets/proyectos/Luminy/pc"
                alt="Luminy Dashboard en PC"
              />
            </motion.div>
            <motion.div className="luminy-split-text" variants={fadeRight}>
              <span className="luminy-band-label">03 · Dashboard</span>
              <h3>Tu ventana al mundo de tu planta</h3>
              <p>Desde tu celular o computador puedes monitorear cada variante en tiempo real sin moverte.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* ══ 6. PARTES / MANUAL USO (Split reversed) ══ */}
        <motion.section
          className="luminy-band"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={staggerChildren}
        >
          <div className="luminy-band-inner luminy-split-band reverse">
            <motion.div variants={fadeRight} className="luminy-render-frame">
              <CldImage
                publicId="assets/proyectos/Luminy/partes"
                alt="Partes del Sistema Luminy"
              />
            </motion.div>
            <motion.div className="luminy-split-text" variants={fadeLeft}>
              <span className="luminy-band-label">04 · Manual de Uso</span>
              <h3>Ensámblalo, plántalo, conéctalo</h3>
              <p>Cada parte de Luminy fue diseñada para ensamblarse de forma intuitiva y estética.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* ══ 7. FEATURES GRID 2x2 ════════════ */}
        <section className="luminy-features-section">
          <div className="luminy-features-grid-outer">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              <div className="luminy-features-header">
                <span className="luminy-band-label">05 · Capacidades</span>
                <h3>Desde tu celular puedes:</h3>
              </div>
            </motion.div>

            <motion.div
              className="luminy-feat-cards-grid"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              {[
                { label: 'Temperatura', desc: 'Ver la temperatura en tiempo real' },
                { label: 'Humedad Aire', desc: 'Revisar la humedad del aire' },
                { label: 'Humedad Tierra', desc: 'Revisar la humedad de la tierra' },
                { label: 'Alertas', desc: 'Recibir alertas cuando algo esté fuera de rango' },
              ].map(({ label, desc }) => (
                <motion.div key={label} className="luminy-feat-card" variants={itemFade}>
                  <div className="luminy-feat-card-glow" />
                  <span className="luminy-feat-card-label">{label}</span>
                  <p className="luminy-feat-card-desc">{desc}</p>
                  <div className="luminy-feat-card-dot" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ 8. PROCESO DE DISEÑO (PLANOS) ══ */}
        <section className="luminy-planos-section">
          <motion.div
            className="luminy-planos-inner"
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fadeUp}
          >
            <span className="luminy-band-label">06 · Proceso de Diseño</span>
            <h3 className="luminy-section-heading">Planos y bocetos</h3>
            <AnimatedTestimonials
              testimonials={[
                { src: getCldImageUrl('assets/proyectos/Luminy/plano1') },
                { src: getCldImageUrl('assets/proyectos/Luminy/plano2') },
                { src: getCldImageUrl('assets/proyectos/Luminy/plano3') },
                { src: getCldImageUrl('assets/proyectos/Luminy/plano4') },
                { src: getCldImageUrl('assets/proyectos/Luminy/plano5') },
              ]}
              autoplay={true}
            />
          </motion.div>
        </section>

        {/* ══ 9. CIERRE ════════════════════════ */}
        <motion.section
          className="luminy-closure"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={staggerChildren}
        >
          <motion.div className="luminy-closure-ring" variants={itemFade}>
            <CldImage
              publicId="assets/proyectos/Luminy/cierre"
              alt="Cierre del proyecto Luminy"
            />
          </motion.div>

          <motion.h2 className="luminy-brand-final" variants={fadeUp}>
            Luminy
          </motion.h2>

          <motion.p className="luminy-credits" variants={itemFade}>
            Créditos: Isabella Salazár y Laura Velasquez
          </motion.p>

          <motion.a
            href="https://www.behance.net/gallery/245863281/Maceta-inteligente-Luminy"
            target="_blank"
            rel="noreferrer"
            className="luminy-behance-btn"
            variants={itemFade}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <IconBrandBehance size={22} stroke={1.5} />
            Descubre más detalles aquí
          </motion.a>
        </motion.section>

      </div>
    </div>
  );
}
