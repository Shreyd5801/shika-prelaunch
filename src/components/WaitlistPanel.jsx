// variant="hero"        — inline iframe sized to match Hero input row
// variant="innerCircle" — iframe sized to match Inner Circle form card
export default function WaitlistPanel({ variant = 'hero', containerStyle = {} }) {
  const src = 'https://waitlister.me/form/y8KuVot4OK3h';

  if (variant === 'hero') {
    return (
      <div style={{ width: '100%', ...containerStyle }}>
        <iframe
          src={src}
          scrolling="no"
          frameBorder="0"
          title="Join the waitlist"
          style={{
            width: '100%',
            height: '160px',
            border: 'none',
            display: 'block',
            overflow: 'hidden',
            background: 'transparent',
          }}
        />
      </div>
    );
  }

  // ── Inner Circle variant ──────────────────────────────────────────────────
  return (
    <div style={{ width: '100%', ...containerStyle }}>
      <iframe
        src={src}
        scrolling="no"
        frameBorder="0"
        title="Join the waitlist"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
        style={{
          width: '100%',
          height: '180px',
          border: 'none',
          display: 'block',
          overflow: 'hidden',
          background: 'transparent',
        }}
      />
    </div>
  );
}
