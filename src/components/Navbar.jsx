import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LIME = '#C6F000';
const PINK = '#E81B86';

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'MANIFESTO', href: '#manifesto' },
    { label: 'ABOUT',     href: '#founder'   },
    { label: 'UPDATES',   href: '#updates'   },
  ];

  return (
    <nav style={{
      position:        'fixed',
      top:             0,
      left:            0,
      right:           0,
      zIndex:          100,
      height:          64,
      display:         'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems:      'center',
      padding:         '0 clamp(20px, 4vw, 52px)',
      background:      scrolled ? 'rgba(8,0,4,0.93)' : 'transparent',
      backdropFilter:  scrolled ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      transition:      'background 0.35s ease, border-color 0.35s ease',
      borderBottom:    scrolled ? '1px solid rgba(198,240,0,0.1)' : '1px solid transparent',
    }}>

      {/* ── LEFT: Logo ── */}
      <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
        <span style={{
          fontFamily:    '"A Love of Thunder", sans-serif',
          fontSize:      'clamp(24px, 2.8vw, 34px)',
          color:         PINK,
          letterSpacing: '0.03em',
          lineHeight:    1,
        }}>SHIKA</span>
        {/* Asterisk burst */}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginBottom: 7 }}>
          <line x1="8" y1="1"   x2="8"    y2="15"   stroke={PINK} strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="1" y1="8"   x2="15"   y2="8"    stroke={PINK} strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="2.5" y1="2.5"  x2="13.5" y2="13.5" stroke={PINK} strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="13.5" y1="2.5" x2="2.5"  y2="13.5" stroke={PINK} strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </a>

      {/* ── CENTER: Nav links ── */}
      <div style={{
        display:    'flex',
        alignItems: 'center',
        gap:        'clamp(24px, 3.5vw, 52px)',
      }} className="nav-desktop">
        {navLinks.map(({ label, href }) => (
          <a key={label} href={href} style={{
            fontFamily:    'Oswald, sans-serif',
            fontWeight:    500,
            fontSize:      'clamp(11px, 1vw, 13px)',
            letterSpacing: '0.2em',
            color:         'rgba(255,255,255,0.8)',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition:    'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = LIME}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
          >
            {label}
          </a>
        ))}
      </div>

      {/* ── RIGHT: CTA + mobile toggle ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {/* Desktop CTA */}
        <motion.a
          href="#inner-circle"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="nav-desktop"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            6,
            background:     LIME,
            color:          '#0A0006',
            fontFamily:     'Oswald, sans-serif',
            fontWeight:     700,
            fontSize:       'clamp(11px, 1vw, 13px)',
            letterSpacing:  '0.15em',
            textTransform:  'uppercase',
            textDecoration: 'none',
            padding:        '10px 20px',
            borderRadius:   2,
          }}
        >
          JOIN THE CULT
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2 12 L12 2 M5 2 h7 v7" stroke="#0A0006" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-toggle"
          style={{
            display:    'none',
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            padding:    4,
          }}
        >
          <svg width="26" height="18" viewBox="0 0 26 18" fill="none">
            <line x1="0" y1="2"  x2="26" y2="2"  stroke={LIME} strokeWidth="2" strokeLinecap="round"/>
            <line x1="0" y1="9"  x2="26" y2="9"  stroke={LIME} strokeWidth="2" strokeLinecap="round"/>
            <line x1="0" y1="16" x2="26" y2="16" stroke={LIME} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position:      'absolute',
          top:           64,
          left:          0,
          right:         0,
          background:    '#0A0006',
          padding:       '22px 28px 28px',
          display:       'flex',
          flexDirection: 'column',
          gap:           22,
          borderBottom:  `2px solid ${PINK}`,
          zIndex:        99,
        }}>
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:    'Oswald, sans-serif',
                fontWeight:    600,
                fontSize:      15,
                letterSpacing: '0.2em',
                color:         'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </a>
          ))}
          <a href="#inner-circle" onClick={() => setMenuOpen(false)} style={{
            display:        'inline-flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            6,
            background:     LIME,
            color:          '#0A0006',
            fontFamily:     'Oswald, sans-serif',
            fontWeight:     700,
            fontSize:       13,
            letterSpacing:  '0.15em',
            textDecoration: 'none',
            padding:        '12px 0',
            borderRadius:   2,
          }}>
            JOIN THE CULT ↗
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop      { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
