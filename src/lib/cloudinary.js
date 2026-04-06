import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

/**
 * Instancia central de Cloudinary.
 */
export const cld = new Cloudinary({
  cloud: {
    cloudName: 'dacmlsbqc'
  }
});

/**
 * Helper base para imágenes.
 */
export const getCldImage = (publicId) => {
  return cld.image(publicId)
    .format('auto')
    .quality('auto');
};

/**
 * Helper para Miniaturas (Redimensionadas).
 * Usamos una URL de transformación directa para máxima compatibilidad.
 */
export const getCldThumbnailUrl = (publicId) => {
  // Construimos una versión optimizada manualmente para evitar errores de SDK
  return `https://res.cloudinary.com/dacmlsbqc/image/upload/w_600,c_scale,f_auto,q_auto/${publicId}`;
};

/**
 * Helper base para videos.
 */
export const getCldVideo = (publicId) => {
  return cld.video(publicId)
    .format('auto')
    .quality('auto');
};

/**
 * Helper de URL de Video.
 */
export const getCldVideoUrl = (publicId) => {
  return getCldVideo(publicId).toURL();
};

/**
 * Helper de URL de Imagen (Full resolution).
 */
export const getCldImageUrl = (publicId) => {
  return getCldImage(publicId).toURL();
};
