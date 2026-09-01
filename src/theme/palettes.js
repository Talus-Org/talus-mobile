// Two palettes, same accent brand (gold/coral/emerald/cyan stay constant —
// only background, surface, text, and border tokens flip between modes).

export const darkThemeColors = {
  ink: '#FFFFFF',           // primary text (was near-black on the old light theme)
  inkDim: '#94A3B8',        // secondary text / metadata
  paper: '#0B132B',         // main background (deep navy / midnight blue)
  paperRaised: '#132247',   // card & surface background (dark slate blue)
  line: 'rgba(255, 255, 255, 0.08)',
  lineStrong: 'rgba(255, 255, 255, 0.16)',
 
  clay: '#F4C430',          // primary accent — buttons, active states, CTAs (was terracotta)
  clayBright: '#FFD166',    // pressed/hover state, lighter gold
 
  coral: '#FF5964',         // secondary accent — badges, tags, highlights
  cyan: '#00E5FF',          // data/status accent — positive indicators, trend tags
  emerald: '#10B981',       // data/status accent — success states, card status badges
 
  // Kept for anything still referencing the old "foil" gradient names
  // (e.g. binder card accents) — now mapped to the new accent trio.
  foil1: '#FF5964',
  foil2: '#00E5FF',
  foil3: '#F4C430',
};


export const lightThemeColors = {
  ink: '#14131F',
  inkDim: '#6B7280',
  paper: '#F7F6F2',
  paperRaised: '#FFFFFF',
  line: 'rgba(20, 19, 31, 0.10)',
  lineStrong: 'rgba(20, 19, 31, 0.18)',

  clay: '#F4C430',
  clayBright: '#FFD166',
  coral: '#FF5964',
  emerald: '#10B981',
  cyan: '#00E5FF',

  foil1: '#FF5964',
  foil2: '#00E5FF',
  foil3: '#F4C430',
};

// Overlay tint used behind the glass tab bar blur — approximate paperRaised
// at low opacity for each mode (rgba doesn't derive cleanly from hex, so
// these are set explicitly per mode).
export const glassOverlay = {
  dark: 'rgba(21, 20, 40, 0.45)',
  light: 'rgba(255, 255, 255, 0.45)',
};
