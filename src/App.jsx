import React, { useRef } from 'react';
import './App.css';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { FloatingDock } from './components/FloatingDock';
import { useNavigation } from './hooks/useNavigation';
import { PROJECTS } from './constants';

// Sections
import { HeroSection } from './sections/Hero/HeroSection';
import { HomeSection } from './sections/Home/HomeSection';
import { ProyectosSection } from './sections/Proyectos/ProyectosSection';
import { SobreMiSection } from './sections/SobreMi/SobreMiSection';
import { ContactoSection } from './sections/Contacto/ContactoSection';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';

// Pages
import { ProjectDetail } from './pages/ProjectDetail/ProjectDetail';
import { LuminyDetail } from './pages/ProjectDetail/LuminyDetail';
import { MiloDetail } from './pages/ProjectDetail/MiloDetail';
import { PeairDetail } from './pages/ProjectDetail/PeairDetail';
// Assets


function App() {
  // ── Refs ────────────────────────────────────────────────
  const transOverlayRef = useRef(null);
  const heroContainerRef = useRef(null);

  // ── Hooks ───────────────────────────────────────────────
  const { currentSection, navigateTo, showHeroBg } = useNavigation(
    transOverlayRef,
    heroContainerRef
  );

  // ── Hero scroll parallax ────────────────────────────────
  const { scrollY } = useScroll({ container: heroContainerRef });
  const heroTextOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // ── Helpers ─────────────────────────────────────────────
  const isHeroGroup =
    currentSection === 'hero' ||
    currentSection === 'home';

  const [isScrolledDown, setIsScrolledDown] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // If scrolled past 50% of the viewport, arrow should point up
    setIsScrolledDown(latest > window.innerHeight * 0.5);
  });

  const handleScrollToggle = () => {
    if (heroContainerRef.current) {
      const homeNode = document.getElementById('section-home');
      if (homeNode) {
        if (!isScrolledDown) {
          heroContainerRef.current.scrollTo({
            top: homeNode.offsetTop + (window.innerHeight * 0.3),
            behavior: 'smooth'
          });
        } else {
          heroContainerRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const activeProject = PROJECTS.find((p) => p.id === currentSection);

  // ── Dock config ─────────────────────────────────────────
  const dockItems = [
    { title: 'Home', href: '#hero', onClick: () => navigateTo('hero'), highlighted: currentSection === 'hero' || currentSection === 'home' },
    { title: 'Proyectos', href: '#proyectos', onClick: () => navigateTo('proyectos'), highlighted: currentSection === 'proyectos' || !!activeProject },
    { title: 'Acerca de mí', href: '#sobre-mi', onClick: () => navigateTo('sobre-mi'), highlighted: currentSection === 'sobre-mi' },
    { title: 'Contacto', href: '#contacto', onClick: () => navigateTo('contacto'), highlighted: currentSection === 'contacto' },
  ];

  // purple = home/sobre-mi, white = proyectos/contacto
  const navTheme = (currentSection === 'proyectos' || !!activeProject || currentSection === 'contacto')
    ? 'white'
    : 'purple';

  // ── Render ──────────────────────────────────────────────
  return (
    <div className="app-container">

      {/* Capa 0: fondo de base del hero (blanco sólido) */}
      {showHeroBg && (
        <div 
          className="bg-base-layer" 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#ffffff', zIndex: -1 }}
        />
      )}

      {/* Capa 10: overlay de transición */}
      <div ref={transOverlayRef} className="transition-overlay" />



      {/* Top fade global: disuelve el contenido que sube hacia el navbar */}
      <div className="global-top-fade" />

      {/* Capa 100: navbar */}
      <div className="navbar">
        <FloatingDock items={dockItems} navTheme={navTheme} />
      </div>

      {/* Botón Flotante Oculto en Secciones Externas */}
      {isHeroGroup && (
        <motion.button
          className="scroll-down-btn global-scroll-btn"
          onClick={handleScrollToggle}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            bottom: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            pointerEvents: 'auto'
          }}
        >
          {isScrolledDown ? (
            <IconArrowUp size={36} className="scroll-arrow" stroke={1.5} />
          ) : (
            <IconArrowDown size={36} className="scroll-arrow" stroke={1.5} />
          )}
        </motion.button>
      )}

      {/* Hero y Home integrados: siempre montado */}
      <div
        ref={heroContainerRef}
        className={`section-full hero-persistent ${isHeroGroup ? 'section-visible' : 'section-hidden'}`}
        style={{ overflowY: 'auto', overflowX: 'hidden', pointerEvents: 'auto' }}
      >
        <HeroSection
          currentSection={currentSection}
          heroTextOpacity={heroTextOpacity}
          onNavigate={navigateTo}
        />
        <div id="section-home" style={{ position: 'relative', width: '100%' }}>
          {isHeroGroup ? <HomeSection onNavigate={navigateTo} /> : null}
        </div>
      </div>

      {/* Secciones con AnimatePresence */}
      <AnimatePresence mode="wait">
        {currentSection === 'proyectos' && (
          <motion.div key="proyectos" className="section-full section-proyectos"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            <ProyectosSection onSelectProject={(id) => navigateTo(id)} />
          </motion.div>
        )}

        {currentSection === 'sobre-mi' && (
          <motion.div key="sobre-mi" className="section-full section-sobremi"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            <SobreMiSection onNavigate={navigateTo} />
          </motion.div>
        )}

        {currentSection === 'contacto' && (
          <motion.div key="contacto" className="section-full section-contacto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}>
            <ContactoSection />
          </motion.div>
        )}

        {/* Páginas de proyecto dinámicas */}
        {activeProject && (
          <motion.div key={activeProject.id} className="section-full"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ overflowY: 'auto' }}
          >
            {activeProject.id === 'luminy' && (
              <LuminyDetail
                project={activeProject}
                onBack={() => navigateTo('proyectos')}
              />
            )}
            {activeProject.id === 'milo' && (
              <MiloDetail
                project={activeProject}
                onBack={() => navigateTo('proyectos')}
              />
            )}
            {activeProject.id === 'peair' && (
              <PeairDetail
                project={activeProject}
                onBack={() => navigateTo('proyectos')}
              />
            )}
            {activeProject.id !== 'luminy' && activeProject.id !== 'milo' && activeProject.id !== 'peair' && (
              <ProjectDetail
                project={activeProject}
                onBack={() => navigateTo('proyectos')}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
