import { useState, useEffect } from 'react';

export default function TopNav() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <nav style={{
      width:          '100%',
      background:     '#000000',
      display:        'flex',
      alignItems:     'center',
      justifyContent: isMobile ? 'center' : 'flex-end',
      padding:        'clamp(16px, 2.4vh, 24px) clamp(20px, 4.4vw, 64px)',
      boxSizing:      'border-box',
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', lineHeight: 0 }}>
        <img
          src="/images/shika-logo-green.png"
          alt="SHIKA"
          style={{
            height:   'clamp(40px, 5.5vw, 79px)',
            width:    'auto',
            display:  'block',
          }}
        />
      </a>
    </nav>
  );
}
