"use client";
import { cn } from "../../lib/utils";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { CldImage } from "../CldImage";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  arrowColor = '#9013fe',
  arrowBorder = 'rgba(144, 19, 254, 0.3)',
  arrowHoverBg = 'rgba(144, 19, 254, 0.1)',
  variant = 'default', // 'default' or 'planos'
  showText = true,
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
      const interval = setInterval(handleNext, 8000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const isPlanos = variant === 'planos';

  // Memoize random rotations to prevent re-render storms
  const randomRotations = useMemo(() => {
    const range = isPlanos ? 4 : 21;
    const offset = isPlanos ? 2 : 10;
    return testimonials.map(() => Math.floor(Math.random() * range) - offset);
  }, [testimonials.length, isPlanos]);

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
        .at-container.variant-planos {
          display: flex;
          flex-direction: column;
          grid-template-columns: none;
          gap: 12px;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .at-image-stack {
          position: relative;
          height: 400px;
          width: 100%;
        }
        .variant-planos .at-image-stack {
          width: 730px;
          height: auto;
          aspect-ratio: 1.414 / 1;
        }
        .at-name {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .at-designation {
          font-size: 1rem;
          margin-bottom: 24px;
          font-weight: 600;
        }
        .at-quote {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.8;
          font-style: italic;
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
          .variant-planos .at-image-stack {
            height: auto;
            aspect-ratio: 1.414 / 1;
            max-width: 100%;
          }
          .at-name {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className={cn("at-container", isPlanos && "variant-planos")}>
        {/* Image Stack */}
        <div className="at-image-stack">
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: randomRotations[index],
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  rotate: isActive(index) ? 0 : randomRotations[index],
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -30, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: randomRotations[index],
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
                  alt={testimonial.name || "Testimonial"}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Text & Arrows Column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: isPlanos ? 'center' : 'flex-start',
          width: '100%'
        }}>
          {showText && testimonials[active].quote && (
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {testimonials[active].name && (
                  <h3 className="at-name">
                    {testimonials[active].name}
                  </h3>
                )}
                {testimonials[active].designation && (
                  <p className="at-designation" style={{ color: arrowColor }}>
                    {testimonials[active].designation}
                  </p>
                )}
                <motion.p 
                  className="at-quote" 
                  style={{ textAlign: isPlanos ? 'center' : 'justify' }}
                >
                  {testimonials[active].quote}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Navigation arrows */}
          <div style={{ display: 'flex', gap: '16px', marginTop: isPlanos ? '8px' : '40px', zIndex: 100 }}>
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
