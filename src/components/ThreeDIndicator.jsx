import React from 'react';
import { motion } from 'motion/react';

/**
 * ThreeDIndicator — Un ícono sutil que indica que un elemento 3D es interactivo.
 * Se desvanece suavemente cuando el usuario interactúa.
 */
export const ThreeDIndicator = ({ visible, onInteract }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onPointerDown={onInteract} // Desaparece al primer intento de click o drag
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        pointerEvents: visible ? 'auto' : 'none',
        cursor: 'grab'
      }}
    >
      {/* Contenedor Glassmorphism con animación de pulso */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 8px 32px 0 rgba(255, 255, 255, 0.1)',
            '0 8px 32px 0 rgba(255, 255, 255, 0.25)',
            '0 8px 32px 0 rgba(255, 255, 255, 0.1)'
          ]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff'
        }}
      >
        {/* Icono de mano rotando (SVG personalizado para elegancia) */}
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9" />
          <path d="M16 3l4 4-4 4" />
          <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
          <path d="M12 11v8" />
          <path d="M8 15h8" />
        </svg>
      </motion.div>

      {/* Texto sutil informativo */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        style={{
          color: '#fff',
          fontFamily: 'var(--font-main)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        Girar 3D
      </motion.span>
    </motion.div>
  );
};
