/**
 * LightSweeps — periodic diagonal light pulses sweeping the whole hero,
 * simulating streetlight washing over the car interior.
 */
import { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

const sweepVariants = {
  hidden:  { x: '-120%', opacity: 0 },
  visible: { x: '220%',  opacity: [0, 0.18, 0.22, 0.18, 0] },
};

function Sweep({ delay, color, angle, width }) {
  return (
    <motion.div
      variants={sweepVariants}
      initial="hidden"
      animate="visible"
      transition={{
        duration:   1.4,
        delay,
        repeat:     Infinity,
        repeatDelay: 3.5 + Math.random() * 3,
        ease:       'easeInOut',
      }}
      style={{
        position:        'absolute',
        inset:           0,
        background:      `linear-gradient(${angle}deg, transparent 35%, ${color} 50%, transparent 65%)`,
        width:           width ?? '60%',
        pointerEvents:   'none',
        mixBlendMode:    'overlay',
      }}
    />
  );
}

/* Grain overlay */
function Grain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    function drawGrain() {
      const { width: w, height: h } = canvas;
      const img = ctx.createImageData(w, h);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255 * 0.06 | 0;
        data[i] = data[i+1] = data[i+2] = v;
        data[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(drawGrain);
    }

    /* only update grain every 3 frames to save GPU */
    let tick = 0;
    function loop() {
      tick++;
      if (tick % 3 === 0) drawGrain();
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={512}
      height={512}
      style={{
        position:       'absolute',
        inset:          0,
        width:          '100%',
        height:         '100%',
        opacity:        0.12,
        mixBlendMode:   'overlay',
        pointerEvents:  'none',
        imageRendering: 'pixelated',
      }}
    />
  );
}

export default function LightSweeps() {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div
      className="layer"
      style={{ pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}
    >
      <Sweep delay={0.8}  color="rgba(255,122,42,0.9)"  angle={-12} />
      <Sweep delay={4.2}  color="rgba(232,27,134,0.6)"  angle={-8}  />
      <Sweep delay={7.5}  color="rgba(255,255,255,0.7)"  angle={-15} width="40%" />
      <Sweep delay={11.0} color="rgba(255,122,42,0.8)"  angle={-10} />
      <Grain />
    </div>
  );
}
