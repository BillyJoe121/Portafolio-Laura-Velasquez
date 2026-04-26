import React, { useRef, useEffect } from 'react';

/**
 * VideoText — Renders text filled with a looping video using canvas masking.
 * Falls back to a solid gradient while the video is loading.
 */
export function VideoText({
  videoSrc,
  text,
  fontFamily = 'Surgena, sans-serif',
  fontSize = '6rem',
  fontWeight = 700,
  className = '',
  style = {},
  onVideoReady,
}) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const textMeasureRef = useRef(null);
  const rafRef = useRef(null);
  const videoReadyRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const textMeasure = textMeasureRef.current;
    if (!video || !canvas || !textMeasure) return;

    const ctx = canvas.getContext('2d');

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
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

      const resolvedFontSize = window.getComputedStyle(textMeasure).fontSize;
      ctx.font = `${fontWeight} ${resolvedFontSize} ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (videoReadyRef.current && video.readyState >= 2) {
        // Video is ready — draw text as mask and fill with video
        ctx.fillStyle = '#000';
        ctx.fillText(text, cw / 2, ch / 2);

        ctx.globalCompositeOperation = 'source-in';
        const vw = video.videoWidth || cw;
        const vh = video.videoHeight || ch;
        const scale = Math.max(cw / vw, ch / vh);
        const sw = vw * scale;
        const sh = vh * scale;
        const sx = (cw - sw) / 2;
        const sy = (ch - sh) / 2;
        ctx.drawImage(video, sx, sy, sw, sh);
      } else {
        // Fallback — draw solid text with a gradient color (no video needed)
        const gradient = ctx.createLinearGradient(0, 0, cw, 0);
        gradient.addColorStop(0, '#9013fe');
        gradient.addColorStop(1, '#b456ff');
        ctx.fillStyle = gradient;
        ctx.fillText(text, cw / 2, ch / 2);
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };

    // Start drawing immediately (fallback mode)
    cancelAnimationFrame(rafRef.current);
    draw();

    const onPlaying = () => {
      videoReadyRef.current = true;
      if (onVideoReady) onVideoReady();
    };

    video.addEventListener('playing', onPlaying);
    video.addEventListener('canplaythrough', () => {
      videoReadyRef.current = true;
      if (onVideoReady) onVideoReady();
    });

    // If video is already playing
    if (!video.paused && !video.ended && video.readyState >= 2) {
      videoReadyRef.current = true;
    }

    return () => {
      video.removeEventListener('playing', onPlaying);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, fontFamily, fontSize, fontWeight]);

  return (
    <div className={`video-text-wrapper ${className}`} style={style}>
      {/* Hidden element to resolve dynamic font size (clamp, vw, etc) */}
      <div 
        ref={textMeasureRef} 
        style={{ 
          position: 'absolute', 
          visibility: 'hidden', 
          fontSize: fontSize,
          fontFamily: fontFamily,
          fontWeight: fontWeight,
          pointerEvents: 'none'
        }}
      >
        {text}
      </div>

      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
      />
      <canvas ref={canvasRef} className="video-text-canvas" />
    </div>
  );
}
