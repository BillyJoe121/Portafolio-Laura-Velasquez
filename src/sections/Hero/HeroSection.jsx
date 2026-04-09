import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { getCldVideoUrl } from '../../lib/cloudinary';
import './HeroSection.css';

/**
 * HeroSection — animated "Laura Velasquez" text single line.
 * "s" uses purple video, others use white video.
 *
 * @param {{ currentSection: string, heroTextOpacity: import('motion/react').MotionValue }} props
 */
export function HeroSection({ currentSection, heroTextOpacity }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

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
      const fontSize = Math.max(80, Math.min(cw * 0.12, 180));
      const fontStr = `700 ${fontSize}px Surgena, sans-serif`;
      const fullName = "Laura Velasquez";

      ctx.font = fontStr;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      const x = cw / 2;
      const y = ch / 2;

      // 1. Draw Text for Masking
      ctx.fillStyle = '#000'; // Color doesn't matter for source-in
      ctx.fillText(fullName, x, y);

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

      // 3. Draw Outline
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#28282B';
      ctx.lineWidth = 0.5 * dpr;
      ctx.strokeText(fullName, x, y);

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
      style={{ height: '100vh', position: 'relative', pointerEvents: 'none', backgroundColor: 'transparent' }}
    >
      <video
        ref={videoRef}
        src={getCldVideoUrl('assets/fondos/liquid-gold-purple-slow')}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
      />

      <motion.div
        className="hero-fade-wrapper"
        style={{
          width: '100%',
          height: '100%',
          opacity: heroTextOpacity,
          background: 'transparent',
        }}
      >
        <motion.div
          className="hero-slide-wrapper"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            width: '100%', 
            height: '100%',
            filter: 'drop-shadow(0px 15px 40px rgba(0, 0, 0, 0.18))' 
          }}
        >
          <canvas 
            ref={canvasRef} 
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'block',
              willChange: 'filter'
            }} 
          />
        </motion.div>
      </motion.div>
    </main>
  );
}
