/**
 * Newspaper — the primary brand surface.
 * All text is live DOM so it's fully SEO-indexable and accessible.
 * Positioned as the foreground element "closest to the camera."
 */
import { motion, useReducedMotion } from 'framer-motion';

/* Word-by-word reveal for the big headline */
function RevealWords({ text, className, delay = 0 }) {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, y: 0,  clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.4, delay: delay + i * 0.1, ease: [0.22,1,0.36,1] }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

export default function Newspaper({ style, motionStyle, scrollProgress }) {
  const reduced = useReducedMotion();

  /* paper sway — faint perpetual rock */
  const swayAnim = reduced ? {} : {
    animate: {
      rotate: [-0.4, 0.4, -0.2, 0.3, -0.4],
      y:      [0, -2, 1, -1, 0],
    },
    transition: {
      duration:   6,
      repeat:     Infinity,
      ease:       'easeInOut',
      repeatType: 'mirror',
    },
  };

  return (
    <motion.div
      style={{
        position:  'absolute',
        right:     'clamp(24px, 6vw, 100px)',
        top:       '50%',
        transform: 'translateY(-50%)',
        width:     'clamp(240px, 26vw, 380px)',
        zIndex:    40,
        /* CSS keyframe fade-in — avoids Framer Motion animate conflict */
        animation: reduced ? 'none' : 'npReveal 1s ease 1.2s both',
        ...motionStyle,
      }}
    >

    {/* Sway wrapper */}
    <motion.div
      className="newspaper"
      style={{ borderRadius: 2, transformOrigin: 'bottom center' }}
      animate={reduced ? {} : {
        rotate: [-3.5, -3.9, -3.1, -3.6, -3.5],
        y:      [0,    -2,    1,    -1,    0],
      }}
      transition={{
        duration:    6,
        repeat:      Infinity,
        ease:        'easeInOut',
        repeatType:  'mirror',
      }}
    >
      {/* ── MASTHEAD ─────────────────────────── */}
      <div style={{
        background:   '#1a1208',
        color:        '#ECE3CF',
        padding:      '10px 14px 8px',
        textAlign:    'center',
        borderBottom: '2px solid #2a1f10',
      }}>
        <div style={{
          fontFamily:  'Oswald, sans-serif',
          fontSize:    'clamp(8px,1vw,11px)',
          letterSpacing: '0.35em',
          color:       'rgba(236,227,207,0.55)',
          marginBottom: 2,
        }}>
          VOL.001 &nbsp;·&nbsp; EDITION ZERO &nbsp;·&nbsp; PRE-LAUNCH
        </div>
        <div style={{
          fontFamily:  'Anton, sans-serif',
          fontSize:    'clamp(28px,4.5vw,52px)',
          letterSpacing: '0.06em',
          lineHeight:  1,
        }}>
          SPICY NEWS
        </div>
        <div style={{
          height:      2,
          background:  '#D81E2C',
          margin:      '6px 0 4px',
        }} />
        <div style={{
          fontFamily:  'Spectral, Georgia, serif',
          fontStyle:   'italic',
          fontSize:    'clamp(7px,0.85vw,10px)',
          color:       'rgba(236,227,207,0.45)',
        }}>
          "For people who order the spiciest thing on the menu"
        </div>
      </div>

      {/* ── BODY ─────────────────────────────── */}
      <div style={{ padding: 'clamp(10px,1.5vw,18px)', background: '#ECE3CF' }}>

        {/* Main headline */}
        <div style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontWeight:  900,
          fontSize:   'clamp(18px,2.8vw,34px)',
          lineHeight:  1.05,
          color:       '#1a1208',
          marginBottom: 6,
        }}>
          MILD IS CANCELLED.
        </div>
        <div style={{
          fontFamily: 'Anton, sans-serif',
          fontSize:   'clamp(22px,3.2vw,40px)',
          lineHeight:  1,
          color:       '#E81B86',
          marginBottom: 10,
          letterSpacing: '0.02em',
        }}>
          SHIKA IS COMING.
        </div>

        {/* Rule */}
        <div style={{ height:1, background:'#2a1f10', opacity:0.25, margin:'8px 0' }} />

        {/* Sub-deck */}
        <div style={{
          fontFamily:   'Spectral, serif',
          fontSize:     'clamp(9px,1vw,12px)',
          lineHeight:    1.55,
          color:         '#2a1f10',
          marginBottom:  10,
        }}>
          The new standard of heat. India's first cult snack brand built for those who refuse to settle for anything less than the maximum.
        </div>

        {/* Columns */}
        <div style={{
          display:        'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:             '0 10px',
          borderTop:      '2px double #2a1f10',
          borderBottom:   '2px double #2a1f10',
          padding:        '8px 0',
          marginBottom:    10,
        }}>
          {[
            { head: 'NO BLAND PEOPLE.', body: 'If you can\'t handle heat, you\'re in the wrong snack aisle.' },
            { head: 'EVERY. SINGLE. TIME.', body: 'Not occasionally spicy. Not kind-of spicy. Always.' },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily:'Oswald,sans-serif', fontWeight:600, fontSize:'clamp(8px,0.9vw,11px)', letterSpacing:'0.08em', marginBottom:3, color:'#1a1208' }}>
                {col.head}
              </div>
              <div style={{ fontFamily:'Spectral,serif', fontSize:'clamp(7px,0.75vw,9px)', lineHeight:1.5, color:'#3a2a18' }}>
                {col.body}
              </div>
            </div>
          ))}
        </div>

        {/* TOO HOT stamp + chili */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
          <div style={{
            border:      '2px solid #D81E2C',
            color:       '#D81E2C',
            fontFamily:  'Anton, sans-serif',
            fontSize:    'clamp(7px,0.85vw,10px)',
            padding:     '4px 8px',
            letterSpacing: '0.1em',
            lineHeight:   1.2,
            textAlign:   'center',
            transform:   'rotate(-4deg)',
          }}>
            TOO HOT<br/>TO HANDLE
          </div>

          {/* Chili SVG motif */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <ellipse cx="18" cy="22" rx="7" ry="10" fill="#D81E2C" />
            <path d="M18 12 C18 8 22 4 26 6" stroke="#C6F000" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <ellipse cx="18" cy="22" rx="3" ry="5" fill="#E81B86" opacity="0.5"/>
          </svg>

          {/* Handwritten margin scrawl */}
          <div style={{
            fontFamily: 'Caveat, cursive',
            fontSize:   'clamp(11px,1.3vw,15px)',
            color:      '#8B3A3A',
            transform:  'rotate(3deg)',
            lineHeight:  1.2,
          }}>
            spice cult<br/>members only
          </div>
        </div>

        {/* CTA inside newspaper */}
        <motion.button
          whileHover={{ scale: 1.03, backgroundColor: '#c50f74' }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop:    12,
            width:        '100%',
            background:   '#E81B86',
            border:       'none',
            color:        '#ECE3CF',
            fontFamily:   'Anton, sans-serif',
            fontSize:     'clamp(13px,1.4vw,17px)',
            letterSpacing: '0.12em',
            padding:      '10px 0',
            cursor:       'pointer',
            borderRadius:  1,
          }}
        >
          JOIN THE CULT ↗
        </motion.button>
      </div>
    </motion.div>
    </motion.div>
  );
}
