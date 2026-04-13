import React from "react";
import { motion } from "framer-motion";
import { PinContainer } from "../../components/ui/3d-pin";
import { TestimonialTooltip } from "../../components/ui/testimonial-tooltip";
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { VideoText } from "../../components/VideoText";
import { getCldVideoUrl } from "../../lib/cloudinary";
import { CldImage } from "../../components/CldImage";
import "./SobreMiSection.css";

/* ── Data ─────────────────────────────────────────────────── */
const idiomas = [
  {
    id: 1,
    name: "    Inglés    ",
    designation: "    Nivel B2    ",
    image:
      "https://res.cloudinary.com/dacmlsbqc/image/upload/v1776046788/united-states-flat-rounded-flag-icon-with-transparent-background-free-png_opdmn1.png",
  },
  {
    id: 2,
    name: "    Italiano    ",
    designation: "    Nivel B1    ",
    image:
      "https://res.cloudinary.com/dacmlsbqc/image/upload/v1776046815/flag-round-250_mzcptl.png",
  },
];

const testimonialsData = [
  {
    quote:
      "La dedicación al detalle diferencial de Laura hizo que nuestro proyecto no solo cumpliera los objetivos, sino que destacara en el HUB.",
    name: "Compañero de Proyecto",
    designation: "Cinco minutos más",
    src: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=3387&auto=format&fit=crop",
  },
  {
    quote:
      "Gran capacidad para comunicar ideas de manera visual y liderar el aspecto creativo de la campaña.",
    name: "Director de Marketing",
    designation: "Concurso Bon Bon Bum",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop",
  },
];

const softSkills = [
  "Liderazgo",
  "Pensamiento analítico",
  "Resiliencia",
  "Comunicación asertiva",
  "Gestión de equipos",
];

const marqueeItems = [
  { text: "Diseño de Producto", accent: false },
  { text: "Prototipado Estratégico", accent: true },
  { text: "Innovación", accent: false },
  { text: "Modelos de Negocio", accent: false },
  { text: "Dirección Creativa", accent: false },
  { text: "UX / UI", accent: true },
  { text: "Investigación", accent: false },
];

