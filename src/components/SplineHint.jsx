import React, { useState, useCallback } from 'react';
import './SplineHint.css';

const ICON_URL =
  'https://res.cloudinary.com/dacmlsbqc/image/upload/v1777050326/3d-modeling_12789950_1_v5btvl.png';

/**
 * SplineHint — Shows a pulsing "drag to interact" icon over a Spline 3D viewer.
 *
 * Spline renders inside an iframe, so pointer events from inside it do NOT
 * bubble up to the React parent. The fix: a transparent full-cover div with
 * pointer-events: auto sits above the scene and intercepts the very first
 * pointerdown. On that event it removes itself (and the visual hint), giving
 * the iframe full pointer control from that point on.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function SplineHint({ children }) {
  const [visible, setVisible] = useState(true);

  const handleFirstInteraction = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <div className="spline-hint-wrapper">
      {children}

      {visible && (
        <>
          {/* Transparent capture layer — absorbs the very first pointer event
              so the hint dismisses on click/drag.  After removal the Spline
              iframe receives all subsequent events normally. */}
          <div
            className="spline-hint-capture"
            onPointerDown={handleFirstInteraction}
            aria-hidden="true"
          />

          {/* Visual pulsing icon overlay (pointer-events: none so clicks
              fall through to the capture layer below in z-order) */}
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
