import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FONT } from '../theme';
import WaitlistPanel from './WaitlistPanel';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      style={{
        position:      'relative',
        width:         '100%',
        minHeight:     isMobile ? '100svh' : undefined,
        overflow:      'hidden',
        background:    '#0a0006',
        boxSizing:     'border-box',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'flex-start',
        justifyContent:'flex-start',
        paddingTop:    isMobile ? '74px' : 'clamp(28px, 4.5vh, 56px)',
        paddingBottom: '40px',
        paddingLeft:   isMobile ? '20px' : 'clamp(20px, 6.25vw, 90px)',
        paddingRight:  isMobile ? '20px' : 'clamp(20px, 4vw, 60px)',
      }}
    >
      {/* ── BACKGROUND PHOTO ── */}
      {isMobile ? (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img
            src="/images/hero-bg.jpg"
            alt=""
            style={{ position: 'absolute', height: '100%', width: '333%', left: '-130%', top: 0, maxWidth: 'none' }}
          />
        </div>
      ) : (
        <img
          src="/images/hero-bg.jpg"
          alt=""
          style={{
            position:       'absolute',
            inset:          0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'top center',
            pointerEvents:  'none',
          }}
        />
      )}

      {/* ── GRADIENT ── */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: isMobile
          ? 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0) 100%)'
          : 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.3) 52%, rgba(0,0,0,0) 70%)',
        zIndex:     2,
        pointerEvents: 'none',
      }} />
      {!isMobile && (
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 35%)',
          zIndex:     3,
          pointerEvents: 'none',
        }} />
      )}

      {/* ── MAIN CONTENT BLOCK ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:      'relative',
          width:         isMobile ? '289px' : 'clamp(300px, 56vw, 820px)',
          maxWidth:      '100%',
          zIndex:        10,
          display:       'flex',
          flexDirection: 'column',
          gap:           isMobile ? '26px' : 'clamp(20px, 3.9vw, 56px)',
        }}
      >
        {/* ── HEADING + EVERY SINGLE TIME ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '13px' : 'clamp(12px, 1.94vw, 28px)' }}>
          <h1 style={{
            fontFamily:    '"A Love of Thunder", sans-serif',
            fontSize:      isMobile ? '40px' : FONT.display,
            lineHeight:    1.0,
            color:         '#FFFFFF',
            margin:        0,
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
          }}>
            FOR THE PEOPLE<br />
            WHO ORDER<br />
            THE{' '}
            <span style={{
              fontFamily: 'Brushfire, sans-serif',
              color:      '#C6F000',
              fontSize:   isMobile ? '48px' : 'clamp(44px, 6.1vw, 88px)',
              lineHeight: 1,
            }}>SPICIEST</span>
            {' '}THING<br />
            ON THE MENU.
          </h1>

          <div style={{
            fontFamily: 'Brushfire, sans-serif',
            fontSize:   isMobile ? '40px' : FONT.display,
            lineHeight: '0.92',
            color:      '#C6F000',
          }}>
            <p style={{ margin: 0 }}>Every</p>
            <p style={{ margin: 0 }}>Single</p>
            <p style={{ margin: 0 }}>Time.</p>
          </div>
        </div>

        {/* ── FORM + ARROWS + ANNOTATION ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' }}>

          {/* "JOIN THE HEATWAVE" with white arrow */}
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <p style={{
              fontFamily:    '"A Love of Thunder", sans-serif',
              fontSize:      isMobile ? 'clamp(16px, 4.5vw, 22px)' : 'clamp(20px, 2.9vw, 42px)',
              lineHeight:    1,
              color:         '#FFFFFF',
              margin:        0,
              textTransform: 'uppercase',
            }}>
              Join the heatwave
            </p>
            <img
              src="/images/white-arrow.png"
              alt=""
              style={{
                width:         'clamp(20px, 2.7vw, 39px)',
                height:        'auto',
                marginLeft:    'clamp(6px, 0.8vw, 12px)',
                marginTop:     'clamp(2px, 0.4vw, 6px)',
                pointerEvents: 'none',
                flexShrink:    0,
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? '0' : '8px', flexWrap: 'nowrap', width: '100%' }}>
            <div style={{ flex: '0 0 auto', width: isMobile ? '180px' : 'clamp(260px, 32vw, 400px)' }}>
              <WaitlistPanel variant="hero" />
            </div>
            <img
              src="/images/pink-arrow.png"
              alt=""
              style={isMobile ? {
                width:        '126px',
                height:       'auto',
                flexShrink:   0,
                pointerEvents:'none',
                transform:    'rotate(-8deg)',
                alignSelf:    'flex-end',
                marginLeft:   '-45px',
                marginRight:  '-35px',
                marginBottom: '6px',
                opacity:      0.95,
                position:     'relative',
                zIndex:       2,
              } : {
                width:        'clamp(115px, 14.4vw, 202px)',
                height:       'auto',
                flexShrink:   0,
                pointerEvents:'none',
                mixBlendMode: 'multiply',
                transform:    'translateX(-45px) translateY(48px)',
                marginLeft:   '-10px',
                marginRight:  '-29px',
              }}
            />
            <div style={{ fontFamily: 'Brushfire, sans-serif', fontSize: isMobile ? '20px' : 'clamp(20px, 2.1vw, 30px)', lineHeight: 1.3, color: '#a1ff17', letterSpacing: '0.01em', flexShrink: 0 }}>
              <div>HOT PRIZES</div>
              <div>SECRET DROPS</div>
              <div>FIRST ACCESS</div>
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
