import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const LIME = '#C6F000';
const DARK = '#0a0006';

function SuccessPopup({ isMobile, onClose }) {
  const content = (
    <>
      <div style={{ fontSize: isMobile ? '44px' : '56px', marginBottom: '14px' }}>🔥</div>
      <h2 style={{
        fontFamily: '"A Love of Thunder", sans-serif',
        fontSize: isMobile ? '38px' : '52px',
        color: '#fff',
        margin: '0 0 8px',
        textTransform: 'uppercase',
        lineHeight: 1,
      }}>YOU'RE IN!</h2>
      <p style={{
        fontFamily: 'Brushfire, sans-serif',
        fontSize: isMobile ? '20px' : '24px',
        color: LIME,
        margin: '0 0 16px',
      }}>THE INNER CIRCLE IS FORMING</p>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: isMobile ? '14px' : '15px',
        color: 'rgba(255,255,255,0.7)',
        margin: `0 0 ${isMobile ? '28px' : '36px'}`,
        lineHeight: 1.55,
      }}>
        We'll hit you up when the heat drops.<br />Keep your eyes on your inbox.
      </p>
      <button
        onClick={onClose}
        style={{
          background: LIME, color: '#111', border: 'none',
          borderRadius: '6px', padding: isMobile ? '13px 36px' : '14px 44px',
          fontSize: '15px', fontWeight: 700, fontFamily: 'Inter, sans-serif',
          cursor: 'pointer', letterSpacing: '0.02em',
        }}
      >
        GOT IT 🌶️
      </button>
    </>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9998 }}
      />
      {isMobile ? (
        <motion.div
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            background: DARK, borderRadius: '20px 20px 0 0',
            padding: '28px 24px 52px', zIndex: 9999, textAlign: 'center',
            border: '1px solid rgba(198,240,0,0.15)', borderBottom: 'none',
          }}
        >
          <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: 2, margin: '0 auto 28px' }} />
          {content}
        </motion.div>
      ) : (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            style={{
              background: DARK, borderRadius: '16px', padding: '52px 56px 48px',
              textAlign: 'center', maxWidth: '480px', width: 'calc(100vw - 48px)',
              border: '1px solid rgba(198,240,0,0.2)', position: 'relative', pointerEvents: 'auto',
            }}
          >
            <button
              onClick={onClose}
              style={{ position: 'absolute', top: '14px', right: '18px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '26px', cursor: 'pointer', lineHeight: 1, padding: '4px' }}
            >×</button>
            {content}
          </motion.div>
        </div>
      )}
    </>
  );
}

export default function WaitlistIframe({ iframeStyle = {} }) {
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.origin === 'https://waitlister.me') {
        setSuccess(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <iframe
        src="https://waitlister.me/form/y8KuVot4OK3h"
        scrolling="no"
        frameBorder="0"
        title="Join the waitlist"
        sandbox="allow-forms allow-scripts allow-same-origin"
        style={{ border: 'none', overflow: 'hidden', background: 'transparent', display: 'block', ...iframeStyle }}
      />

      {createPortal(
        <AnimatePresence>
          {success && <SuccessPopup key="success" isMobile={isMobile} onClose={() => setSuccess(false)} />}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
