import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FONT, SPACE } from '../theme';

const LIME     = '#C6F000';
const PINK_LINE = '#f135a1';

// Scatter starting positions — cards fly in from these offsets
const SCATTER = [
  { x: -220, y: -80, r: -18 },
  { x: -80,  y: -130, r: 12 },
  { x: 80,   y: -110, r: -10 },
  { x: 220,  y: -80,  r: 15 },
];

const beliefs = [
  {
    emoji: '/%F0%9F%94%A5.png', glow: '#FF6B00',
    parts: [{ t: 'MILD IS ' }, { t: 'BORING.', hi: true }],
  },
  {
    emoji: '/%F0%9F%8C%B6%EF%B8%8F.png', glow: '#FF4500',
    parts: [{ t: 'EXTRA ' }, { t: 'SPICY', hi: true }, { t: ' IS A PERSONALITY TRAIT' }],
  },
  {
    emoji: '/%E2%9A%A1.png', glow: '#FFD400',
    parts: [{ t: 'FOOD SHOULD MAKE YOU FEEL ' }, { t: 'SOMETHING', hi: true }],
  },
  {
    emoji: '/%F0%9F%AB%A6.png', glow: '#FF2E63',
    parts: [{ t: 'LIFE IS TOO ' }, { t: 'SHORT', hi: true }, { t: ' TO FOLLOW THE RULES' }],
  },
];

