import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { FONT, SPACE } from '../theme';
import WaitlistPanel from './WaitlistPanel';

const LIME = '#C6F000';
const RED  = '#e63211';

const FALLBACK_AVATARS = [
  'https://randomuser.me/api/portraits/women/15.jpg',
  'https://randomuser.me/api/portraits/men/38.jpg',
  'https://randomuser.me/api/portraits/women/22.jpg',
  'https://randomuser.me/api/portraits/men/58.jpg',
  'https://randomuser.me/api/portraits/women/88.jpg',
  'https://randomuser.me/api/portraits/men/48.jpg',
];

function Avatar({ src, index }) {
  return (
    <div style={{
      width:        48,
      height:       48,
      borderRadius: '50%',
      border:       '2.5px solid #CC3300',
      marginLeft:   index === 0 ? 0 : -16,
      flexShrink:   0,
      overflow:     'hidden',
      position:     'relative',
      zIndex:       6 - index,
    }}>
      <img
        src={src}
        alt=""
        style={{
          width:      '100%',
          height:     '100%',
          objectFit:  'cover',
          display:    'block',
          filter:     'blur(0.6px) brightness(0.88) saturate(0.9)',
          transform:  'scale(1.08)',
        }}
      />
    </div>
  );
}

export default function InnerCircle() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [screenW, setScreenW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const avatars = FALLBACK_AVATARS;

  useEffect(() => {
    const update = () => setScreenW(window.innerWidth);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);


  // On wide desktops the image gets cropped heavily — shift focal point up so faces stay visible
  const bgPos = screenW >= 1400 ? 'center 15%'
              : screenW >= 900  ? 'center 25%'
              : 'center 40%';

  return (
    <section id="inner-circle" style={{
      backgroundImage:    'radial-gradient(circle at 50% 50%, rgba(232,78,15,0.88) 0%, rgba(195,35,7,0.96) 100%), url(/images/691cfc3a-c8da-4ded-ae31-97ff8496e82f.png)',
      backgroundSize:     'auto, cover',
      backgroundPosition: `center, ${bgPos}`,
      backgroundColor:    '#C32307',
      minHeight:          screenW >= 900 ? 420 : undefined,
      padding:            `${SPACE.sectionY} ${SPACE.sectionX}`,
      position:           'relative',
      overflow:           'hidden',
    }}>
      <div ref={ref} style={{
        maxWidth:            1200,
        margin:              '0 auto',
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:                 'clamp(40px, 6vw, 100px)',
        alignItems:          'center',
      }}>

        {/* LEFT — heading + social proof */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ marginBottom: 'clamp(8px, 1vw, 14px)' }}>
            <div style={{
              fontFamily:    '"A Love of Thunder", sans-serif',
              fontSize:      FONT.display,
              lineHeight:    0.95,
              color:         '#fff',
              textTransform: 'uppercase',
            }}>THE</div>
            <div style={{
              fontFamily: 'Brushfire, sans-serif',
              fontSize:   FONT.display,
              lineHeight: 0.95,
              color:      LIME,
            }}>INNER CIRCLE</div>
            <div style={{
              fontFamily:    '"A Love of Thunder", sans-serif',
              fontSize:      FONT.display,
              lineHeight:    0.95,
              color:         '#fff',
              textTransform: 'uppercase',
            }}>IS FORMING</div>
          </div>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize:   'clamp(16px, 1.6vw, 24px)',
            color:      '#fff',
            margin:     '0 0 clamp(20px, 2.5vw, 32px)',
            lineHeight: 1.4,
          }}>
            Want to be the first to know?
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex' }}>
              {avatars.map((src, i) => <Avatar key={i} src={src} index={i} />)}
            </div>
            <div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize:   'clamp(12px, 1.1vw, 16px)',
                color:      '#fff',
                lineHeight: 1.35,
              }}>1000+ spice addicts</div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize:   'clamp(12px, 1.1vw, 16px)',
                color:      '#fff',
                lineHeight: 1.35,
              }}>already in.</div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <WaitlistPanel variant="innerCircle" containerStyle={{ maxWidth: '480px', margin: '0 auto' }} />
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 700px) {
          #inner-circle { padding: clamp(40px, 7vh, 56px) clamp(20px, 5vw, 32px) !important; }
          #inner-circle > div {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
