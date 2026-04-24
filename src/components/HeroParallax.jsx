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

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.1, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-400, 100]),
    springConfig
  );

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
  const [isReady, setIsReady] = React.useState(false);

  // Delay for animations
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const titleWords = "Del concepto al detalle: un recorrido por mis creaciones.".split(" ");

  const ease = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.0, ease },
    },
  };

  const paraDelay = titleWords.length * 0.08 + 0.15;

  const paraVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease, delay: paraDelay },
    },
  };

  const scrollCueVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease, delay: paraDelay + 0.2 },
    },
  };

  return (
    <div className="hp-header">
      <div className="hp-header-inner">
        <motion.h1
          className="hp-header-title"
          variants={containerVariants}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          {titleWords.map((word, i) => (
            <React.Fragment key={i}>
              <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                <motion.span style={{ display: 'inline-block' }} variants={wordVariants}>
                  {word}
                </motion.span>
              </span>
              {i < titleWords.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.p
          className="hp-header-subtitle"
          variants={paraVariants}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          Creo en el diseño que se valida con las manos. En esta sección he recopilado
          proyectos que van desde modelos de negocio premiados hasta prototipado con
          impresión 3D e innovación en materiales. Te invito a conocer cómo aplico la
          iteración y la disciplina para dar vida a soluciones con impacto real. ¿Exploramos el proceso?
        </motion.p>
      </div>

      <motion.div
        className="hp-scroll-cue"
        variants={scrollCueVariants}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
      >
        <span>scroll</span>
        <div className="hp-scroll-line" />
      </motion.div>
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
            width="600"
            height="600"
            className="hp-card-img"
            alt={product.title}
            loading="lazy"
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
