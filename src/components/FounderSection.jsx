/**
 * FounderSection — first scroll section after the hero.
 * Deep purple textured background, polaroid photo of Jashika,
 * "HI, I'M JASHIKA." headline, and an in-place manifesto slide.
 *
 * Clicking "READ MY MANIFESTO" slides ONLY this section's content
 * sideways to reveal the manifesto panel (with a ← BACK button).
 * The rest of the page never moves.
 *
 * PHOTO SLOT: drop the founder photo into
 *   shika-site/public/jashika-founder.jpg
 */
import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FONT, SPACE } from '../theme';

/* ── Grain texture overlay ───────────────────────── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;

/* ── Fade-in on scroll wrapper ───────────────────── */
function ScrollReveal({ children, delay = 0, x = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 30, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Main Section ────────────────────────────────── */
const MANIFESTO_CARDS = [
  [
    "Let's get one thing straight: I can't survive without spicy food.",
    "I grew up in a household where crushed chillies were spread on toast. That sparked a lifelong obsession with heat and an appetite for taking it further.",
    "For three years, I travelled the world nonstop, immersing myself in countries and cultures that understand heat best. I tasted everything, asked questions, studied what made people sweat, cry, and still go back for more.",
    "It wasn't just a spicy holiday. I was building the point of view that would become SHIKA.",
    "SHIKA wasn't born from a trend report. It came from years of obsession, research and one very clear belief: a sleepy, predictable category needed a challenger that people couldn't ignore.",
  ],
  [
    "So I packed up my bags and moved to India, and entered an industry with zero contacts, zero experience, zero shortcuts and absolutely no intention of playing by its rules.",
    "Because if SHIKA is going to ask you to step outside your comfort zone, I have to be willing to do the same. Playing it safe was never on the menu.",
    "To the heatseekers who always want more, this one's for you.",
    "We're making India's spiciest product for the world's spiciest people.",
    "Step outside your comfort zone and embrace the heat.",
  ],
];

function MobileManifesto() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.offsetWidth));
  };

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        style={{
          display:                 'flex',
          overflowX:               'auto',
          scrollSnapType:          'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth:          'none',
          msOverflowStyle:         'none',
        }}
      >
        <style>{`.manifesto-scroll::-webkit-scrollbar{display:none}`}</style>
        {MANIFESTO_CARDS.map((paras, i) => (
          <div key={i} style={{
            flex:           '0 0 100%',
            scrollSnapAlign:'center',
            padding:        '0 4px',
            boxSizing:      'border-box',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize:   'clamp(14px, 3.8vw, 17px)',
              lineHeight: 1.75,
              color:      'rgba(255,255,255,0.85)',
            }}>
              {paras.map((p, j) => (
                <p key={j} style={{ margin: j < paras.length - 1 ? '0 0 14px' : 0 }}>{p}</p>
              ))}
            </div>
            {i === MANIFESTO_CARDS.length - 1 && (
              <div style={{
                fontFamily: 'Caveat, cursive',
                fontSize:   'clamp(16px, 4vw, 22px)',
                color:      '#E81B86',
                marginTop:  14,
                textAlign:  'right',
              }}>
                — Jashika xx
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rectangle indicators */}
      <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
        {MANIFESTO_CARDS.map((_, i) => (
          <div key={i} style={{
            width:      i === active ? 24 : 8,
            height:     4,
            borderRadius: 2,
            background: i === active ? '#C6F000' : 'rgba(255,255,255,0.35)',
            transition: 'width 0.25s ease, background 0.25s ease',
          }} />
        ))}
      </div>
    </div>
  );
}

export default function FounderSection() {
  const [showManifesto, setShowManifesto] = useState(false);

  return (
    <section
      id="founder"
      style={{
        position:  'relative',
        overflow:  'hidden',
        isolation: 'isolate',
        padding:    `${SPACE.sectionY} ${SPACE.sectionX}`,
        background: 'radial-gradient(circle at 50% 50%, #54157B 0%, #2B0047 100%)',
      }}
    >

      {/* ── SLIDING VIEWPORT (only this section's content moves) ── */}
      <div style={{ position: 'relative', zIndex: 10, overflow: 'hidden' }}>
        <div style={{
          display:    'flex',
          width:      '200%',
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          transform:  showManifesto ? 'translateX(-50%)' : 'translateX(0)',
        }}>

          {/* ════ PANEL 1 — FOUNDER ════ */}
          <div style={{ width: '50%', flexShrink: 0 }} aria-hidden={showManifesto}>
            <div style={{
              display:             'grid',
              gridTemplateColumns: 'clamp(240px,34vw,440px) 1fr',
              gap:                 'clamp(40px, 6vw, 100px)',
              alignItems:          'center',
              maxWidth:            1100,
              margin:              '0 auto',
            }}
              className="founder-grid"
            >
              {/* Mobile-only FOUNDER label — appears above photo */}
              <div className="founder-mobile-label" style={{
                display:       'none',
                alignItems:    'center',
                gap:           8,
                fontFamily:    'Brushfire, sans-serif',
                fontSize:      'clamp(22px, 6vw, 30px)',
                letterSpacing: '0.04em',
                color:         '#C6F000',
                textTransform: 'uppercase',
                width:         '100%',
                justifyContent:'center',
              }}>
                FOUNDER
                <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                  <path d="M2 7 Q10 2 26 7" stroke="#C6F000" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <path d="M20 3 L26 7 L20 11" stroke="#C6F000" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* ── POLAROID COLUMN ─────────────────── */}
              <ScrollReveal x={-30}>
                <div style={{ position: 'relative' }}>

                  {/* Tape strip top */}
                  <div style={{
                    position:  'absolute',
                    top:       -14,
                    left:      '50%',
                    transform: 'translateX(-50%) rotate(-2deg)',
                    width:     70,
                    height:    22,
                    background:'rgba(236,227,207,0.45)',
                    backdropFilter:'blur(2px)',
                    zIndex:    4,
                  }} />

                  {/* Polaroid frame */}
                  <motion.div
                    animate={{ rotate: [-2.5, -1.8, -2.8, -2.0, -2.5] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
                    style={{
                      background:  '#f5f0e8',
                      padding:     'clamp(10px,1.5vw,18px)',
                      paddingBottom:'clamp(16px,2vw,24px)',
                      boxShadow:   '0 20px 60px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.3)',
                      display:     'block',
                    }}
                  >
                    {/* Photo area */}
                    <div style={{
                      width:    '100%',
                      aspectRatio:'3/4',
                      background:'#1a0030',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <img
                        src="/jashika-autorickshaw.jpg.jpeg"
                        alt="Jashika, SHIKA founder"
                        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                        onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                      />
                      {/* placeholder */}
                      <div style={{
                        display:'none', position:'absolute', inset:0,
                        alignItems:'center', justifyContent:'center', flexDirection:'column', gap:10,
                        background:'linear-gradient(135deg,#2D0060,#1a0030)',
                      }}>
                        <div style={{ fontFamily:'Oswald,sans-serif', fontSize:10, letterSpacing:'0.3em', color:'rgba(198,240,0,0.5)' }}>
                          PHOTO SLOT
                        </div>
                        <div style={{ fontFamily:'Caveat,cursive', fontSize:14, color:'rgba(236,227,207,0.4)', textAlign:'center' }}>
                          drop jashika-founder.jpg<br/>into /public/
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>

              {/* ── TEXT COLUMN ─────────────────────── */}
              <div style={{ position:'relative', paddingLeft: 'clamp(0px, 7.8vw, 150px)' }}>
                <ScrollReveal delay={0.1}>
                  {/* FOUNDER label — desktop only */}
                  <div className="founder-desktop-label" style={{
                    display:       'flex',
                    alignItems:    'center',
                    gap:           8,
                    fontFamily:    'Brushfire, sans-serif',
                    fontSize:      FONT.display,
                    letterSpacing: '0.04em',
                    color:         '#C6F000',
                    marginBottom:  'clamp(12px, 1.5vw, 20px)',
                  }}>
                    FOUNDER
                    {/* left-pointing arrow ← */}
                    <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                      <path d="M26 7 Q18 2 2 7" stroke="#C6F000" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                      <path d="M8 3 L2 7 L8 11" stroke="#C6F000" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Main headline — A Love of Thunder */}
                  <h2 style={{
                    fontFamily:    '"A Love of Thunder", sans-serif',
                    fontSize:      FONT.display,
                    lineHeight:    0.92,
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color:         '#FFFFFF',
                    margin:        0,
                    marginBottom:  'clamp(16px, 2vw, 28px)',
                  }}>
                    HI,<br />
                    I'M JASHIKA.
                  </h2>

                  {/* Pink underline */}
                  <div style={{
                    width:        'clamp(60px, 8vw, 100px)',
                    height:       3,
                    background:   '#c60072',
                    marginBottom: 'clamp(16px, 2vw, 28px)',
                    borderRadius: 2,
                  }} />

                  {/* Body copy — single supporting line */}
                  <p style={{
                    fontFamily:   'Inter, sans-serif',
                    fontWeight:   400,
                    fontSize:     'clamp(16px, 1.6vw, 22px)',
                    lineHeight:   1.6,
                    color:        'rgba(255,255,255,0.9)',
                    margin:       0,
                    marginBottom: 'clamp(20px, 2.5vw, 36px)',
                    maxWidth:     440,
                  }}>
                    I got bored of brands that play it safe, so I'm building one that doesn't.
                  </p>

                  {/* CTA — opens the in-place manifesto slide */}
                  <motion.button
                    type="button"
                    onClick={() => setShowManifesto(true)}
                    whileHover={{ x: 6 }}
                    style={{
                      display:        'inline-flex',
                      alignItems:     'center',
                      gap:            10,
                      fontFamily:     'Brushfire, sans-serif',
                      fontSize:       'clamp(20px, 2.9vw, 42px)',
                      letterSpacing:  '0.06em',
                      color:          '#C6F000',
                      background:     'transparent',
                      border:         'none',
                      cursor:         'pointer',
                      padding:        0,
                    }}
                  >
                    READ MY MANIFESTO
                    <svg width="28" height="14" viewBox="0 0 28 14" fill="none" style={{ marginLeft: 4 }}>
                      <path d="M2 7 Q10 2 26 7" stroke="#C6F000" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                      <path d="M20 3 L26 7 L20 11" stroke="#C6F000" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* ════ PANEL 2 — MANIFESTO ════ */}
          <div style={{ width: '50%', flexShrink: 0 }} aria-hidden={!showManifesto}>
            <div style={{
              display:       'flex',
              flexDirection: 'column',
              minHeight:     '100%',
              padding:       '0 clamp(30px, 3vw, 30px)',
            }}>
              {/* ← BACK */}
              <button
                type="button"
                onClick={() => setShowManifesto(false)}
                style={{
                  alignSelf:     'flex-start',
                  display:       'inline-flex',
                  alignItems:    'center',
                  gap:           10,
                  fontFamily:    'Brushfire, sans-serif',
                  fontSize:      'clamp(20px, 2.9vw, 42px)',
                  letterSpacing: '0.06em',
                  color:         '#C6F000',
                  background:    'transparent',
                  border:        'none',
                  padding:       0,
                  cursor:        'pointer',
                  marginBottom:  'clamp(10px, 1.2vw, 16px)',
                }}
              >
                ← BACK
              </button>

              <div style={{ marginBottom: 'clamp(12px, 1.4vw, 20px)' }}>
                <h2 style={{
                  fontFamily:    '"A Love of Thunder", sans-serif',
                  fontSize:      FONT.display,
                  lineHeight:    0.95,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color:         '#FFFFFF',
                  margin:        '0 0 10px',
                }}>
                  MANIFESTO
                </h2>
                <div style={{ width: 'clamp(40px, 5vw, 72px)', height: 3, background: '#E81B86', borderRadius: 2 }} />
              </div>

              {/* Desktop: two-column layout */}
              <div className="manifesto-desktop" style={{
                fontFamily:   'Inter, sans-serif',
                fontSize:     'clamp(13px, 1.2vw, 17px)',
                lineHeight:   1.7,
                color:        'rgba(255,255,255,0.85)',
                columnCount:  2,
                columnGap:    'clamp(28px, 3.5vw, 52px)',
                columnRule:   '1px solid rgba(255,255,255,0.12)',
              }}>
                {MANIFESTO_CARDS.flat().map((p, i, arr) => (
                  <p key={i} style={{ margin: i < arr.length - 1 ? '0 0 clamp(10px, 1.2vw, 16px)' : 0 }}>{p}</p>
                ))}
              </div>

              <div className="manifesto-desktop" style={{
                fontFamily: 'Caveat, cursive',
                fontSize:   'clamp(16px, 1.6vw, 24px)',
                color:      '#E81B86',
                marginTop:  'clamp(14px, 1.8vw, 24px)',
                textAlign:  'right',
              }}>
                — Jashika xx
              </div>

              {/* Mobile: 2-card snap scroll */}
              <div className="manifesto-mobile">
                <MobileManifesto />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── MOBILE STACK ── */}
      <style>{`
        @media (max-width: 720px) {
          .founder-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            justify-items: center;
          }
          .founder-mobile-label {
            display: flex !important;
            order: 1;
            width: 100%;
            justify-content: center;
          }
          .founder-grid > div:nth-child(2) {
            order: 2;
            max-width: 300px;
            width: 100%;
          }
          .founder-grid > div:nth-child(3) {
            order: 3;
          }
          .founder-desktop-label {
            display: none !important;
          }
        }
        @media (min-width: 721px) {
          .founder-mobile-label { display: none !important; }
          .manifesto-mobile { display: none !important; }
        }
        @media (max-width: 720px) {
          .manifesto-desktop { display: none !important; }
          .manifesto-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
