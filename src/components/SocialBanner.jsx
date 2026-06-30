import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FONT, SPACE } from '../theme';

const LIME = '#C6F000';

export default function SocialBanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} style={{
      background:    'radial-gradient(circle at 50% 50%, #F932A5 0%, #950658 100%)',
      padding:       `clamp(40px, 5vw, 64px) 0`,
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'center',
      textAlign:     'center',
      position:      'relative',
      overflow:      'hidden',
    }}>

      {/* FOLLOW THE FIRE */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        style={{
          fontFamily:    'Brushfire, sans-serif',
          fontSize:      FONT.display,
          letterSpacing: '0.06em',
          color:         LIME,
          textTransform: 'uppercase',
          marginBottom:  'clamp(10px, 1.4vw, 16px)',
          lineHeight:    1,
          paddingLeft:   SPACE.sectionX,
          paddingRight:  SPACE.sectionX,
        }}
      >
        FOLLOW THE FIRE
      </motion.div>

      {/* @SLURPSHIKA */}
      <motion.a
        href="https://instagram.com/slurpshika"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily:     '"A Love of Thunder", sans-serif',
          fontSize:       FONT.display,
          lineHeight:     0.95,
          color:          '#fff',
          textTransform:  'uppercase',
          letterSpacing:  '0.01em',
          margin:         0,
          textDecoration: 'none',
          display:        'inline-block',
          paddingLeft:    SPACE.sectionX,
          paddingRight:   SPACE.sectionX,
        }}
        whileHover={{ scale: 1.03 }}
      >
        @SLURPSHIKA
      </motion.a>

    </section>
  );
}
