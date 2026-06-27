import { useCallback, useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Returns mouse-driven parallax motion values for N depth layers.
 * depth 0 = deepest/most movement, depth 1 = closest/least movement.
 */
export function useMouseParallax() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg = { stiffness: 60, damping: 22, mass: 0.8 };
  const smoothX = useSpring(rawX, springCfg);
  const smoothY = useSpring(rawY, springCfg);

  /* Pre-built transforms per depth label */
  const cityX      = useTransform(smoothX, [-0.5, 0.5], [-48, 48]);
  const cityY      = useTransform(smoothY, [-0.5, 0.5], [-24, 24]);
  const founderX   = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const founderY   = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const newspaperX = useTransform(smoothX, [-0.5, 0.5], [-8,  8]);
  const newspaperY = useTransform(smoothY, [-0.5, 0.5], [-5,  5]);
  const frameX     = useTransform(smoothX, [-0.5, 0.5], [-4,  4]);
  const frameY     = useTransform(smoothY, [-0.5, 0.5], [-2,  2]);

  const onMouseMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left)  / r.width  - 0.5);
    rawY.set((e.clientY - r.top)   / r.height - 0.5);
  }, [rawX, rawY]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return {
    onMouseMove,
    onMouseLeave,
    city:      { x: cityX,      y: cityY },
    founder:   { x: founderX,   y: founderY },
    newspaper: { x: newspaperX, y: newspaperY },
    frame:     { x: frameX,     y: frameY },
  };
}
