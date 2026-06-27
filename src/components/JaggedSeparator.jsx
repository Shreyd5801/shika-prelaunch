/**
 * PaintStrokeSeparator
 * topColor    — section above colour (the brush stroke colour)
 * bottomColor — section below colour (fills any transparent gaps in stroke)
 * flip        — false: jagged bottom edge (default)
 *               true:  jagged top edge
 */
export default function JaggedSeparator({
  topColor    = '#0A0A0C',
  bottomColor = 'transparent',
  flip        = false,
  height      = 'clamp(36px, 4.5vw, 52px)',
}) {
  const uid = `ps${Date.now().toString(36)}${flip ? 'f' : 't'}`;

  return (
    <div style={{
      lineHeight:   0,
      position:     'relative',
      zIndex:       5,
      overflow:     'hidden',
      height,
      // Container background = section-below colour so gaps in stroke look correct
      background:   bottomColor,
    }}>
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        overflow="hidden"
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'hidden' }}
      >
        <defs>
          {/* Hard viewport clip — nothing exits the SVG box */}
          <clipPath id={`c-${uid}`}>
            <rect x="0" y="0" width="1440" height="52" />
          </clipPath>

          {/* Paint-brush turbulence filter, strictly inside SVG bounds */}
          <filter id={`f-${uid}`}
            x="0%" y="0%" width="100%" height="100%"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.28"
              numOctaves="4"
              seed={flip ? 8 : 2}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g clipPath={`url(#c-${uid})`}>
          {!flip && (
            /* Jagged BOTTOM edge — single brush rect, no flat band */
            <rect x="-5" y="-4" width="1450" height="38"
              fill={topColor} filter={`url(#f-${uid})`} />
          )}
          {flip && (
            /* Jagged TOP edge — single brush rect, no flat band */
            <rect x="-5" y="18" width="1450" height="38"
              fill={topColor} filter={`url(#f-${uid})`} />
          )}
        </g>
      </svg>
    </div>
  );
}
