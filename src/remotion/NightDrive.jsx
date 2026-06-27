import { useCurrentFrame, useVideoConfig } from 'remotion';
import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────
   Deterministic pseudo-random (seed-based, no Math.random)
───────────────────────────────────────────────────────── */
function mulberry32(seed) {
  let s = seed >>> 0;
  return () => {
    s += 0x6D2B79F5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ─────────────────────────────────────────────────────────
   Scene data: generated once at module load (seed-stable)
───────────────────────────────────────────────────────── */
const rand = mulberry32(0xDEADBEEF);

const STRIP_W = 4800; // width of one seamless city strip

const buildings = Array.from({ length: 90 }, (_, i) => {
  const layer = Math.floor(rand() * 3);           // 0 far, 1 mid, 2 near
  const speeds  = [0.28, 0.62, 1.4];
  const heights = [[50,110], [90,180], [150,290]];
  const widths  = [[40,80],  [70,130], [110,220]];
  const [hMin, hMax] = heights[layer];
  const [wMin, wMax] = widths[layer];
  return {
    id:    i,
    layer,
    speed: speeds[layer],
    h:     hMin + rand() * (hMax - hMin),
    w:     wMin + rand() * (wMax - wMin),
    seedX: rand() * STRIP_W,
    color: [`#0c0c1e`,`#080817`,`#05050f`][layer],
    hasSign: layer > 0 && rand() > 0.62,
    signText: ['SPICY','BAR','24H','HOT','CULT','OPEN','DESI'][Math.floor(rand()*7)],
    signCol:  rand() > 0.5 ? '#E81B86' : '#C6F000',
    winDensity: 0.45 + rand() * 0.3,
    winSeed: Math.floor(rand() * 99999),
  };
});

const orbs = Array.from({ length: 30 }, (_, i) => ({
  id:     i,
  seedX:  rand() * STRIP_W,
  y:      0.05 + rand() * 0.55,
  r:      40 + rand() * 120,
  col:    ['#E81B86','#9900DD','#FF2299','#CC00FF'][Math.floor(rand()*4)],
  a:      0.06 + rand() * 0.12,
  speed:  0.15 + rand() * 0.5,
  pulse:  rand() * Math.PI * 2,
  pSpeed: 0.015 + rand() * 0.03,
}));

const rainDrops = Array.from({ length: 120 }, (_, i) => ({
  x:     rand(),
  y:     rand(),
  len:   0.02 + rand() * 0.06,
  speed: 0.004 + rand() * 0.008,
  a:     0.15 + rand() * 0.35,
  drift: (rand() - 0.5) * 0.002,
}));

/* ─────────────────────────────────────────────────────────
   Draw helpers
───────────────────────────────────────────────────────── */
function drawSky(ctx, W, H) {
  const grd = ctx.createRadialGradient(W*0.6, H*0.25, 0, W*0.5, H*0.4, W*0.9);
  grd.addColorStop(0,    '#180030');
  grd.addColorStop(0.4,  '#0a0020');
  grd.addColorStop(1,    '#030308');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);
}

function drawOrbs(ctx, W, H, scroll, frame) {
  for (const o of orbs) {
    const x = ((o.seedX - scroll * o.speed + STRIP_W * 4) % STRIP_W) / STRIP_W * W;
    const y = o.y * H;
    const pulse = o.pulse + frame * o.pSpeed;
    const alpha = o.a * (0.55 + 0.45 * Math.sin(pulse));
    const grd = ctx.createRadialGradient(x, y, 0, x, y, o.r);
    const h2  = v => Math.round(v * 255).toString(16).padStart(2,'0');
    grd.addColorStop(0,    o.col + h2(alpha));
    grd.addColorStop(0.5,  o.col + h2(alpha * 0.35));
    grd.addColorStop(1,    o.col + '00');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, o.r, 0, Math.PI*2);
    ctx.fill();
  }
}

