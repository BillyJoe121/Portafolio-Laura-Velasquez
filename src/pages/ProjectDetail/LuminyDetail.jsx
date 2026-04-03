import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import Spline from '@splinetool/react-spline';
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { IconBrandBehance } from '@tabler/icons-react';
import './ProjectDetail.css';

/**
 * ProjectDetail — Template de página individual de proyecto.
 * - Botón volver: símbolo "‹" ovalado pequeño, negro → blanco al hover
 * - Título: imagen titulo.png del proyecto (en vez de texto)
 * - Sin subtítulo de diseño
 */
export function LuminyDetail({ project, onBack }) {
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

      {/* Contenido scrollable (mitad izquierda si hay spline, o completo) */}
      <div className="project-detail-scroll">

        {/* Imagen de título del proyecto */}
        <motion.div
          className="project-title-img-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={project.titleImage}
            alt={project.title}
            className="project-title-img"
          />
        </motion.div>

        {/* Concepto Section — Se muestra si existe en el objeto project */}
        {project.concept && (
          <motion.div
            className="project-concept-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3
              className="project-concept-title"
              style={project.conceptImage ? {
                backgroundImage: `url(${project.conceptImage})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              } : {}}
            >
              Concepto:
            </h3>
            {Array.isArray(project.concept) ? (
              project.concept.map((p, i) => (
                <p key={i} className="project-concept-text">{p}</p>
              ))
            ) : (
              <p className="project-concept-text">{project.concept}</p>
            )}
          </motion.div>
        )}

        {/* Team Section — Se muestra si existe en el objeto project */}
        {project.teamMember && (
          <motion.div
            className="project-team-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="project-team-name"
              style={project.conceptImage ? {
                backgroundImage: `url(${project.conceptImage})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              } : {}}
            >
              {project.teamMember}
            </h2>
          </motion.div>
        )}

        {/* User Image Section — Se muestra si existe en el objeto project */}
        {project.userImage && (
          <motion.div
            className="project-user-img-wrapper"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={project.userImage}
              alt="Luminy usuaria"
              className="project-user-img"
            />

            {/* Overlay texts on top of user image */}
            <div className="project-user-overlays">
              <div className="project-user-overlay-item age-text">
                <span className="age-number">32</span>
                <span className="age-label">años</span>
              </div>

              <div className="project-user-glass-card">
                <p><strong>Ocupación:</strong> Docente de economía</p>
                <p><strong>Ubicación:</strong> Vive en un apartamento moderno en una zona céntrica y densamente poblada.</p>
              </div>

              <div className="project-user-motivations">
                <h4 className="motivations-title">Motivaciones:</h4>
                <div className="motivations-row">
                  <div className="motivation-glass-item">Tranquilidad</div>
                  <div className="motivation-glass-item">Armonía</div>
                  <div className="motivation-glass-item">Control</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}



        {/* Blue System Banner — Nuevo componente visual */}
        <motion.div
          className="project-blue-banner"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="banner-content">
            <div className="banner-label label-dashboard" style={{ zIndex: 1 }}>Dashboard</div>
            <h2 className="banner-title">Luminy</h2>
            <div className="banner-label label-sensores" style={{ zIndex: 3 }}>Sensores</div>
            <div className="banner-label label-actuadores" style={{ zIndex: 1 }}>Actuadores</div>
          </div>
          <div className="banner-text-content">
            <p>
              El dashboard de Luminy permite al usuario monitorear el mini invernadero en tiempo real. Presenta
              de forma clara variables esenciales como la temperatura, la humedad del aire y la humedad del
              suelo, además de ofrecer alertas cuando alguna condición se sale de los rangos ideales.
            </p>
            <p>
              Para reforzar el vínculo emocional con el usuario, el sistema incorpora un lenguaje visual basado
              en luces LED: un tono rojo indica que la planta necesita agua y requiere atención, mientras que un
            </p>
          </div>
        </motion.div>

        <motion.div
          className="project-typography-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="style-guide-rows">
            {/* Row 1: Título + Fuente principal */}
            <div className="style-row-item">
              <span className="style-label">Tipografía</span>
              <h3 className="style-main-font">SF Pro</h3>
            </div>

            {/* Row 2: Variantes + Pills */}
            <div className="style-row-item">
              <span className="style-label">Variantes</span>
              <div className="style-pills-row">
                <div className="variant-box-pill">Thin</div>
                <div className="variant-box-pill">Regular</div>
                <div className="variant-box-pill semibold">Semibold</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* New Colors Image Section */}
        <motion.div
          className="project-colors-independent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/src/assets/proyectos/Luminy/colores.jpeg"
            alt="Colores"
            className="project-standalone-colors-img"
          />
        </motion.div>

        {/* New PC Image Section — Independiente */}
        <motion.div
          className="project-pc-independent"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/src/assets/proyectos/Luminy/pc.jpeg"
            alt="PC View"
            className="project-standalone-pc-img"
          />
        </motion.div>

        {/* Manual de Uso Title — Reemplaza imagen con título estilo Concepto */}
        <motion.div
          className="project-concept-section"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '20px' }}
        >
          <h3
            className="project-concept-title"
            style={project.conceptImage ? {
              backgroundImage: `url(${project.conceptImage})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : {}}
          >
            Manual de Uso:
          </h3>
        </motion.div>

        {/* Partes Section — Independiente */}
        <motion.div
          className="project-partes-independent"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/src/assets/proyectos/Luminy/partes.jpeg"
            alt="Componentes del Sistema"
            className="project-standalone-partes-img"
          />
        </motion.div>

        {/* Features Summary Section — Recuadro azul claro con mascota */}
        <motion.div
          className="project-features-summary"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="features-summary-container">
            <h3 className="features-title">
              Tu ventana a su mundo. Desde tu celular o computador puedes:
            </h3>
            <ul className="features-list">
              <li>Ver la temperatura</li>
              <li>Revisar la humedad del aire</li>
              <li>Revisar la humedad de la tierra</li>
              <li>Recibir alertas cuando algo esté fuera de los rangos ideales</li>
              <li>Ver el estado emocional de tu planta a través de los códigos de color</li>
            </ul>

            <img
              src="/src/assets/proyectos/Luminy/mascota luminy.jpeg"
              alt="Mascota Luminy"
              className="features-mascot-img"
            />
          </div>
        </motion.div>

        {/* Secuencia de Uso Section */}
        <motion.div
          className="project-usage-sequence"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="usage-sequence-container">
            <h2 className="usage-title">Secuencia de uso</h2>

            <div className="usage-steps-grid">
              {[
                { n: 1, t: "Abre el contenedor de agua (Contenedor 1)", d: "Retira la tapa inferior para tener acceso al depósito." },
                { n: 2, t: "Vierte la cantidad de agua que desees utilizar para el sistema de riego y la mini fuente.", d: "" },
                { n: 3, t: "Conecta la manguera a la bomba,", d: "Asegúrate de que esté bien sujeta." },
                { n: 4, t: "Ensambla el cuerpo de Luminy", d: "Coloca el cuerpo sobre el contenedor 2." },
                { n: 5, t: "Planta tu planta principal en la cabeza de Luminy.", d: "" },
                { n: 6, t: "Encaja la cabeza sobre el cuerpo. Verás que todo queda alineado y estético.", d: "" },
                { n: 7, t: "Inserta el sensor de humedad en la tierra.", d: "" },
                { n: 8, t: "Conecta luminy a la corriente.", d: "" }
              ].map((step, idx) => (
                <div key={idx} className="usage-step-item">
                  <div className="step-number-outer">
                    <div className="step-number-inner">
                      <span>{step.n}</span>
                    </div>
                  </div>
                  <div className="step-instruction-card">
                    <p className="step-title">{step.t}</p>
                    {step.d && <p className="step-desc">{step.d}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Proceso de Diseño Title — Estilo Concepto */}
        <motion.div
          className="project-concept-section"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '20px' }}
        >
          <h3
            className="project-concept-title"
            style={project.conceptImage ? {
              backgroundImage: `url(${project.conceptImage})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : {}}
          >
            Proceso de Diseño:
          </h3>
        </motion.div>

        {/* Animated Stack Section (Aceternity) */}
        <motion.div
          className="project-animated-stack"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedTestimonials
            testimonials={[
              { src: "/src/assets/proyectos/Luminy/plano1.jpeg" },
              { src: "/src/assets/proyectos/Luminy/plano2.jpeg" },
              { src: "/src/assets/proyectos/Luminy/plano3.jpeg" },
              { src: "/src/assets/proyectos/Luminy/plano4.jpeg" },
              { src: "/src/assets/proyectos/Luminy/plano5.jpeg" },
            ]}
            autoplay={true}
          />
        </motion.div>

        {/* Project Closing Section */}
        <motion.div
          className="project-closure-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="closure-circle-frame">
            <img
              src="/src/assets/proyectos/Luminy/cierre.jpeg"
              alt="Cierre del proyecto"
              className="closure-img"
            />
          </div>
          <h2 className="closure-brand-text">Luminy</h2>
        </motion.div>

        {/* Credits Section */}
        <motion.div
          className="project-credits-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="credits-text">
            Créditos: Isabella Salazár y Laura Velasquez
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
            href="https://www.behance.net/gallery/245863281/Maceta-inteligente-Luminy"
            target="_blank"
            rel="noreferrer"
            className="behance-cta-btn"
          >
            <IconBrandBehance size={22} stroke={1.5} />
            <span>Descubre más detalles aquí</span>
          </a>
        </motion.div>
      </div>

      {/* 3D Spline fijo a la mitad derecha de la pantalla */}
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
