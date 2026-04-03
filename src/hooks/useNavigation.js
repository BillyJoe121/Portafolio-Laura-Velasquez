import { useState, useRef, useCallback, useEffect } from 'react';
import { SECTION_COLORS } from '../constants';

/**
 * Hook de navegación por secciones.
 * Gestiona currentSection, overlay de transición y scroll interno del hero.
 *
 * @param {React.RefObject} transOverlayRef  — ref al <div> de overlay
 * @param {React.RefObject} heroContainerRef — ref al contenedor scrollable del hero
 * @returns {{ currentSection, navigateTo, showHeroBg }}
 */
export function useNavigation(transOverlayRef, heroContainerRef) {
  const [currentSection, setCurrentSection] = useState(() => {
    return sessionStorage.getItem('currentSection') || 'hero';
  });
  
  const [showHeroBg, setShowHeroBg] = useState(() => {
    const saved = sessionStorage.getItem('currentSection');
    return !saved || saved === 'hero' || saved === 'home';
  });

  const currentSectionRef = useRef(sessionStorage.getItem('currentSection') || 'hero');
  const transTimersRef = useRef([]);

  // Mantener ref sincronizada con state
  useEffect(() => {
    currentSectionRef.current = currentSection;
    sessionStorage.setItem('currentSection', currentSection);
  }, [currentSection]);

  // ── Helpers de timers ──────────────────────────────────
  const clearTransTimers = useCallback(() => {
    transTimersRef.current.forEach((id) => clearTimeout(id));
    transTimersRef.current = [];
  }, []);

  const scheduleTimer = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    transTimersRef.current.push(id);
    return id;
  }, []);

  // ── Scroll interno dentro del hero ─────────────────────
  const scrollToSection = useCallback(
    (target) => {
      if (heroContainerRef.current) {
        const el = heroContainerRef.current.querySelector(
          `#section-${target}`
        );
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    [heroContainerRef]
  );

  // ── Navegación principal ───────────────────────────────
  const navigateTo = useCallback(
    (target) => {
      if (target === currentSectionRef.current) {
        if (
          target === 'hero' ||
          target === 'home' ||
          target === 'hero-alt'
        ) {
          scrollToSection(target === 'hero-alt' ? 'hero' : target);
        }
        return;
      }

      clearTransTimers();

      const overlay = transOverlayRef.current;
      if (!overlay) return;

      const isGoingToHero = target === 'hero' || target === 'home';
      const targetColor = SECTION_COLORS[target];

      if (isGoingToHero) {
        setShowHeroBg(isGoingToHero);
        setCurrentSection(target);
        overlay.style.transition = 'opacity 0.5s ease';
        overlay.style.opacity = '0';
        overlay.style.background = 'transparent';
        scheduleTimer(() => {
          overlay.style.transition = '';
        }, 600);
        setTimeout(
          () =>
            scrollToSection(target),
          100
        );
      } else {
        setShowHeroBg(false);
        setCurrentSection(target);

        overlay.style.transition = 'none';
        if (targetColor) {
          overlay.style.background = targetColor;
          overlay.style.opacity = '1';
        } else {
          overlay.style.opacity = '0';
          overlay.style.background = 'transparent';
        }
      }
    },
    [clearTransTimers, scheduleTimer, scrollToSection, transOverlayRef]
  );

  return { currentSection, navigateTo, showHeroBg };
}