function drawBuildings(ctx, W, H, scroll, frame) {
  const groundY = H * 0.72;
  const rng = mulberry32(0xCAFEBABE);

  for (const b of buildings) {
    const bx = ((b.seedX - scroll * b.speed + STRIP_W * 4) % STRIP_W) / STRIP_W * W;
    if (bx > W + b.w || bx < -b.w) continue;

    const by = groundY - b.h;
    ctx.fillStyle = b.color;
    ctx.fillRect(bx, by, b.w, b.h);

    /* windows */
    const cols = Math.max(1, Math.round(b.w / (b.layer === 0 ? 9 : b.layer === 1 ? 13 : 18)));
    const rows = Math.max(1, Math.round(b.h / (b.layer === 0 ? 11 : b.layer === 1 ? 15 : 20)));
    const ww = b.w / cols;
    const wh = b.h / rows;
    const wr = mulberry32(b.winSeed);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (wr() < b.winDensity) continue;
        const lit = wr() > 0.3;
        if (!lit) continue;
        const flicker = wr() > 0.9 ? 0.4 + 0.6*(0.5 + 0.5*Math.sin(frame*0.06 + c*1.3 + r*2.1)) : 0.85;
        const warm = wr() > 0.45;
        ctx.fillStyle = warm
          ? `rgba(255,185,70,${(flicker*0.9).toFixed(2)})`
          : `rgba(130,175,255,${(flicker*0.7).toFixed(2)})`;
        ctx.fillRect(bx + c*ww + ww*0.2, by + r*wh + wh*0.2, ww*0.6, wh*0.6);
      }
    }

    /* neon sign */
    if (b.hasSign) {
      const flicker = 0.7 + 0.3*Math.sin(frame*0.022 + b.seedX*0.003);
      ctx.save();
      ctx.globalAlpha = flicker;
      ctx.shadowBlur  = 18;
      ctx.shadowColor = b.signCol;
      ctx.fillStyle   = b.signCol;
      ctx.font = `bold ${Math.max(8, b.w * 0.17)}px 'Anton', monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(b.signText, bx + b.w/2, by + b.h*0.22);
      ctx.restore();
    }
  }
}

function drawGround(ctx, W, H) {
  const gy = H * 0.72;
  const g1 = ctx.createLinearGradient(0, gy, 0, H);
  g1.addColorStop(0,   '#06060e');
  g1.addColorStop(1,   '#020204');
  ctx.fillStyle = g1;
  ctx.fillRect(0, gy, W, H - gy);

  /* horizon pink glow */
  const g2 = ctx.createLinearGradient(0, gy-30, 0, gy+60);
  g2.addColorStop(0,   'rgba(232,27,134,0)');
  g2.addColorStop(0.5, 'rgba(232,27,134,0.1)');
  g2.addColorStop(1,   'rgba(232,27,134,0)');
  ctx.fillStyle = g2;
  ctx.fillRect(0, gy-30, W, 90);
}

function drawRain(ctx, W, H, frame) {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  for (const d of rainDrops) {
    const y  = ((d.y + frame * d.speed) % 1) * H;
    const x  = d.x * W + frame * d.drift * W;
    ctx.strokeStyle = `rgba(200,220,255,${d.a})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + d.drift * 15 * W, y + d.len * H);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLightStreaks(ctx, W, H, frame) {
  const streakRand = mulberry32(0xABCD1234);
  const streaks = Array.from({ length: 18 }, () => ({
    seedX: streakRand() * STRIP_W,
    y:     0.68 + streakRand() * 0.1,
    len:   0.06 + streakRand() * 0.25,
    speed: 4 + streakRand() * 10,
    a:     0.12 + streakRand() * 0.35,
    col:   ['#FF7A2A','#fff','#E81B86','#C6F000'][Math.floor(streakRand()*4)],
    h:     1 + streakRand() * 2,
  }));

  for (const s of streaks) {
    const scrolled = (s.seedX + frame * s.speed) % STRIP_W;
    const sx = (scrolled / STRIP_W) * W;
    const sy = s.y * H;
    const lenPx = s.len * W;
    const grd = ctx.createLinearGradient(sx - lenPx, sy, sx, sy);
    const h2 = v => Math.round(v*255).toString(16).padStart(2,'0');
    grd.addColorStop(0,    s.col + '00');
    grd.addColorStop(0.7,  s.col + h2(s.a));
    grd.addColorStop(1,    s.col + h2(s.a*0.5));
    ctx.strokeStyle = grd;
    ctx.lineWidth   = s.h;
    ctx.beginPath();
    ctx.moveTo(sx - lenPx, sy);
    ctx.lineTo(sx, sy);
    ctx.stroke();
  }
}

/* ─────────────────────────────────────────────────────────
   Remotion composition component
───────────────────────────────────────────────────────── */
export const NightDrive = () => {
  const frame = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const canvasRef = useRef(null);

  /* scroll offset: advances continuously across the loop */
  const scroll = (frame / 300) * STRIP_W;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    drawSky(ctx, W, H);
    drawOrbs(ctx, W, H, scroll, frame);
    drawBuildings(ctx, W, H, scroll, frame);
    drawGround(ctx, W, H);
    drawLightStreaks(ctx, W, H, frame);
    drawRain(ctx, W, H, frame);

    /* vignette car frame */
    const vig = ctx.createRadialGradient(W/2, H/2, W*0.3, W/2, H/2, W*0.75);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.65)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

  }, [frame, W, H, scroll]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
};
