import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { getCldVideoUrl } from '../../lib/cloudinary';
import './HeroSection.css';

/**
 * HeroSection — Laura Velasquez hero.
 * Two-line text with video mask, geometric shapes, and photo circle.
 */
export function HeroSection({ currentSection, heroTextOpacity, onNavigate }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    video.playbackRate = 4.0;

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

      // 1. Draw Text for Masking
      ctx.fillStyle = '#000';
      ctx.fillText(line1, x, centerY - lineHeight / 2);
      ctx.fillText(line2, x, centerY + lineHeight / 2);

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
    if (!video.paused && !video.ended) startDrawing();

    return () => {
      video.removeEventListener('playing', startDrawing);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <main
      id="section-hero"
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
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              IMPULSANDO MARCAS A TRAVÉS DE DISEÑO<br />
              ESTRATÉGICO Y COMUNICACIÓN EFECTIVA
            </motion.p>

            <motion.a
              href="#contacto"
              className="hero-cta-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
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
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                className="hero-photo-bg-video"
                style={{ willChange: 'transform' }}
              />
            </div>
            {/* Container that crops only the bottom to match the circle */}
            <div className="hero-photo-crop">
              <img
                src="https://res.cloudinary.com/dacmlsbqc/image/upload/v1775433533/srszsg5zmoays0rybfsh.png"
                alt="Laura Velasquez"
                className="hero-photo-img-large"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
