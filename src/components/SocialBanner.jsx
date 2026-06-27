import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FONT, SPACE } from '../theme';

const LIME             = '#C6F000';
const BEHOLD_WIDGET_ID = 'oICjCmHFBr7UWTqu5rF5';
const IMG_SIZE         = 260;
const GAP              = 6;

function Placeholder() {
  return (
    <div style={{ display: 'flex', gap: GAP, overflow: 'hidden', width: '100%', marginTop: 'clamp(28px, 3.5vw, 48px)' }}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} style={{
          width: IMG_SIZE, height: IMG_SIZE, flexShrink: 0,
          background: 'rgba(255,255,255,0.1)', borderRadius: 2,
          animation: `ig-pulse 1.6s ease-in-out ${i * 0.12}s infinite`,
        }} />
      ))}
      <style>{`@keyframes ig-pulse{0%,100%{opacity:.2}50%{opacity:.45}}`}</style>
    </div>
  );
}

function Marquee({ posts }) {
  const [paused, setPaused] = useState(false);
  const items = [...posts, ...posts];

  return (
    <div
      style={{ overflow: 'hidden', width: '100%', marginTop: 'clamp(28px, 3.5vw, 48px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        display:            'flex',
        gap:                GAP,
        width:              'max-content',
        animation:          'ig-marquee 32s linear infinite',
        animationPlayState: paused ? 'paused' : 'running',
        willChange:         'transform',
      }}>
        {items.map((post, i) => {
          const src = post.sizes?.medium?.mediaUrl
            || post.sizes?.small?.mediaUrl
            || post.mediaUrl
            || post.thumbnailUrl;
          return (
            <a
              key={i}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flexShrink: 0, display: 'block', overflow: 'hidden', borderRadius: 2, lineHeight: 0 }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                style={{ width: IMG_SIZE, height: IMG_SIZE, objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease, opacity 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; e.currentTarget.style.opacity = '0.75'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.opacity = '1'; }}
              />
            </a>
          );
        })}
      </div>
      <style>{`
        @keyframes ig-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default function SocialBanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [posts, setPosts]   = useState([]);
  const [ready, setReady]   = useState(false);

  useEffect(() => {
    if (!BEHOLD_WIDGET_ID) return;
    fetch(`https://feeds.behold.so/${BEHOLD_WIDGET_ID}`)
      .then(r => r.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : (data?.posts ?? []);
        setPosts(arr.filter(p => p.mediaType !== 'VIDEO'));
        setReady(true);
      })
      .catch(() => setReady(true));
  }, []);

  return (
    <section ref={ref} style={{
      background:    'radial-gradient(circle at 50% 50%, #F932A5 0%, #950658 100%)',
      padding:       `40px 0 clamp(40px, 5vw, 64px)`,
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

      {/* Marquee carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.18 }}
        style={{ width: '100%' }}
      >
        {ready && posts.length > 0 ? <Marquee posts={posts} /> : <Placeholder />}
      </motion.div>

    </section>
  );
}
