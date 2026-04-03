import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import './ThreeDMarquee.css';

/**
 * ThreeDMarquee — 4-column 3D perspective grid with vertical scrolling.
 *
 * Acepta `items` con `{ id, src, label }`. Las 4 imágenes se repiten en
 * bloques completos de 4 para que SIEMPRE sean visibles juntas.
 * Cada card llama a `onSelect(id)` al hacer click.
 */
export function ThreeDMarquee({ items = [], className = '', onSelect }) {
  /**
   * Distribuye items en 4 columnas repitiendo en bloques de 4.
   * - Cada columna recibe siempre los mismos items en orden cíclico.
   * - Se repiten N veces para llenar visualmente la columna.
   */
  const REPEAT = 6; // cuántos bloques de 4 se repiten por columna
  const N = items.length; // siempre 4

  const columns = useMemo(() => {
    if (N === 0) return [[], [], [], []];

    // Cada columna j recibe los items en orden rotado:
    // col 0: [0,1,2,3], col 1: [1,2,3,0], col 2: [2,3,0,1], col 3: [3,0,1,2]
    // repetidos REPEAT veces para que el scroll tenga continuidad infinita.
    return Array.from({ length: 4 }, (_, colIdx) => {
      const col = [];
      for (let r = 0; r < REPEAT; r++) {
        for (let i = 0; i < N; i++) {
          col.push(items[(colIdx + i) % N]);
        }
      }
      return col;
    });
  }, [items, N]);

  return (
    <div className={`tdm-outer ${className}`}>
      <div className="tdm-center">
        <div className="tdm-scale-box">
          <div className="tdm-grid">
            {columns.map((col, colIndex) => (
              <motion.div
                key={colIndex}
                className="tdm-column"
                animate={{ y: colIndex % 2 === 0 ? 120 : -120 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 12 : 18,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
                }}
              >
                {/* Vertical grid line */}
                <div className="tdm-gridline-v" style={{ left: '-16px' }} />

                {col.map((item, imgIndex) => (
                  <div
                    className="tdm-img-wrapper"
                    key={`${item.id}-${imgIndex}`}
                    onClick={() => onSelect && onSelect(item.id)}
                  >
                    {/* Horizontal grid line */}
                    <div className="tdm-gridline-h" style={{ top: '-16px' }} />

                    <motion.img
                      src={item.src}
                      alt={item.label}
                      className="tdm-img"
                      width={400}
                      height={400}
                      loading="lazy"
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />

                    {/* Nombre del proyecto al hover */}
                    <div className="tdm-img-label">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
