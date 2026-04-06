import React from 'react';
import { AdvancedVideo } from '@cloudinary/react';
import { getCldVideo } from '../lib/cloudinary';

/**
 * Optimized Cloudinary Video component.
 * @param {string} publicId - Cloudinary public ID
 * @param {boolean} controls - Whether to show controls
 * @param {boolean} autoPlay - Whether to autoplay
 * @param {boolean} loop - Whether to loop
 * @param {boolean} muted - Whether to mute
 * @param {string} className - CSS classes
 * @param {object} style - Inline styles
 */
export const CldVideo = ({ publicId, controls, autoPlay, loop, muted, className, style, playsInline }) => {
  if (!publicId) return null;

  const assetsIndex = publicId.indexOf('assets/');
  let cleanId = assetsIndex !== -1 ? publicId.substring(assetsIndex) : publicId;
  
  cleanId = cleanId.replace(/\.[^/.]+$/, "");

  console.log(`[CldVideo] publicId Mapping: ${publicId} -> ${cleanId}`);

  const myVid = getCldVideo(cleanId);

  return (
    <AdvancedVideo 
      cldVid={myVid} 
      controls={controls} 
      autoPlay={autoPlay} 
      loop={loop} 
      muted={muted} 
      playsInline={playsInline}
      className={className} 
      style={style}
    />
  );
};
