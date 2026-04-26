import React from "react";
import { motion } from "framer-motion";
import { TestimonialTooltip } from "../../components/ui/testimonial-tooltip";
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { VideoText } from "../../components/VideoText";
import { getCldVideoUrl } from "../../lib/cloudinary";
import { CldImage } from "../../components/CldImage";
import { ExpandableCards } from "../../components/ExpandableCards";
import "./SobreMiSection.css";

/* ── Data ─────────────────────────────────────────────────── */

const testimonialsData = [
  {
    quote:
      "Tuve la oportunidad de acompañar el proceso académico de Laura Sofía Velásquez en cursos como Diseño Asistido por Computador, Diseño para la Manufactura, Espíritu Empresarial y Plan de Negocio, y puedo dar cuenta de su alto nivel de compromiso y consistencia. Se caracteriza por ser una estudiante ejecutora, laboriosa y con una sólida capacidad de trabajo, siempre orientada al logro y al cumplimiento riguroso de sus objetivos. A lo largo de su formación, demostró ser una persona íntegra, capaz y con una clara habilidad para abordar los proyectos desde un pensamiento sistémico, comprendiendo las relaciones entre contexto, usuario y solución. Además, su actitud receptiva frente a la retroalimentación le ha permitido evolucionar de manera constante. De cara a su proyección laboral, cuenta con el potencial para desempeñarse como un profesional que genera valor desde la innovación, con bases sólidas en el diseño de productos, servicios y experiencias.",
    name: "Andrés Julián Hurtado R.",
    designation: "Cofundador y CEO – Gesta Diseño / 3IN Empresarial | Profesor HC",
    src: "https://res.cloudinary.com/dacmlsbqc/image/upload/f_auto,q_auto,w_600/v1777048180/PAJH_hq_qlqfx9.jpg",
  },
  {
    quote:
      "Laura es una estudiante que se destaca por su disciplina, compromiso y enfoque en cada proyecto que asume. He observado en su trabajo una evolución constante, acompañada de una actitud abierta al aprendizaje y a la mejora continua. Es juiciosa, organizada y altamente responsable con sus procesos, lo que se refleja en propuestas coherentes, una sólida capacidad de trabajo y una motivación genuina por hacer las cosas bien. Sin duda, proyecta un perfil profesional sólido y con gran potencial.",
    name: "Felipe Duque",
    designation: "Director de programa Diseño Industrial | Profesor HC – Departamento de Diseño e Innovación, Universidad Icesi",
    src: "https://res.cloudinary.com/dacmlsbqc/image/upload/f_auto,q_auto,w_600/v1777048180/PFD_hq_ko0tj6.jpg",
  },
];



const formationCards = [
  {
    tag: "Universidad Icesi",
    name: "Diseño Industrial",
    role: "Pregrado universitario — Graduación esperada Nov 2027",
    image:
      "https://res.cloudinary.com/dacmlsbqc/image/upload/v1776049887/icesi-cover_pdflpx.jpg",
    flagship: true,
  },
  {
    tag: "Ganadores HUB",
    name: "Cinco minutos más",
    role: "Líder de estrategia (2025)",
    image:
      "https://res.cloudinary.com/dacmlsbqc/image/upload/v1776051013/Mesa_de_trabajo_2_ps8geu.png",
    bgColor: "#000000",
    imgScale: 1.8,
  },
  {
    tag: "Concurso Nacional",
    name: "Bon Bon Bum",
    role: "Líder creativa (2026)",
    image:
      "https://res.cloudinary.com/dacmlsbqc/image/upload/v1776051398/66572b1da4d79_yk8p9a.png",
    bgColor: "#FFFFFF",
  },
];

const timelineItems = [
  {
    date: "Feb 2026 – Nov 2026",
    role: "Monitora de Dirección",
    desc: "Diseño Industrial, Icesi. Gestión de identidad y redes sociales del programa.",
  },
  {
    date: "Ene 2024 – Nov 2026",
    role: "Diseñadora de Contenido",
    desc: "Icesi Virtual. Conceptualización y diseño de recursos didácticos y UX/UI.",
  },
];

/* ── Animation Variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const revealScale = {
  hidden: { opacity: 0, scale: 0.95, y: 50, filter: "blur(12px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const bgImageVariant = {
  hidden: { opacity: 0, scale: 1.1, rotate: -2, filter: "blur(12px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewportConfig = { once: true, margin: "-60px" };

const videoSrc = getCldVideoUrl("assets/fondos/liquid-gold-purple-slow");

/* ── Arrow Icon ──────────────────────────────────────────── */
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
    />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════ */
