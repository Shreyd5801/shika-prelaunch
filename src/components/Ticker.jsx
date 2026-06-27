export default function Ticker() {
  const items = Array(6).fill("INDIA'S SPICIEST BRAND");

  const doubled = [...items, ...items];

  return (
    <div style={{
      background:  '#0a0006',
      padding:     '14px 0',
      overflow:    'hidden',
      whiteSpace:  'nowrap',
      position:    'relative',
      zIndex:      10,
    }}>
      <div className="ticker-track" style={{ display: 'inline-flex' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
            <span style={{
              fontFamily:    'Oswald, sans-serif',
              fontWeight:    600,
              fontSize:      'clamp(13px,1.5vw,17px)',
              letterSpacing: '0.12em',
              color:         '#C6F000',
              padding:       '0 32px',
            }}>
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
