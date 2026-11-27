import { useEffect, useRef } from 'react';

const HOVER_TARGETS = 'a, button, input[type="range"], .skill-pill, [data-animate] .contact-card';

export default function CustomCursor({ enabled = true }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add('custom-cursor-active');

    const onMove = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    const onOver = (e) => {
      if (e.target.closest(HOVER_TARGETS)) cursor.classList.add('cursor-hover');
    };
    const onOut = (e) => {
      if (e.target.closest(HOVER_TARGETS)) cursor.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />;
}
