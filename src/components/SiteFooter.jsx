const LIME  = '#C6F000';
const DARK  = '#0A0006';
const EMAIL = 'hello@slurpshika.com';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/slurpshika',  src: '/youtube-logo.svg'   },
  { label: 'Snapchat',  href: 'https://snapchat.com/add/slurpshika', src: '/youtube-logo-1.svg' },
  { label: 'YouTube',   href: 'https://youtube.com/@slurpshika',   src: '/youtube-logo-2.svg'  },
  { label: 'Email',     href: `mailto:${EMAIL}`,                   src: '/youtube-logo-3.svg'  },
];

export default function SiteFooter() {
  return (
    <footer>

      {/* ── RED FOOTER SECTION ── */}
      <section style={{
        background: 'radial-gradient(circle at 50% 50%, #E84E0F 0%, #C32307 100%)',
        padding:    'clamp(28px, 4vw, 56px) clamp(24px, 6vw, 90px)',
      }}>
        <div className="footer-grid" style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          alignItems:          'stretch',
          gap:                 'clamp(20px, 3vw, 48px)',
        }}>

          {/* ── LEFT — BRING THE HEAT ── */}
          <div className="footer-left">
            <div style={{
              fontFamily:    '"A Love of Thunder", sans-serif',
              fontSize:      'clamp(36px, 5.5vw, 88px)',
              lineHeight:    0.9,
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
              color:         '#fff',
            }}>
              BRING<br />THE
            </div>
            <div style={{
              fontFamily:    '"A Love of Thunder", sans-serif',
              fontSize:      'clamp(36px, 5.5vw, 88px)',
              lineHeight:    0.9,
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
              color:         LIME,
            }}>
              HEAT.
            </div>
          </div>

          {/* ── CENTER — CONTACT ── */}
          <div className="footer-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textAlign: 'center', gap: '24px' }}>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize:   'clamp(14px, 1.3vw, 20px)',
              color:      '#fff',
              lineHeight: 1.5,
            }}>
              Got something to say…<br />Ideas? Tea? Collab?
            </div>
            <a href={`mailto:${EMAIL}`} style={{
              background:     'rgba(80,10,0,0.55)',
              borderRadius:   999,
              padding:        'clamp(8px, 0.8vw, 12px) clamp(18px, 1.8vw, 28px)',
              textDecoration: 'none',
              fontFamily:     'Inter, sans-serif',
              fontWeight:     400,
              fontSize:       'clamp(12px, 1.1vw, 16px)',
              color:          LIME,
              whiteSpace:     'nowrap',
            }}>
              {EMAIL}
            </a>
          </div>

          {/* ── RIGHT — LOGO + SOCIALS ── */}
          <div className="footer-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '24px' }}>
            <img
              src="/images/shika-logo-green.png"
              alt="SHIKA"
              style={{ height: 'clamp(60px, 9vw, 130px)', width: 'auto', display: 'block' }}
            />
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {SOCIALS.map(({ label, href, src }) => (
                <a key={label} href={href} aria-label={label}
                  style={{ display: 'flex', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img src={src} alt={label} style={{ width: 40, height: 40, display: 'block' }} />
                </a>
              ))}
            </div>
          </div>

        </div>

        <style>{`
          @media (max-width: 700px) {
            .footer-grid { grid-template-columns: 1fr !important; text-align: center; gap: 28px !important; }
            .footer-left { text-align: center; }
            .footer-center { align-items: center !important; gap: 18px !important; }
            .footer-right { align-items: center !important; }
          }
        `}</style>
      </section>

      {/* ── DARK BOTTOM BAR ── */}
      <div style={{
        background:     DARK,
        padding:        'clamp(14px, 1.8vw, 20px) clamp(24px, 6.25vw, 90px)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexWrap:       'wrap',
        gap:            10,
      }}>
        <span style={{
          fontFamily:    'Oswald, sans-serif',
          fontSize:      'clamp(10px, 1vw, 12px)',
          letterSpacing: '0.25em',
          color:         'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
        }}>
          © 2026 SHIKA. All rights reserved.
        </span>
      </div>

    </footer>
  );
}
