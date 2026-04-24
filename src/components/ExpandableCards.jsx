import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; // or motion/react depending on user's exact version, but framer-motion is safer if they imported AnimatePresence from it. Actually, wait! In App.jsx they imported from "motion/react". I will use that to match.
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/use-outside-click";
import "./ExpandableCards.css";

// We'll map the Tailwind classes from Aceternity to our new CSS classes:
export function ExpandableCards() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const expandedContent = (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ec-overlay"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="ec-container">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="ec-card-expanded"
            >
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="ec-close-btn"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div layoutId={`image-${active.title}-${id}`} className="ec-img-wrapper">
                <img
                  src={active.src}
                  alt={active.title}
                  className="ec-expanded-img"
                />
              </motion.div>

              <div className="ec-card-body">
                <div className="ec-expanded-header">
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="ec-expanded-desc"
                  >
                    {active.description}
                  </motion.p>
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="ec-expanded-title"
                  >
                    {active.title}
                  </motion.h3>
                </div>
                <div className="ec-expanded-content">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {isMounted && createPortal(expandedContent, document.body)}
      <ul className="ec-list">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="ec-list-item"
          >
            <div className="ec-list-item-content">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  src={card.src}
                  alt={card.title}
                  className="ec-list-img"
                />
              </motion.div>
              <div className="ec-list-text">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="ec-list-title"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="ec-list-desc"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="ec-list-btn"
            >
              Ver detalle
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ec-close-svg"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Octubre 2023",
    title: "Primer Puesto: Rally de Innovación",
    src: "https://res.cloudinary.com/dacmlsbqc/image/upload/v1777046404/WhatsApp_Image_2026-04-24_at_7.53.48_AM_ruhbku.jpg",
    content: () => {
      return (
        <p>
          Participé en un equipo de estudiantes de distintos semestres del programa
          de Diseño Industrial para diseñar una propuesta estratégica que visibilizara
          el impacto de la carrera dentro de la Universidad Icesi. En este reto de
          diseño relámpago, integramos metodologías de pensamiento sistémico y estrategias
          de comunicación visual, logrando el máximo reconocimiento por nuestra capacidad
          de síntesis y creatividad aplicada.
        </p>
      );
    },
  },
  {
    description: "Noviembre 2025",
    title: 'Primer Puesto: Pitch Empresarial HUB Icesi – "Cinco Minutos Más"',
    src: "https://res.cloudinary.com/dacmlsbqc/image/upload/v1777046404/WhatsApp_Image_2026-04-24_at_7.53.43_AM_odmrvd.jpg",
    content: () => {
      return (
        <p>
          Ganadora del primer lugar entre iniciativas de pregrado y egresados en el certamen
          "Así formamos empresarios". Desarrollé y puse en marcha un modelo de negocio completo
          que fue validado bajo condiciones de mercado reales, gestionando inversión, producción
          y ventas. Este logro certifica que mi enfoque de diseño no solo es estético, sino
          financieramente rentable, factible y deseable.
        </p>
      );
    },
  },
  {
    description: "Proyecto de Grado",
    title: "Snacking Hands-Free – Reto Bon Bon Bum Contra",
    src: "https://res.cloudinary.com/dacmlsbqc/image/upload/v1777046404/WhatsApp_Image_2026-04-24_at_7.53.52_AM_epei2f.jpg",
    content: () => {
      return (
        <p>
          Como parte de mi proyecto de grado en Diseño Industrial, lidero el desarrollo de un dispositivo innovador "hands-free" diseñado para el equipo competitivo Contra de Colombina. El reto consiste en eliminar la "fricción física" que impide a los atletas de eSports consumir un Bon Bon Bum durante partidas de alta intensidad, como en Valorant, sin sacrificar su rendimiento.
        </p>
      );
    },
  },
];
