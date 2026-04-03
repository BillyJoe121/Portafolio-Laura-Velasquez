import React from 'react';
import { motion } from 'motion/react';
import {
  IconBrandBehance,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMail,
} from '@tabler/icons-react';
import whiteVideo from '../../assets/fondos/fondo-golden-white-slow.mp4';
import purpleVideo from '../../assets/fondos/liquid-gold-purple-slow.mp4';
import { VideoText } from '../../components/VideoText';
import { RadarContact } from '../../components/RadarContact';
import './ContactoSection.css';

/**
 * ContactoSection — Contact section with robot arm Spline and CTA + Social links.
 */
export function ContactoSection() {
  const socialLinks = [
    {
      name: 'Behance',
      icon: <IconBrandBehance size={20} stroke={1.5} />,
      url: 'https://www.behance.net/laurareina3?tracking_source=search_users|laura%20velasquez',
    },
    {
      name: 'Instagram',
      icon: <IconBrandInstagram size={20} stroke={1.5} />,
      url: 'https://www.instagram.com/lauravelasquez.di/',
    },
    {
      name: 'Whatsapp',
      icon: <IconBrandWhatsapp size={20} stroke={1.5} />,
      url: 'https://wa.me/573158443107',
    },
    {
      name: 'Email',
      icon: <IconMail size={20} stroke={1.5} />,
      url: 'mailto:laurasvelasquez27@gmail.com',
    },
  ];

  return (
    <div className="contact-section-inner">
      {/* Video Background — liquid gold white */}
      <div className="contacto-bg-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <video 
          src={whiteVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="contacto-bg-video"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Robot Arm Spline (sobre el video de fondo) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'auto' }}>
        <RadarContact visible={true} />
      </div>

      {/* Cabecera centrada sobre el Spline */}
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: 'none' }}
      >
        <VideoText
          videoSrc={purpleVideo}
          text="Hablemos"
          fontFamily="Surgena, sans-serif"
          fontSize="clamp(3rem, 7vw, 6rem)"
          fontWeight={700}
          className="contact-video-title"
        />
        <p
          className="contact-subtitle"
          style={{ fontFamily: 'var(--font-main)' }}
        >
          ¿Tienes un proyecto en mente? Estoy disponible para colaboraciones,
          asesorías y proyectos de diseño industrial.
        </p>

        <div className="contact-actions">
          {/* Social Links Row — "Radar Style" icons */}
          <div className="contact-social-row" style={{ pointerEvents: 'auto' }}>
            {socialLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noreferrer"
                className="social-icon-link"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + idx * 0.08,
                  ease: 'backOut',
                }}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                title={link.name}
              >
                <div className="social-icon-container">{link.icon}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
