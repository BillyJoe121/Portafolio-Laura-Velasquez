import { useRef, useEffect } from 'react';

/**
 * Hook del efecto linterna/spotlight.
 * Solo se activa cuando `currentSection === 'hero'`.
 *
 * @param {string}          currentSection     — sección activa
 * @param {React.RefObject} spotlightOverlayRef — ref al div.spotlight-mask
 * @param {React.RefObject} transOverlayRef     — ref al overlay de transición
 */
export function useSpotlight(
  currentSection,
  spotlightOverlayRef,
  transOverlayRef
) {
  const rafRef = useRef(null);
  const mouseRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? -window.innerHeight : -2000,
  });
  const heroVisitedRef = useRef(false);

  useEffect(() => {
    if (currentSection !== 'hero' && currentSection !== 'hero-alt') return;

    // Ocultar overlay de transición en hero
    const transOverlay = transOverlayRef.current;
    if (transOverlay) {
      transOverlay.style.opacity = '0';
    }

    const delay = heroVisitedRef.current ? 0 : 1000;
    heroVisitedRef.current = true;

    const updateOverlay = () => {
      const mask = spotlightOverlayRef.current;
      if (!mask) return;
      const { x, y } = mouseRef.current;
      mask.style.setProperty('--mouse-x', `${x}px`);
      mask.style.setProperty('--mouse-y', `${y}px`);
      rafRef.current = null;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current)
        rafRef.current = requestAnimationFrame(updateOverlay);
    };

    const handleMouseLeave = () => {
      mouseRef.current = {
        x: window.innerWidth / 2,
        y: -window.innerHeight,
      };
      if (!rafRef.current)
        rafRef.current = requestAnimationFrame(updateOverlay);
    };

    let timer;
    if (currentSection === 'hero') {
      timer = setTimeout(() => {
        document.addEventListener('mousemove', handleMouseMove, {
          passive: true,
        });
        document.addEventListener('mouseleave', handleMouseLeave);
      }, delay);
    }

    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentSection, spotlightOverlayRef, transOverlayRef]);
}
