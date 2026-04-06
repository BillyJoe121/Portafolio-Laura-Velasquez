import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { getCldImage } from '../lib/cloudinary';

/**
 * Optimized Cloudinary Image component.
 * @param {string} publicId - Cloudinary public ID (e.g. 'assets/proyectos/Luminy/titulo')
 * @param {string} alt - Alt text
 * @param {string} className - CSS classes
 * @param {object} style - Inline styles
 */
export const CldImage = ({ publicId, alt, className, style }) => {
  if (!publicId) return null;
  
  // If it's already an absolute URL (http/https), just render a normal img
  if (publicId.startsWith('http')) {
    return <img src={publicId} alt={alt} className={className} style={style} />;
  }

  // Robust cleaning: We want 'assets/...'
  // 1. Remove leading slashes and relative indicators
  // 2. Look for the last occurrence of 'assets/'
  const assetsIndex = publicId.indexOf('assets/');
  let cleanId = assetsIndex !== -1 ? publicId.substring(assetsIndex) : publicId;
  
  // 3. Remove file extension
  cleanId = cleanId.replace(/\.[^/.]+$/, "");

  console.log(`[CldImage] publicId Mapping: ${publicId} -> ${cleanId}`);

  const myImg = getCldImage(cleanId);

  return (
    <AdvancedImage 
      cldImg={myImg} 
      alt={alt} 
      className={className} 
      style={style}
    />
  );
};
