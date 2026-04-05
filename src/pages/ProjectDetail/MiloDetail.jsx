import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import Spline from '@splinetool/react-spline';
import imgMilo from '../../assets/proyectos/Milo/milo.png';
import imgPlano1 from '../../assets/proyectos/Milo/plano1.jpeg';
import imgPlano2 from '../../assets/proyectos/Milo/plano2.jpeg';
import imgPlano3 from '../../assets/proyectos/Milo/plano3.jpeg';
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { IconBrandBehance } from '@tabler/icons-react';
import './ProjectDetail.css';

/**
 * MiloDetail — Plantilla base vacía para el proyecto Milo.
 */
export function MiloDetail({ project, onBack }) {
  if (!project) return null;

  return (
    <div className={`project-detail ${project.splineUrl ? 'has-spline' : ''}`}>

      {/* 
        Cortina de difuminado (fade) superior. 
        Simula que el texto pierde opacidad bajo el docker.
        Si hay un Spline, el CSS limitará su ancho para no taparlo.
      */}
      <div className="project-top-fade" />

      {/* Botón volver — ovalado pequeño con flecha */}
      <motion.button
        className="project-back-btn"
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Volver a proyectos"
      >
        ‹
      </motion.button>

      {/* Contenido scrollable */}
      <div className="project-detail-scroll">

        {/* Imagen de título del proyecto Milo */}
        <motion.div
          className="project-title-img-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={project.titleImage}
            alt={project.title}
            className="project-title-img milo-title-img"
          />
        </motion.div>


        {/* 
          ══════════════════════════════════════════════════════════════════
          AQUÍ COMIENZA EL CONTENIDO NUEVO Y LIMPIO PARA MILO 
          ══════════════════════════════════════════════════════════════════
        */}

        {/* Sección RETO: Layout con imagen de robot a la izquierda y texto a la derecha */}
        <motion.div
          className="milo-challenge-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="challenge-container">
            {/* Texto del RETO */}
            <div className="challenge-content">
              <h2 className="challenge-title">RETO</h2>
              <div className="challenge-divider" />
              <p className="challenge-description">
                Comprender las capacidades y limitaciones de sensores y actuadores para materializarlas en acciones y características de un objeto inteligente con intención, entendiendo el flujo de trabajo y adaptándolas en la creación de aprendizajes significativos y de alto valor.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sección CONCEPTO — Amarilla, esquinas rectas, organización vertical */}
        <motion.div
          className="milo-concept-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="concept-container">
            <h2 className="concept-title">CONCEPTO</h2>
            <div className="concept-divider" />
            
            <p className="concept-intro-text">
              Milo es un robot-mascota interactivo que combina juego, emoción y aprendizaje para enseñar a los niños valores como el cuidado y la empatía. Inspirado en el comportamiento de los seres vivos, reacciona a la luz, al sonido y a la cercanía con expresiones emocionales visibles:
            </p>

            {/* Features list vertical - Cuadros negros con texto */}
            <div className="concept-features-vertical">
              <div className="feature-black-box">
                Detecta proximidad
              </div>

              <div className="feature-black-box">
                Tarjeta de comida
              </div>

              <div className="feature-black-box">
                Modo sueño dependiendo de la (luz)
              </div>
            </div>

            <p className="concept-outro-text">
              Su propósito es transformar el aprendizaje en una experiencia sensorial y afectiva: los niños no solamente juegan, sino que aprenden a reconocer y responder a las emociones de otro ser, fortaleciendo su <strong>responsabilidad</strong> y <strong>sensibilidad social</strong>.
            </p>
          </div>
        </motion.div>

        {/* Sección USUARIA — Luisa Ramírez (Estilo dark top / yellow bottom) */}
        <motion.div
          className="milo-user-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="user-card-black">
            <h2 className="user-name">Luisa Ramírez</h2>
            <h3 className="user-tagline">La exploradora creativa</h3>
            
            <div className="user-info-list">
              <p><strong>Edad:</strong> 8 años</p>
              <p><strong>Ubicación:</strong> Cali, Colombia (zona urbana)</p>
              <p><strong>Ocupación:</strong> Estudiante de primaria</p>
            </div>
          </div>

          <div className="user-card-yellow">
            <h4 className="needs-title">Necesidades</h4>
            <ul className="needs-list">
              <li>Juguetes que reaccionen a sus acciones y le hagan sentir conexión emocional.</li>
              <li>Experiencias que desarrollen su empatía, y genere responsabilidad emocional.</li>
            </ul>
          </div>
        </motion.div>
 
         {/* Sección PROCESO DE DISEÑO — Misma estética que RETO/CONCEPTO */}
        <motion.div
          className="milo-process-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="process-container">
            <h2 className="process-title">PLANOS</h2>
            <div className="process-divider" />
            
            <div className="process-plans-wrapper">
              <AnimatedTestimonials
                testimonials={[
                  { src: imgPlano1 },
                  { src: imgPlano2 },
                  { src: imgPlano3 },
                ]}
                autoplay={true}
                arrowColor="#000"
                arrowBorder="#f9fc3d"
                arrowHoverBg="rgba(249, 252, 61, 0.2)"
              />
            </div>
          </div>
        </motion.div>
 
         {/* Sección COMPONENTES — Sensores y Actuadores */}
        <motion.div
          className="milo-components-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="components-container">
            <h2 className="components-title">COMPONENTES</h2>
            <div className="components-divider" />
            
            <div className="components-grid">
              <div className="components-group">
                <h3 className="group-title">Sensores usados:</h3>
                <ul className="components-list">
                  <li><strong>Ultrasonido (proximidad):</strong> detecta cuando algo está cerca y los evita.</li>
                  <li><strong>LDR (fotorresistencia):</strong> simula día/noche para enseñar ciclo biológico.</li>
                  <li><strong>RFID:</strong> Se usa para simular el alimento de la mascota y activa modo hiperactivo.</li>
                </ul>
              </div>

              <div className="components-group">
                <h3 className="group-title">Actuadores usados:</h3>
                <ul className="components-list">
                  <li><strong>Motores + L298N:</strong> se activan y permiten que se mueva con las ruedas, emocionado, cuando el niño interactúa.</li>
                  <li><strong>LEDs RGB en la cabeza:</strong> indican estados dependiendo de la proximidad.</li>
                  <li><strong>Buzzer:</strong> suena para representar hambre y si hay algún objeto cerca para evitar obstáculos.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Decoración opcional: Forma negra en la esquina (como en el mockup) */}
          <div className="components-corner-shape" />
        </motion.div>
 
         {/* Credits Section */}
        <motion.div
          className="project-credits-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="credits-text" style={{ color: '#000', fontWeight: 'normal' }}>
            Créditos: Isabella Salazar, Laura S. Velásquez y José M. Pérez
          </p>
        </motion.div>
 
         {/* Behance Link Section */}
        <motion.div
          className="project-behance-link-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <a
            href="https://www.behance.net/gallery/239426631/MILO-Juguete-Robot" 
            target="_blank"
            rel="noreferrer"
            className="behance-cta-btn milo-behance-btn"
          >
            <IconBrandBehance size={22} stroke={1.5} />
            <span>Descubre más detalles aquí</span>
          </a>
        </motion.div>

      </div>

      {/* 3D Spline fijo a la mitad derecha de la pantalla (Si se le define uno a Milo) */}
      {project.splineUrl && (
        <div className="project-detail-spline">
          <Suspense fallback={null}>
            <Spline scene={project.splineUrl} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
