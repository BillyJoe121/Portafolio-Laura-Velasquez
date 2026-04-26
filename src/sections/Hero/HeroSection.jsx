import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { getCldVideoUrl } from '../../lib/cloudinary';
import './HeroSection.css';

/**
 * HeroSection — Laura Velasquez hero.
 * Two-line text with video mask, geometric shapes, and photo circle.
 */
export function HeroSection({ currentSection, heroTextOpacity, onNavigate }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [assetsLoaded, setAssetsLoaded] = React.useState({
    maskVideo: false,
    circleVideo: false,
    photoImg: false,
  });

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const sectionRef = useRef(null);

  // Check if all assets are ready
  useEffect(() => {
    if (assetsLoaded.maskVideo && assetsLoaded.circleVideo && assetsLoaded.photoImg) {
      // Small delay to ensure everything is rendered before showing
      const timer = setTimeout(() => {
        setIsReady(true);
        window.__heroStartTime = performance.now();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [assetsLoaded]);

  const handleAssetLoad = (asset) => {
    setAssetsLoaded(prev => ({ ...prev, [asset]: true }));
  };

  const lastResetRef = useRef(0);
  const resetHeroAnimation = () => {
    const now = performance.now();
    if (now - lastResetRef.current > 1000) {
      window.__heroStartTime = now;
      lastResetRef.current = now;
    }
  };

  // Observer to restart animations when Hero comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && isReady) {
          resetHeroAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isReady]);

  // Restart animations when navigating back to Hero via prop change
  useEffect(() => {
    if (currentSection === 'hero' && isReady) {
      resetHeroAnimation();
    }
  }, [currentSection, isReady]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    video.playbackRate = 4.0;
    
    // Initial setup if not caught by observer yet
    if (!window.__heroStartTime) {
      window.__heroStartTime = performance.now();
    }

    const ctx = canvas.getContext('2d');

    const draw = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const cw = rect.width;
      const ch = rect.height;

      const targetW = Math.round(cw * dpr);
      const targetH = Math.round(ch * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Measure fonts and text
      const fontSize = Math.max(90, Math.min(cw * 0.16, 240));
      const fontStr = `800 ${fontSize}px Surgena, sans-serif`;
      const line1 = "Laura";
      const line2 = "Velasquez";

      ctx.font = fontStr;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';

      // Pushed further right -> 22% of viewport
      const x = cw * 0.22;
      const centerY = ch * 0.40;
      const lineHeight = fontSize * 0.88;

      // Animación letra por letra
      // startTime se resetea por el IntersectionObserver
      const elapsed = (performance.now() - window.__heroStartTime) / 1000;
      
      const drawAnimatedLine = (text, startX, baseY, startIndex) => {
        let currentX = startX;
        for (let i = 0; i < text.length; i++) {
          const letter = text[i];
          // 500ms delay inicial, 80ms de separación entre cada letra
          const letterDelay = 0.5 + (startIndex + i) * 0.08;
          
          let progress = (elapsed - letterDelay) / 0.8; // 0.8s duración de cada letra
          progress = Math.max(0, Math.min(1, progress));
          
          // Easing Expo Out
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          
          const yOffset = (1 - ease) * (lineHeight * 0.6); // Sube desde abajo
          const alpha = ease; // Fade in
          
          if (alpha > 0) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#000';
            ctx.fillText(letter, currentX, baseY + yOffset);
            ctx.restore();
          }
          
          currentX += ctx.measureText(letter).width;
        }
      };

      // 1. Draw Text for Masking
      drawAnimatedLine(line1, x, centerY - lineHeight / 2, 0);
      drawAnimatedLine(line2, x, centerY + lineHeight / 2, line1.length);

      // 2. Apply Video Mask
      ctx.globalCompositeOperation = 'source-in';
      if (video.readyState >= 2) {
        const vw = video.videoWidth || cw;
        const vh = video.videoHeight || ch;
        const scale = Math.max(cw / vw, ch / vh);
        const sw = vw * scale;
        const sh = vh * scale;
        const sx = (cw - sw) / 2;
        const sy = (ch - sh) / 2;
        ctx.drawImage(video, sx, sy, sw, sh);
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };

    const startDrawing = () => {
      cancelAnimationFrame(rafRef.current);
      draw();
    };

    video.addEventListener('playing', startDrawing);
    video.addEventListener('canplaythrough', () => handleAssetLoad('maskVideo'));
    if (!video.paused && !video.ended) startDrawing();

    return () => {
      video.removeEventListener('playing', startDrawing);
      video.removeEventListener('canplaythrough', () => handleAssetLoad('maskVideo'));
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <main
      id="section-hero"
      ref={sectionRef}
      className="hero-content"
      style={{ height: '100vh', position: 'relative', backgroundColor: '#f8f8fc', overflow: 'hidden' }}
    >
      <video
        ref={videoRef}
        src={getCldVideoUrl('hero_mask_optimized_cmkpry')}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlayThrough={() => handleAssetLoad('maskVideo')}
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
      />

      {/* ── Background elongated waves ── */}
      <svg className="hero-bg-svg" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        {/* Bottom-left waves */}
        <g opacity="0.4">
          <path d="M-100,750 C150,600 350,750 500,600 C600,500 650,400 600,200 L-100,-100 Z" fill="#f0eefa" opacity="0.4" />
          <path d="M-100,750 C100,550 250,650 400,500 C500,400 550,300 500,100 L-100,-100 Z" fill="#e2dfee" opacity="0.6" />
          <path d="M-100,750 C50,500 150,550 300,400 C380,320 420,220 380,50 L-100,-100 Z" fill="#cdc8e8" opacity="0.5" />
          <path d="M-100,750 C0,450 80,450 200,300 C250,230 280,130 240,0 L-100,-100 Z" fill="#b8b0de" opacity="0.4" />
        </g>
        
        {/* Top-right waves */}
        <g opacity="0.3">
          <path d="M1300,-50 C1050,100 850,-50 700,100 C600,200 550,300 600,500 L1300,800 Z" fill="#f0eefa" opacity="0.4" />
          <path d="M1300,-50 C1100,150 950,50 800,200 C700,300 650,400 700,600 L1300,800 Z" fill="#e2dfee" opacity="0.6" />
          <path d="M1300,-50 C1150,200 1050,150 900,300 C820,380 780,480 820,650 L1300,800 Z" fill="#cdc8e8" opacity="0.5" />
          <path d="M1300,-50 C1200,250 1120,250 1000,400 C950,470 920,570 960,700 L1300,800 Z" fill="#b8b0de" opacity="0.4" />
        </g>
      </svg>

      <motion.div
        className="hero-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ opacity: heroTextOpacity }}
      >
        {/* LEFT: Canvas-based name + static tagline + CTA */}
        <div className="hero-left-wrapper" style={{ flex: 1, position: 'relative', height: '100%' }}>
          <div className="hero-left-canvas-container" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>

          <div className="hero-left-static-content" style={{ paddingLeft: '22%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
            {/* The canvas handles the name above */}
            <div style={{ height: '20vw', maxHeight: '300px' }} /> {/* Responsive spacer for name */}

            <motion.div
              className="hero-divider"
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
              initial="hidden"
              animate={(isVisible && isReady && currentSection === 'hero') ? "visible" : "hidden"}
            />

            <motion.p
              className="hero-tagline"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.6 } } }}
              initial="hidden"
              animate={(isVisible && isReady && currentSection === 'hero') ? "visible" : "hidden"}
            >
              Impulsando marcas a través de diseño<br />
              estratégico y comunicación efectiva
            </motion.p>

            <motion.a
              href="#contacto"
              className="hero-cta-btn"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.85 } } }}
              initial="hidden"
              animate={(isVisible && isReady && currentSection === 'hero') ? "visible" : "hidden"}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(120,40,200,0.35)' }}
              whileTap={{ scale: 0.97 }}
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('contacto');
              }}
            >
              TRABAJEMOS JUNTOS
            </motion.a>
          </div>
        </div>

        {/* RIGHT: Photo with geometric shapes */}
        <motion.div
          className="hero-right"
          variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] } } }}
          initial="hidden"
          animate={(isVisible && isReady && currentSection === 'hero') ? "visible" : "hidden"}
        >
          <div className="hero-photo-wrapper">
            {/* The background circle with video texture */}
            <div className="hero-photo-bg-circle">
              <video
                src={getCldVideoUrl('qvduuiinx310xmoaxvpb')}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onCanPlayThrough={() => handleAssetLoad('circleVideo')}
                className="hero-photo-bg-video"
                style={{ willChange: 'transform' }}
              />
            </div>
            {/* Container that crops only the bottom to match the circle */}
            <div className="hero-photo-crop">
              <img
                src="https://res.cloudinary.com/dacmlsbqc/image/upload/f_auto,q_auto/v1775433533/srszsg5zmoays0rybfsh.png"
                alt="Laura Velasquez"
                onLoad={() => handleAssetLoad('photoImg')}
                className="hero-photo-img-large"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
