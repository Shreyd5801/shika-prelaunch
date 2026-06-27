/**
 * Shared design tokens — one source of truth for type + spacing.
 * Every section imports from here so headings, body text and section
 * padding stay consistent and in proportion across the whole page.
 */

export const FONT = {
  // Primary section headings (A Love of Thunder). All caps at 64px.
  display: 'clamp(36px, 4.4vw, 64px)',
  // Brushfire highlight words. Larger px so the brush script's lower
  // cap-height visually MATCHES the display text height beside it.
  accent:  'clamp(44px, 5.5vw, 80px)',
  // Sub-heads, card titles, eyebrow labels (FOUNDER, WHAT WE STAND FOR…)
  title:   'clamp(22px, 2.4vw, 32px)',
  // Lead / intro copy and inputs
  bodyLg:  'clamp(17px, 1.5vw, 22px)',
  // Standard body
  body:    'clamp(14px, 1.1vw, 17px)',
  // Small labels
  label:   'clamp(12px, 1vw, 14px)',
  // Fine print
  caption: '11px',
};

export const SPACE = {
  // Equal top/bottom for every non-home section (compact)
  sectionY: '65px',
  sectionX: 'clamp(24px, 6vw, 90px)',
  blockGap: 'clamp(32px, 4vw, 56px)',
  gap:      '24px',
  gapSm:    '12px',
};

export const COLOR = {
  lime:    '#C6F000',
  limeAlt: '#a1ff17',
  pink:    '#E81B86',
  dark:    '#0a0006',
  white:   '#FFFFFF',
};
