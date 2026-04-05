import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import purpleVideo from '../../assets/fondos/liquid-gold-purple-slow.mp4';
import whiteVideo from '../../assets/fondos/fondo-golden-white-slow.mp4';
import './HeroSection.css';

/**
 * HeroSection — animated "Laura Velasquez" text single line.
 * "s" uses purple video, others use white video.
 *
 * @param {{ currentSection: string, heroTextOpacity: import('motion/react').MotionValue }} props
 */
export function HeroSection({ currentSection, heroTextOpacity }) {
  const canvasRef = useRef(null);
  const videoPurpleRef = useRef(null);
  const videoWhiteRef = useRef(null);
  const rafRef = useRef(null);
  const offCanvasRef = useRef(null);

  useEffect(() => {
    const videoP = videoPurpleRef.current;
    const videoW = videoWhiteRef.current;
    const canvas = canvasRef.current;
    if (!videoP || !videoW || !canvas) return;

    const ctx = canvas.getContext('2d');
    
    if (!offCanvasRef.current) {
      offCanvasRef.current = document.createElement('canvas');
    }
    const offCanvas = offCanvasRef.current;
    const offCtx = offCanvas.getContext('2d');

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
        offCanvas.width = targetW;
        offCanvas.height = targetH;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Measure fonts and text
      // clamp(80px, 12vw, 180px)
      const fontSize = Math.max(80, Math.min(cw * 0.12, 180));
      const fontStr = `700 ${fontSize}px Surgena, sans-serif`;

      const textLeft = "Laura Vela";
      const textMid = "s";
      const textRight = "quez";

      ctx.font = fontStr;
      const mLeft = ctx.measureText(textLeft).width;
      const mMid = ctx.measureText(textMid).width;
      const mRight = ctx.measureText(textRight).width;

      const totalWidth = mLeft + mMid + mRight;
      const startX = (cw - totalWidth) / 2;
      const startY = ch / 2;

      // 1. Draw "Laura Vela" and "quez" with White Video
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#28282B';
      ctx.fillText(textLeft, startX, startY);
      ctx.fillText(textRight, startX + mLeft + mMid, startY);

      ctx.globalCompositeOperation = 'source-in';
      if (videoW.readyState >= 2) {
        const vw = videoW.videoWidth || cw;
        const vh = videoW.videoHeight || ch;
        const scale = Math.max(cw / vw, ch / vh);
        const sw = vw * scale;
        const sh = vh * scale;
        const sx = (cw - sw) / 2;
        const sy = (ch - sh) / 2;
        ctx.drawImage(videoW, sx, sy, sw, sh);
      }

      ctx.globalCompositeOperation = 'source-over';

      // 2. Draw "s" in offscreen canvas with Purple Video
      offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);
      offCtx.save();
      offCtx.scale(dpr, dpr);

      offCtx.font = fontStr;
      offCtx.textBaseline = 'middle';
      offCtx.textAlign = 'left';
      offCtx.fillStyle = '#28282B';
      offCtx.fillText(textMid, startX + mLeft, startY);

      offCtx.globalCompositeOperation = 'source-in';
      if (videoP.readyState >= 2) {
        const vw = videoP.videoWidth || cw;
        const vh = videoP.videoHeight || ch;
        const scale = Math.max(cw / vw, ch / vh);
        const sw = vw * scale;
        const sh = vh * scale;
        const sx = (cw - sw) / 2;
        const sy = (ch - sh) / 2;
        offCtx.drawImage(videoP, sx, sy, sw, sh);
      }

      offCtx.restore();

      // Draw offCanvas onto main
      ctx.drawImage(offCanvas, 0, 0, offCanvas.width, offCanvas.height, 0, 0, cw, ch);

      // 3. Draw Outline sutil solicitado
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0; // Desactivar sombra para el delineado nítido
      ctx.strokeStyle = '#28282B';
      ctx.lineWidth = 0.5 * dpr;
      ctx.strokeText(textLeft, startX, startY);
      ctx.strokeText(textMid, startX + mLeft, startY);
      ctx.strokeText(textRight, startX + mLeft + mMid, startY);

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };

    const startDrawing = () => {
      cancelAnimationFrame(rafRef.current);
      draw();
    };

    videoP.addEventListener('playing', startDrawing);
    videoW.addEventListener('playing', startDrawing);
    if (!videoP.paused && !videoP.ended) startDrawing();

    return () => {
      videoP.removeEventListener('playing', startDrawing);
      videoW.removeEventListener('playing', startDrawing);
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
        ref={videoPurpleRef}
        src={purpleVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
      />
      <video
        ref={videoWhiteRef}
        src={whiteVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
      />

      <motion.div
        className="hero-fade-wrapper"
        style={{
          width: '100%',
          height: '100%',
          opacity: heroTextOpacity,
          // Filtro oscuro localizado detrás de las letras ("los círculos")
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.25) 0%, transparent 70%)',
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
