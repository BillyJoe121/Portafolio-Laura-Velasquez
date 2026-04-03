import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import Spline from '@splinetool/react-spline';
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
            className="project-title-img"
          />
        </motion.div>

        {/* 
          ══════════════════════════════════════════════════════════════════
          AQUÍ COMIENZA EL CONTENIDO NUEVO Y LIMPIO PARA MILO 
          ══════════════════════════════════════════════════════════════════
        */}

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
