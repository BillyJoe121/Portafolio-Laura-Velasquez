import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import Spline from '@splinetool/react-spline';
import './ProjectDetail.css';

export function LomiDetail({ project, onBack }) {
  if (!project) return null;

  return (
    <div 
      className="project-detail lomi-detail" 
      style={{ 
        width: '100%', 
        height: '400vh', 
        position: 'relative', 
        background: '#000',
        overflow: 'visible' 
      }}
    >
      <div 
        className="lomi-spline-sticky-wrapper"
        style={{ 
          position: 'sticky', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          zIndex: 1,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Suspense fallback={<div style={{color:'white'}}>Cargando LOMI...</div>}>
          <Spline scene={project.splineUrl} style={{ width: '100%', height: '100%' }} />
        </Suspense>

        <motion.button
          className="project-back-btn"
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Volver a proyectos"
          style={{ position: 'absolute', top: '80px', left: '36px', zIndex: 100 }}
        >
          ‹
        </motion.button>
      </div>
    </div>
  );
}
