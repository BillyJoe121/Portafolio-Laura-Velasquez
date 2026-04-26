import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'motion/react';
import './RadarContact.css';

/**
 * RadarContact — Robot Arm 3D interactivo (Spline code export link).
 */
export const RadarContact = ({ visible, onLoad }) => {
  return (
    <motion.div
      className="radar-contact-wrapper"
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="robot-arm-container">
        <Suspense fallback={<div className="spline-loading"><div className="spline-loading-spinner" /><span>Cargando 3D...</span></div>}>
          <Spline 
            scene="https://prod.spline.design/BublVOjV4om14zBK/scene.splinecode" 
            onLoad={onLoad}
          />
        </Suspense>
      </div>
    </motion.div>
  );
};