function BeliefItem({ emoji, glow, parts, delay, scatter, enableTilt }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  // 3D tilt — always created (hook rules), conditionally applied
  const mx  = useMotionValue(0);
  const my  = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 280, damping: 22 });
  const smy = useSpring(my, { stiffness: 280, damping: 22 });
  const rotX = useTransform(smy, [-0.5, 0.5], [10, -10]);
  const rotY = useTransform(smx, [-0.5, 0.5], [-10, 10]);

  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onMouseLeave() {
    mx.set(0); my.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x:       scatter ? scatter.x : 0,
        y:       scatter ? scatter.y : 24,
        rotate:  scatter ? scatter.r : 0,
        scale:   0.85,
      }}
      animate={inView
        ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
        : { opacity: 0, x: scatter ? scatter.x : 0, y: scatter ? scatter.y : 24, rotate: scatter ? scatter.r : 0, scale: 0.85 }
      }
      transition={scatter ? (inView ? {
        type:      'spring',
        stiffness: 180,
        damping:   16,
        delay,
        opacity: { type: 'tween', duration: 0.3, delay },
      } : {
        type:     'tween',
        duration: 0.45,
        ease:     [0.22, 1, 0.36, 1],
        delay:    0,
        opacity:  { duration: 0.2 },
      }) : {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        width:         '100%',
        textAlign:     'center',
        padding:       'clamp(6px, 1vw, 14px) clamp(14px, 2vw, 34px)',
        cursor:        'default',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           'clamp(12px, 1.6vw, 22px)',
      }}
    >
      {/* Inner div handles 3D tilt + glow */}
      <motion.div
        style={{
          width:         '100%',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           'clamp(12px, 1.6vw, 22px)',
          ...(enableTilt ? {
            rotateX:          rotX,
            rotateY:          rotY,
            transformPerspective: 600,
          } : {}),
        }}
        animate={{
          filter: hovered && enableTilt
            ? `drop-shadow(0 0 22px ${glow}bb) drop-shadow(0 0 55px ${glow}44)`
            : `drop-shadow(0 0 0px ${glow}00)`,
        }}
        transition={{ filter: { duration: 0.35 } }}
        onMouseMove={enableTilt ? onMouseMove   : undefined}
        onMouseLeave={enableTilt ? onMouseLeave : undefined}
        onMouseEnter={enableTilt ? () => setHovered(true) : undefined}
      >
        {/* Emoji */}
        <motion.div
          style={{ width: 65, height: 65, flexShrink: 0 }}
          animate={enableTilt ? {
            scale:  hovered ? 1.14 : 1,
            filter: hovered
              ? `drop-shadow(0 0 20px ${glow}) drop-shadow(0 0 40px ${glow}66)`
              : `drop-shadow(0 0 0px ${glow}00)`,
          } : {}}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={emoji}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </motion.div>

        {/* Text */}
        <div style={{
          fontFamily:    '"A Love of Thunder", sans-serif',
          fontSize:      'clamp(17px, 2.2vw, 32px)',
          lineHeight:    1.2,
          letterSpacing: '0.01em',
          textTransform: 'uppercase',
          color:         '#FFFFFF',
          width:         '100%',
          transition:    'text-shadow 0.35s ease',
          textShadow:    hovered && enableTilt ? `0 0 18px ${glow}cc, 0 0 40px ${glow}55` : 'none',
        }}>
          {parts.map((p, i) => (
            <span
              key={i}
              style={p.hi ? {
                color:      LIME,
                transition: 'text-shadow 0.35s ease',
                textShadow: hovered && enableTilt ? `0 0 18px ${LIME}cc, 0 0 40px ${LIME}66` : 'none',
              } : undefined}
            >
              {p.t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function BeliefRow() {
  const [isMobile, setIsMobile]     = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setActiveIndex(Math.round(el.scrollLeft / el.offsetWidth));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  if (isMobile) {
    return (
      <div>
        <div
          ref={scrollRef}
          style={{
            display:                 'flex',
            overflowX:               'auto',
            scrollSnapType:          'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth:          'none',
            msOverflowStyle:         'none',
          }}
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>
          {beliefs.map((b, i) => (
            <div
              key={i}
              style={{ flex: '0 0 100%', scrollSnapAlign: 'center', padding: '8px 24px 24px', boxSizing: 'border-box' }}
            >
              <BeliefItem {...b} delay={0} scatter={null} enableTilt={false} />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 4 }}>
          {beliefs.map((_, i) => (
            <div
              key={i}
              style={{
                width:      i === activeIndex ? 24 : 8,
                height:     4,
                borderRadius: 2,
                background: i === activeIndex ? LIME : 'rgba(255,255,255,0.35)',
                transition: 'width 0.25s ease, background 0.25s ease',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display:        'flex',
      flexDirection:  'row',
      alignItems:     'flex-start',
      justifyContent: 'center',
      maxWidth:       1600,
      margin:         '0 auto',
      width:          '100%',
      overflow:       'hidden', // clip cards while scattering in
    }}>
      {beliefs.map((b, i) => (
        <div
          key={i}
          style={{
            flex:       1,
            borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.28)' : 'none',
            display:    'flex',
            alignItems: 'flex-start',
          }}
        >
          <BeliefItem {...b} delay={0.1 * i} scatter={SCATTER[i]} enableTilt={true} />
        </div>
      ))}
    </div>
  );
}

export default function WhatWeStandFor() {
  const headRef    = useRef(null);
  const headInView = useInView(headRef, { once: false, margin: '-80px' });

  return (
    <div id="updates" style={{
      position:   'relative',
      background: 'radial-gradient(circle at 50% 50%, #F932A5 0%, #950658 100%)',
      isolation:  'isolate',
    }}>
      <div style={{
        padding:  `20px ${SPACE.sectionX} 40px`,
        textAlign: 'center',
        position:  'relative',
        zIndex:    2,
      }}>
        {/* WE BELIEVE heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: -12 }}
          animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 'clamp(20px, 2.8vw, 28px)', display: 'inline-block', position: 'relative' }}
        >
          <div style={{
            fontFamily:    'Brushfire, sans-serif',
            fontSize:      FONT.display,
            color:         LIME,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            lineHeight:    0.8,
          }}>
            WE BELIEVE
          </div>
          <div style={{ position: 'absolute', left: -10, right: -10, top: '100%', marginTop: 6 }}>
            <div style={{ height: 3, background: PINK_LINE, borderRadius: 2, transform: 'rotate(-1deg)', marginBottom: 4 }} />
            <div style={{ height: 3, background: PINK_LINE, borderRadius: 2, transform: 'rotate(-1deg)' }} />
          </div>
        </motion.div>

        <BeliefRow />
      </div>
    </div>
  );
}
