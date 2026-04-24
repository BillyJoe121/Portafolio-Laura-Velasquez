import React, { useRef, useEffect } from 'react';

/**
 * VideoText — Renders text filled with a looping video using canvas masking.
 *
 * @param {{ videoSrc: string, text: string, fontFamily?: string, fontSize?: string, fontWeight?: number, className?: string }} props
 */
export function VideoText({
  videoSrc,
  text,
  fontFamily = 'Surgena, sans-serif',
  fontSize = '6rem',
  fontWeight = 700,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const textMeasureRef = useRef(null);
  const rafRef = useRef(null);

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

      // Only resize if needed
      const targetW = Math.round(cw * dpr);
      const targetH = Math.round(ch * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Resolve dynamic font size (clamp, vw, etc)
      const resolvedFontSize = window.getComputedStyle(textMeasure).fontSize;

      // 1. Draw text in solid color (this creates the mask shape)
      ctx.font = `${fontWeight} ${resolvedFontSize} ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000';
      ctx.fillText(text, cw / 2, ch / 2);

      // 2. Fill only the text pixels with the video frame
      ctx.globalCompositeOperation = 'source-in';
      
      // Cover-fit the video into the canvas area
      const vw = video.videoWidth || cw;
      const vh = video.videoHeight || ch;
      const scale = Math.max(cw / vw, ch / vh);
      const sw = vw * scale;
      const sh = vh * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;
      ctx.drawImage(video, sx, sy, sw, sh);

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };

    // Start drawing once the video can play
    const startDrawing = () => {
      cancelAnimationFrame(rafRef.current);
      draw();
    };

    video.addEventListener('playing', startDrawing);
    video.addEventListener('seeked', startDrawing);

    // If video is already playing
    if (!video.paused && !video.ended) {
      startDrawing();
    }

    return () => {
      video.removeEventListener('playing', startDrawing);
      video.removeEventListener('seeked', startDrawing);
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
