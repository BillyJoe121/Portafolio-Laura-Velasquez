import React from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react';
import './HeroParallax.css';

/**
 * HeroParallax — Aceternity-style scroll parallax grid.
 * Converted from Tailwind + TS to vanilla CSS + JSX.
 *
 * Flow:
 *  1. Header text visible at top, cards behind with low opacity + 3D tilt
 *  2. On scroll → header scrolls away, cards rotate flat, opacity rises
 *  3. Continued scroll → cards slide laterally in alternating directions
 *
 * @param {{
 *   products: Array<{ title: string, link?: string, thumbnail: string, id?: string }>,
 *   onSelect?: (id: string) => void,
 *   containerRef?: React.RefObject<HTMLElement>
 * }} props
 */
export function HeroParallax({ products, onSelect, containerRef }) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ['start start', 'end start'],
  });

  const translateX = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const translateXReverse = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.1, 1]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2], [-400, 100]);

  return (
    <div ref={ref} className="hp-container">
      <Header />
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
      >
        <motion.div className="hp-row hp-row--reverse">
          {firstRow.map((product, i) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title + '-' + i}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
        <motion.div className="hp-row">
          {secondRow.map((product, i) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title + '-' + i}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
        <motion.div className="hp-row hp-row--reverse">
          {thirdRow.map((product, i) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title + '-' + i}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Header — Title section that sits above the parallax cards.
 */
function Header() {
  return (
    <div className="hp-header">
      <h1 className="hp-header-title">Proyectos</h1>
      <p className="hp-header-subtitle">
        Diseño industrial donde la estética impulsa el negocio.
        Explora una selección de proyectos que combinan funcionalidad
        técnica, experiencia de usuario y viabilidad comercial.
      </p>
    </div>
  );
}

/**
 * ProductCard — Individual product in the parallax grid.
 */
function ProductCard({ product, translate, onSelect }) {
  const handleClick = (e) => {
    if (onSelect && product.id) {
      e.preventDefault();
      onSelect(product.id);
    }
  };

  const CardComponent = product.cardComponent || null;

  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="hp-card"
    >
      <a
        href={product.link || '#'}
        onClick={handleClick}
        className="hp-card-link"
      >
        {CardComponent ? (
          /* Animated CSS card — no image needed */
          <div className="hp-card-img hp-card-component">
            <CardComponent />
          </div>
        ) : product.thumbnail ? (
          <img
            src={product.thumbnail}
            className="hp-card-img"
            alt={product.title}
            decoding="async"
            draggable={false}
          />
        ) : (
          <div
            className="hp-card-img"
            style={{
              backgroundColor: '#000',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Surgena, sans-serif',
              fontSize: '3rem',
              width: '100%',
              height: '100%'
            }}
          >
            {product.title}
          </div>
        )}
      </a>
      <div className="hp-card-overlay" />
      <h2 className="hp-card-title">{product.title}</h2>
    </motion.div>
  );
}
