import React, { useState, useCallback, useRef } from 'react';
import './SplineHint.css';

const ICON_URL =
  'https://res.cloudinary.com/dacmlsbqc/image/upload/v1777050326/3d-modeling_12789950_1_v5btvl.png';

/**
 * SplineHint — Shows a pulsing "drag to interact" icon over a Spline 3D viewer.
 *
 * Fix: on first pointerdown, we hide the capture layer, then re-dispatch the
 * same event at the same coordinates so it reaches the Spline iframe underneath.
 * This way the first interaction both dismisses the hint AND moves the 3D model.
 */
export function SplineHint({ children }) {
  const [visible, setVisible] = useState(true);
  const captureRef = useRef(null);

  const handleFirstInteraction = useCallback((e) => {
    // 1. Hide the capture layer immediately so it's out of the hit-test path
    setVisible(false);

    // 2. Re-dispatch the same pointer event at the same position so the
    //    Spline iframe underneath receives it as if the overlay never existed.
    //    We do this in a microtask so React has time to unmount the overlay first.
    const { clientX, clientY, pointerId, pointerType, button, buttons, pressure } = e;
    requestAnimationFrame(() => {
      const target = document.elementFromPoint(clientX, clientY);
      if (target) {
        target.dispatchEvent(
          new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true,
            clientX,
            clientY,
            pointerId,
            pointerType,
            button,
            buttons,
            pressure,
          })
        );
      }
    });
  }, []);

  return (
    <div className="spline-hint-wrapper">
      {children}

      {visible && (
        <>
          {/* Transparent capture layer */}
          <div
            ref={captureRef}
            className="spline-hint-capture"
            onPointerDown={handleFirstInteraction}
            aria-hidden="true"
          />

          {/* Visual pulsing icon overlay (pointer-events: none) */}
          <div className="spline-hint-overlay" aria-hidden="true">
            <div className="spline-hint-icon-ring">
              <img
                src={ICON_URL}
                alt="Interactúa con el modelo 3D"
                className="spline-hint-icon"
              />
            </div>
            <span className="spline-hint-label">Arrastra para interactuar</span>
          </div>
        </>
      )}
    </div>
  );
}