const formationCards = [
  {
    tag: "Universidad Icesi",
    name: "Diseño Industrial",
    role: "Pregrado universitario (Nov 2027)",
    image: "https://res.cloudinary.com/dacmlsbqc/image/upload/v1776049887/icesi-cover_pdflpx.jpg",
    placeholder: "CUADRO VACÍO – ICESI",
  },
  {
    tag: "Ganadores HUB",
    name: "Cinco minutos más",
    role: "Líder de estrategia (2025)",
    image: "https://res.cloudinary.com/dacmlsbqc/image/upload/v1776051013/Mesa_de_trabajo_2_ps8geu.png",
    placeholder: "CUADRO VACÍO – PROYECTO 1",
    bgColor: "#000000",
    imgScale: 1.8,
  },
  {
    tag: "Concurso Nacional",
    name: "Bon Bon Bum",
    role: "Líder creativa (2026)",
    image: "https://res.cloudinary.com/dacmlsbqc/image/upload/v1776051398/66572b1da4d79_yk8p9a.png",
    placeholder: "CUADRO VACÍO – PROYECTO 2",
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
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewportConfig = { once: true, margin: "-60px" };

/* ── Placeholder SVG ─────────────────────────────────────── */
const PlaceholderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════ */
export function SobreMiSection() {
  return (
    <div id="section-sobremi" className="sobremi-container">
      {/* ─────────────────────────────────────────────────────
          TOP FADE OVERLAY
         ───────────────────────────────────────────────────── */}
      <div className="sobremi-top-fade" />

      {/* ─────────────────────────────────────────────────────
          1. HERO — Acerca de mí
         ───────────────────────────────────────────────────── */}
      <section className="sobremi-hero">
        <motion.div
          className="sobremi-hero__text"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={0}
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0}
          >
            <VideoText
              videoSrc={getCldVideoUrl('assets/fondos/liquid-gold-purple-slow')}
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
            whileInView="visible"
            viewport={viewportConfig}
            custom={0.15}
          />

          <motion.p
            className="sobremi-hero__desc"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0.2}
          >
            Soy estudiante de{" "}
            <strong>Diseño Industrial</strong> en la Universidad Icesi
            con un enfoque estratégico en la resolución de problemas y
            la creación de modelos de negocio.
          </motion.p>

          <motion.p
            className="sobremi-hero__subdesc"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0.35}
          >
            [ TEXTO DESCRIPTIVO — Aquí irá más texto sobre tu
            resiliencia, comunicación y pasión por la dirección de
            proyectos. ]
          </motion.p>
        </motion.div>

        <motion.div
          className="sobremi-hero__portrait"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={0.2}
        >
          <div className="sobremi-hero__portrait-frame">
            <CldImage 
              publicId="https://res.cloudinary.com/dacmlsbqc/image/upload/v1776050039/freepik_br_0eee4a49-2084-4fb7-b60e-51d1ef8493af_v8siqp.png" 
              alt="Laura Velásquez" 
            />
          </div>

          <motion.div
            className="sobremi-hero__badge"
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "easeInOut",
            }}
          >
            <span className="sobremi-hero__badge-number">2+</span>
            <span className="sobremi-hero__badge-label">Años de exp.</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────
          2. INFINITE MARQUEE
         ───────────────────────────────────────────────────── */}
      <div className="sobremi-marquee">
        <div className="sobremi-marquee__track">
          <motion.div
            className="sobremi-marquee__content"
            animate={{ x: [0, -1400] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 22,
            }}
          >
            {[...Array(2)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                {marqueeItems.map((item, idx) => {
                  const videoUrl = "https://res.cloudinary.com/dacmlsbqc/video/upload/v1776024961/hero_mask_optimized_cmkpry.mp4";

                  return (
                    <React.Fragment key={`${loopIdx}-${idx}`}>
                      <span className="sobremi-marquee__pill">
                        <video
                          src={videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="sobremi-marquee__pill-video"
                        />
                        <span className="sobremi-marquee__pill-text">
                          {item.text}
                        </span>
                      </span>
                      <span className="sobremi-marquee__dot" />
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          3-5. DYNAMIC AREA WITH AURORA BACKGROUND
         ───────────────────────────────────────────────────── */}
      <div className="sobremi-dynamic-bg-wrapper">
        {/* Waves Background (Same as Hero) */}
        <div className="sobremi-waves-container">
          <svg className="sobremi-waves-svg" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
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

        {/* 3. Mis Capacidades */}
        <section className="sobremi-skills">
          <motion.div
            className="sobremi-skills__header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0}
          >
            <VideoText
              videoSrc={getCldVideoUrl('assets/fondos/liquid-gold-purple-slow')}
              text="Mis Capacidades"
              fontFamily="Surgena, sans-serif"
              fontSize="clamp(2rem, 4vw, 3rem)"
              fontWeight={700}
              className="sobremi-skills__title"
            />
            <p className="sobremi-skills__subtitle">
              Un mix entre habilidades técnicas de software 3D y
              habilidades blandas para liderar proyectos con éxito.
            </p>
          </motion.div>

          <motion.div
            className="sobremi-skills__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {/* Column 1: Software & 3D */}
            <motion.div
              className="sobremi-skills__card sobremi-skills__card--software"
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <VideoText
                  videoSrc={getCldVideoUrl('assets/fondos/liquid-gold-purple-slow')}
                  text="Software & 3D"
                  fontFamily="Surgena, sans-serif"
                  fontSize="clamp(1.5rem, 2.5vw, 2.3rem)"
                  fontWeight={700}
                  className="sobremi-skills__card-title"
                />
              </div>
              <div className="sobremi-software-grid">
                <div className="sobremi-software-icon">
                  <img src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1776049774/Genially_new_j6gvhv.svg" alt="Genially" />
                </div>
                <div className="sobremi-software-icon">
                  <img src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1776049523/56199179b42fddf9cef31d4efeb6e76c_ekvvwt.jpg" alt="Canva" />
                </div>
                <div className="sobremi-software-icon">
                  <img src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1776049549/121135_zcixaj.png" alt="Illustrator" />
                </div>
                <div className="sobremi-software-icon">
                  <img src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1776049635/logo-solidworkst-500x500-jpg_pukoq9.jpg" alt="SolidWorks" />
                </div>
              </div>
            </motion.div>

            {/* Column 2: Photo placeholder with floating pills */}
            <motion.div
              className="sobremi-skills__card sobremi-skills__card--photo"
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1776051671/hardworking-carpenter-woman-using-tools-smiling-confidently-young-female-joiner-in-apron-standing-near-workbench-working-in-the-craft-workshop-photo_wgflmq.jpg" 
                alt="Proceso Creativo" 
                className="sobremi-skills__photo-img"
              />
              <div className="sobremi-skills__photo-pills">
                <motion.span 
                  className="sobremi-skills__photo-pill"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Metalurgia
                </motion.span>
                <motion.span 
                  className="sobremi-skills__photo-pill"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Carpintería
                </motion.span>
                <motion.span 
                  className="sobremi-skills__photo-pill"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  Soldadura
                </motion.span>
              </div>
            </motion.div>

            {/* Column 3: Soft Skills + Idiomas */}
            <motion.div
              className="sobremi-skills__col-right"
              variants={staggerItem}
            >
              <motion.div
                className="sobremi-skills__softskills"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <VideoText
                  videoSrc={getCldVideoUrl('assets/fondos/liquid-gold-purple-slow')}
                  text="Soft Skills"
                  fontFamily="Surgena, sans-serif"
                  fontSize="clamp(1.5rem, 2.5vw, 2rem)"
                  fontWeight={700}
                  className="sobremi-skills__softskills-title"
                />
                <motion.div
                  className="sobremi-skills__pills"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                >
                  {softSkills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="sobremi-skills__pill"
                      variants={staggerItem}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="sobremi-skills__idiomas"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <VideoText
                  videoSrc={getCldVideoUrl('assets/fondos/liquid-gold-purple-slow')}
                  text="Idiomas"
                  fontFamily="Surgena, sans-serif"
                  fontSize="clamp(1.5rem, 2.5vw, 2rem)"
                  fontWeight={700}
                  className="sobremi-skills__idiomas-title"
                />
                <TestimonialTooltip items={idiomas} />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* 4. Formación & Logros */}
        <section className="sobremi-formation">
          <div className="sobremi-formation__inner">
            <motion.div
              className="sobremi-formation__header"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <VideoText
                videoSrc={getCldVideoUrl('assets/fondos/liquid-gold-purple-slow')}
                text="Formación & Logros"
                fontFamily="Surgena, sans-serif"
                fontSize="clamp(2rem, 4.5vw, 3.5rem)"
                fontWeight={700}
                className="sobremi-formation__title"
              />
            </motion.div>

            <div className="sobremi-formation__grid">
              {formationCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className="sobremi-formation__pin-wrapper"
                  variants={staggerItem}
                >
                  <PinContainer title={card.tag} href="#">
                    <div className="sobremi-formation__pin-content">
                      <div 
                        className="sobremi-formation__card-image"
                        style={card.bgColor ? { background: card.bgColor } : {}}
                      >
                        {card.image ? (
                          <img 
                            src={card.image} 
                            alt={card.name} 
                            className="sobremi-formation__img" 
                            style={card.imgScale ? { transform: `scale(${card.imgScale})` } : {}}
                          />
                        ) : (
                          <span>{card.placeholder}</span>
                        )}
                      </div>
                      <div className="sobremi-formation__card-info">
                        <h3 className="sobremi-formation__card-name">{card.name}</h3>
                        <p className="sobremi-formation__card-role">{card.role}</p>
                      </div>
                    </div>
                  </PinContainer>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Experiencia & Testimonios */}
        <section className="sobremi-experience">
          <div>
            <VideoText
              videoSrc={getCldVideoUrl('assets/fondos/liquid-gold-purple-slow')}
              text="Trayectoria Laboral"
              fontFamily="Surgena, sans-serif"
              fontSize="clamp(1.8rem, 3.5vw, 2.8rem)"
              fontWeight={700}
              className="sobremi-timeline__title"
            />

            <motion.div
              className="sobremi-timeline__items"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {timelineItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="sobremi-timeline__item"
                  variants={fadeRight}
                  custom={0.1 * idx}
                >
                  <span className="sobremi-timeline__dot" />
                  <span className="sobremi-timeline__date">{item.date}</span>
                  <h4 className="sobremi-timeline__role">{item.role}</h4>
                  <p className="sobremi-timeline__desc">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="sobremi-testimonials"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0.15}
          >
            <h2 className="sobremi-testimonials__title">
              Lo que dicen de mi trabajo
            </h2>
            <div className="sobremi-testimonials__wrapper">
              <AnimatedTestimonials
                testimonials={testimonialsData}
                autoplay={true}
              />
            </div>
          </motion.div>
        </section>
      </div>

      <motion.div
        className="sobremi-cta"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        custom={0}
      >
        <p className="sobremi-cta__text">
          ¿Quieres saber más sobre <strong>mi perfil</strong>?
        </p>
        <p className="sobremi-cta__sub">
          No dudes en contactarme para conversar.
        </p>
      </motion.div>
    </div>
  );
}
