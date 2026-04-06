import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  IconBrandBehance,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMail,
} from '@tabler/icons-react';
import { getCldVideoUrl } from '../../lib/cloudinary';
import { VideoText } from '../../components/VideoText';
import { RadarContact } from '../../components/RadarContact';
import './ContactoSection.css';

/**
 * ContactoSection — Contact section with robot arm Spline and CTA + Social links.
 */
export function ContactoSection() {
  const [showToast, setShowToast] = useState(false);

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
      url: 'mailto:lauravelasquez27@gmail.com',
      copy: 'lauravelasquez27@gmail.com'
    },
  ];

  const handleLinkClick = (e, link) => {
    if (link.copy) {
      e.preventDefault();
      navigator.clipboard.writeText(link.copy).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      });
    }
  };

  return (
    <div className="contact-section-inner" style={{ backgroundColor: '#ffffff' }}>
      {/* Robot Arm Spline (interactivo sobre fondo blanco) */}
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
          videoSrc={getCldVideoUrl('assets/fondos/liquid-gold-purple-slow')}
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
          <div className="contact-social-row" style={{ pointerEvents: 'auto' }}>
            {socialLinks.map((link, idx) => (
              <div key={link.name} style={{ position: 'relative' }}>
                <AnimatePresence>
                  {link.copy && showToast && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, x: '-50%' }}
                      animate={{ opacity: 1, y: -45, x: '-50%' }}
                      exit={{ opacity: 0, y: 10, x: '-50%' }}
                      className="contact-toast"
                      style={{
                        position: 'absolute',
                        left: '50%',
                        zIndex: 100,
                        backgroundColor: '#28282B',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontFamily: 'var(--font-main)',
                        fontSize: '12px',
                        fontWeight: 600,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none'
                      }}
                    >
                      Correo copiado
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-link"
                  onClick={(e) => handleLinkClick(e, link)}
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
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
