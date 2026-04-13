import { cn } from "../lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import "./FloatingDock.css";

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("floating-dock-mobile", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="fd-mobile-panel"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  className="fd-mobile-item-btn"
                  style={{ 
                    width: "auto", 
                    padding: "0 16px", 
                    borderRadius: "20px",
                    backgroundColor: item.highlighted ? 'transparent' : '#ffffff',
                    color: '#6d28d9',
                    fontWeight: item.highlighted ? '600' : '400',
                    border: item.highlighted ? '1.5px solid #7c3aed' : '1px solid transparent'
                  }}
                >
                  <span style={{ 
                    fontFamily: 'var(--font-main)',
                    fontSize: "14px", 
                    marginRight: item.icon ? "8px" : "0", 
                    color: '#6d28d9'
                  }}>{item.title}</span>
                  {item.icon && <div style={{ height: "16px", width: "16px" }}>{item.icon}</div>}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="fd-mobile-toggle"
      >
        <IconLayoutNavbarCollapse style={{ height: "20px", width: "20px" }} />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn("floating-dock-desktop", className)}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href, onClick, style: itemStyle, highlighted }) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Instead of static widths, we dynamically adjust height, fontSize, and padding
  // To keep it rectangular and hold text dynamically based on title length
  let heightTransform = useTransform(distance, [-150, 0, 150], [35, 55, 35]);
  let fontSizeTransform = useTransform(distance, [-150, 0, 150], [14, 20, 14]);
  let paddingHTransform = useTransform(distance, [-150, 0, 150], [16, 26, 16]);

  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let fontSize = useSpring(fontSizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let paddingHorizontal = useSpring(paddingHTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleClick = (e) => {
    e.preventDefault();
    if (typeof onClick === 'function') {
      onClick();
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a href={href} onClick={handleClick} className="fd-link">
      <motion.div
        ref={ref}
        style={{
          height,
          fontSize,
          paddingLeft: paddingHorizontal,
          paddingRight: paddingHorizontal,
          backgroundColor: highlighted ? 'transparent' : '#ffffff',
          color: '#6d28d9',
          border: highlighted ? '1.5px solid #7c3aed' : '1.5px solid transparent'
        }}
        className="fd-icon-container"
      >
        <motion.span 
          className="whitespace-pre" 
          style={{ 
            ...itemStyle, 
            fontFamily: 'var(--font-main)',
            color: '#6d28d9',
            fontWeight: highlighted ? '600' : '400'
          }}
        >
          {title}
        </motion.span>
      </motion.div>
    </a>
  );
}
