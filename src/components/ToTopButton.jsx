import { useEffect, useRef, useState } from 'react';

const RING_CIRCUMFERENCE = 144.5;
const TEXT_RING_CIRCUMFERENCE = 2 * Math.PI * 42;

export default function ToTopButton() {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(null);
  const textMaskRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);
      }
      if (textMaskRef.current) {
        textMaskRef.current.style.strokeDashoffset = TEXT_RING_CIRCUMFERENCE * (1 - progress);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      id="toTop"
      className={`to-top${visible ? ' visible' : ''}`}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <svg className="to-top-text-ring" viewBox="0 0 108 108" aria-hidden="true">
        <defs>
          <path id="to-top-text-path" d="M 54,54 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
          <mask id="to-top-text-mask">
            <circle
              ref={textMaskRef}
              cx="54"
              cy="54"
              r="42"
              fill="none"
              stroke="#fff"
              strokeWidth="14"
              strokeDasharray={TEXT_RING_CIRCUMFERENCE}
              strokeDashoffset={TEXT_RING_CIRCUMFERENCE}
              transform="rotate(-90 54 54)"
            />
          </mask>
        </defs>
        <text mask="url(#to-top-text-mask)">
          <textPath
            href="#to-top-text-path"
            startOffset="0%"
            textLength={TEXT_RING_CIRCUMFERENCE}
            lengthAdjust="spacingAndGlyphs"
          >
            roshan ashraf ahmed •
          </textPath>
        </text>
      </svg>
      <svg className="to-top-ring" width="52" height="52" viewBox="0 0 52 52">
        <circle className="to-top-track" cx="26" cy="26" r="23" />
        <circle className="to-top-progress" ref={progressRef} cx="26" cy="26" r="23" />
      </svg>
      <span className="to-top-arrow" aria-hidden="true">↑</span>
    </button>
  );
}
