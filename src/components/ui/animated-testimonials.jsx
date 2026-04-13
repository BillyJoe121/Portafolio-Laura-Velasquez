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
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div style={{ width: '100%', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Centered Image Stack with panoramic width */}
      <div style={{ position: 'relative', height: '450px', width: '640px', flexShrink: 0 }}>
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
                originBottom: 'bottom'
              }}
            >
              <CldImage
                publicId={testimonial.src}
                alt="Planos Stack"
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation arrows below - Customizable colors */}
      <div style={{ display: 'flex', gap: '30px', marginTop: '50px', zIndex: 100, position: 'relative' }}>
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          style={{
            height: '56px',
            width: '56px',
            borderRadius: '50%',
            backgroundColor: 'transparent', 
            border: `2px solid ${arrowBorder}`,
            color: arrowColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 101,
            pointerEvents: 'auto'
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
          <IconArrowLeft size={32} stroke={2.5} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          style={{
            height: '56px',
            width: '56px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: `2px solid ${arrowBorder}`,
            color: arrowColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 101,
            pointerEvents: 'auto'
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
          <IconArrowRight size={32} stroke={2.5} />
        </button>
      </div>
    </div>
  );
};
