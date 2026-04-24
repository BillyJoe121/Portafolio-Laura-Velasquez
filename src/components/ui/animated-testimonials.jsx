"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CldImage } from "../CldImage";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  arrowColor = '#9013fe',
  arrowBorder = 'rgba(144, 19, 254, 0.3)',
  arrowHoverBg = 'rgba(144, 19, 254, 0.1)'
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 8000); // 8 seconds given the long text
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <>
      <style>{`
        .at-container {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 60px;
          align-items: center;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 20px;
        }
        .at-image-stack {
          position: relative;
          height: 400px;
          width: 100%;
        }
        @media (max-width: 900px) {
          .at-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .at-image-stack {
            height: 350px;
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>

      <div className="at-container">
        {/* Left Column: Image Stack */}
        <div className="at-image-stack">
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -30, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformOrigin: 'bottom'
                }}
              >
                <CldImage
                  publicId={testimonial.src}
                  alt={testimonial.name}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: '24px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Column: Text & Arrows */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                {testimonials[active].name}
              </h3>
              <p style={{ fontSize: '1rem', color: '#7c3aed', marginBottom: '24px', fontWeight: 600 }}>
                {testimonials[active].designation}
              </p>
              <motion.p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, fontStyle: 'italic', textAlign: 'justify' }}>
                "{testimonials[active].quote}"
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '40px', zIndex: 100 }}>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              style={{
                height: '48px',
                width: '48px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: `2px solid ${arrowBorder}`,
                color: arrowColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = arrowHoverBg;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <IconArrowLeft size={24} stroke={2.5} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              style={{
                height: '48px',
                width: '48px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: `2px solid ${arrowBorder}`,
                color: arrowColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = arrowHoverBg;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <IconArrowRight size={24} stroke={2.5} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