export function SobreMiSection({ onNavigate, currentSection }) {
  // Helper to determine if we should animate (no loading gate — show immediately)
  const shouldAnimate = currentSection === 'sobre-mi';

  return (
    <div 
      id="section-sobremi" 
      className="sobremi-container"
    >
      {/* Top Fade */}
      <div className="sobremi-top-fade" />

      {/* ───────────────────────────────────────────────────────
          1. HERO — Acerca de mí
         ─────────────────────────────────────────────────────── */}
      <section className="sobremi-hero">
        <motion.div
          className="sobremi-hero__text"
          style={{ position: 'relative' }}
          variants={fadeRight}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          viewport={viewportConfig}
          custom={0}
        >
          {/* Imagen de fondo difuminada */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            viewport={viewportConfig}
            custom={0.4}
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '-380px',
              zIndex: 0,
              opacity: 0.8,
              pointerEvents: 'none',
            }}
          >
            <img
              src="https://res.cloudinary.com/dacmlsbqc/image/upload/f_auto,q_auto/v1776999122/310508308_b00c14c7-b3a2-4ffd-b53b-67dbb7384c2f_wunjz2.svg"
              alt="Decorative Element"
              style={{
                width: '480px',
                height: 'auto',
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
              }}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            viewport={viewportConfig}
            custom={0}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <VideoText
              videoSrc={videoSrc}
              text="Acerca de mí"
              fontFamily="Surgena, sans-serif"
              fontSize="clamp(3rem, 6vw, 5.5rem)"
              fontWeight={700}
              className="sobremi-hero__title"
            />
          </motion.div>

          <motion.div
            className="sobremi-hero__divider"
            variants={scaleIn}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            viewport={viewportConfig}
            custom={0.15}
            style={{ position: 'relative', zIndex: 1 }}
          />

          <motion.p
            className="sobremi-hero__desc"
            variants={fadeUp}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            viewport={viewportConfig}
            custom={0.2}
            style={{ position: 'relative', zIndex: 1 }}
          >
            Me defino como una diseñadora hacedora. Mi proceso comienza con el análisis riguroso y termina con las manos en el material. En la Universidad Icesi aprendí que la creatividad necesita estructura para ser solución, y mi experiencia en prototipado me permite validar cada idea antes de que llegue al mundo real. Soy quien conecta el "qué pasaría si..." con el "así es como funciona".
          </motion.p>
        </motion.div>

        <motion.div
          className="sobremi-hero__portrait"
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          viewport={viewportConfig}
          style={{ position: 'relative' }}
        >
          {/* Imagen decorativa detrás del marco entero */}
          <motion.div
            variants={bgImageVariant}
            custom={0.5}
            style={{
              position: 'absolute',
              top: '-25%',
              left: '-25%',
              width: '150%',
              height: '150%',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          >
            <img
              src="https://res.cloudinary.com/dacmlsbqc/image/upload/f_auto,q_auto/v1777001662/WhatsApp_Image_2026-04-23_at_10.16.44_PM_diyqhj.png"
              alt="Decorative Background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                mixBlendMode: 'multiply'
              }}
            />
          </motion.div>

          <motion.div
            className="sobremi-hero__portrait-frame"
            variants={fadeLeft}
            custom={0.7}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <CldImage
              publicId="https://res.cloudinary.com/dacmlsbqc/image/upload/f_auto,q_auto/v1776050039/freepik_br_0eee4a49-2084-4fb7-b60e-51d1ef8493af_v8siqp.png"
              alt="Laura Velásquez"
            />
          </motion.div>

          <motion.div
            className="sobremi-hero__badge"
            variants={fadeUp}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            custom={1}
            style={{ zIndex: 2 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="sobremi-hero__badge-number">2+</span>
              <span className="sobremi-hero__badge-label">Años de exp.</span>
            </div>
          </motion.div>
        </motion.div>
      </section>


      {/* ───────────────────────────────────────────────────────
          3–5. DYNAMIC AREA WITH WAVE BACKGROUND
         ─────────────────────────────────────────────────────── */}
      <div className="sobremi-dynamic-bg-wrapper">
        {/* Waves Background */}
        <div className="sobremi-waves-container">
          <svg
            className="sobremi-waves-svg"
            viewBox="0 0 1200 1200"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <g opacity="0.25">
              <path d="M-100,1200 C150,900 350,1100 500,900 C600,800 650,600 600,300 L-100,-100 Z" fill="#f0eefa" opacity="0.4" />
              <path d="M-100,1200 C100,850 250,950 400,750 C500,650 550,550 500,250 L-100,-100 Z" fill="#e2dfee" opacity="0.6" />
              <path d="M-100,1200 C50,750 150,850 300,650 C380,550 420,450 380,150 L-100,-100 Z" fill="#cdc8e8" opacity="0.5" />
              <path d="M-100,1200 C0,650 80,650 200,450 C250,380 280,230 240,0 L-100,-100 Z" fill="#b8b0de" opacity="0.4" />
            </g>
            <g opacity="0.20">
              <path d="M1300,-100 C1050,150 850,-50 700,150 C600,250 550,450 600,750 L1300,1200 Z" fill="#f0eefa" opacity="0.4" />
              <path d="M1300,-100 C1100,250 950,150 800,350 C700,450 650,550 700,850 L1300,1200 Z" fill="#e2dfee" opacity="0.6" />
              <path d="M1300,-100 C1150,350 1050,250 900,450 C820,530 780,680 820,950 L1300,1200 Z" fill="#cdc8e8" opacity="0.5" />
              <path d="M1300,-100 C1200,450 1120,450 1000,650 C950,720 920,870 960,1100 L1300,1200 Z" fill="#b8b0de" opacity="0.4" />
            </g>
          </svg>
        </div>


        {/* ─────────────────────────────────────────────────────
            4. FORMACIÓN & LOGROS — Premium Showcase
           ───────────────────────────────────────────────────── */}
        <section className="sobremi-formation">
          <div className="sobremi-formation__inner">
            <motion.div
              className="sobremi-formation__header"
              variants={fadeUp}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              viewport={viewportConfig}
              custom={0.1}
            >
              <VideoText
                videoSrc={videoSrc}
                text="Logros y Premios"
                fontFamily="Surgena, sans-serif"
                fontSize="clamp(2rem, 4.5vw, 3.5rem)"
                fontWeight={700}
                className="sobremi-formation__title"
              />
              <p className="sobremi-formation__subtitle" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '32px' }}>
                Reconocimientos y hitos que avalan mi capacidad para liderar proyectos innovadores y modelos de negocio ganadores en entornos competitivos.
              </p>
            </motion.div>

            <motion.div
              className="sobremi-formation__showcase"
              style={{ display: 'block' }}
              variants={revealScale}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              viewport={viewportConfig}
              custom={0.3}
            >
              <ExpandableCards />
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────
            5. EXPERIENCIA & TESTIMONIOS
           ───────────────────────────────────────────────────── */}
        <section className="sobremi-experience">
          <div
            className="sobremi-testimonials"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              viewport={viewportConfig}
              custom={0.1}
              style={{ width: '100%' }}
            >
              <VideoText
                videoSrc={videoSrc}
                text="Lo que dicen sobre mí"
                fontFamily="Surgena, sans-serif"
                fontSize="clamp(1.8rem, 4.5vw, 3.5rem)"
                fontWeight={700}
                className="sobremi-timeline__title"
              />
            </motion.div>
            <motion.div 
              className="sobremi-testimonials__wrapper" 
              style={{ maxWidth: '1200px', width: '100%' }}
              variants={revealScale}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              viewport={viewportConfig}
              custom={0.3}
            >
              <AnimatedTestimonials
                testimonials={testimonialsData}
                autoplay={true}
              />
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── Video Pitch ──────────────────────────────────────── */}
      <motion.section
        className="sobremi-pitch"
        variants={fadeUp}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        custom={0.2}
        style={{
          padding: '80px 48px 80px',
          maxWidth: '900px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <p style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#9013fe',
          margin: 0,
          textAlign: 'center',
          lineHeight: 1,
        }}>
          Video Pitch
        </p>
        <h2 style={{
          fontFamily: 'Surgena, sans-serif',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.1,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #9013fe, #b456ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Quien soy en 60 segundos
        </h2>
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 32px 64px -16px rgba(144, 19, 254, 0.15), 0 0 0 1px rgba(144, 19, 254, 0.08)',
          marginTop: '8px',
        }}>
          <iframe
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            src="https://www.youtube.com/embed/2hMkuUaYCcg?rel=0&modestbranding=1&disablekb=1"
            title="Video Pitch – Laura Velásquez"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.section>

      <motion.div
        className="sobremi-cta"
        variants={fadeUp}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        viewport={viewportConfig}
        custom={0.2}
      >
        <p className="sobremi-cta__text">
          ¿Quieres saber más sobre <strong>mi perfil</strong>?
        </p>
        <button 
          className="sobremi-cta__button"
          onClick={() => onNavigate && onNavigate('contacto')}
          style={{
            marginTop: '24px',
            padding: '16px 36px',
            background: 'linear-gradient(135deg, #9013fe, #b456ff)',
            color: '#ffffff',
            borderRadius: '100px',
            fontWeight: 700,
            fontSize: '1.05rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 12px 24px rgba(144, 19, 254, 0.25)',
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(144, 19, 254, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(144, 19, 254, 0.25)';
          }}
        >
          No dudes en contactarme para conversar
        </button>
      </motion.div>
    </div>
  );
}
