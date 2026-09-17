
// Two palettes, same accent brand — background, surface, text, and border
// tokens flip between modes; accent colors stay constant.
 
export const darkThemeColors = {
  ink: '#FFFFFF',
  inkDim: '#94A3B8',
  paper: '#0A0C18',
  paperRaised: '#151428',
  line: 'rgba(255, 255, 255, 0.08)',
  lineStrong: 'rgba(255, 255, 255, 0.16)',
 
  clay: '#D4AF37',
  clayBright: '#E5C866',
  coral: '#FF5964',
  emerald: '#10B981',
  cyan: '#00E5FF',
 
  foil1: '#FF5964',
  foil2: '#00E5FF',
  foil3: '#D4AF37',
};
 
export const lightThemeColors = {
  ink: '#14131F',
  inkDim: '#6B7280',
  paper: '#F7F6F2',
  paperRaised: '#FFFFFF',
  line: 'rgba(20, 19, 31, 0.10)',
  lineStrong: 'rgba(20, 19, 31, 0.18)',
 
  clay: '#D4AF37',        // primary accent
  clayBright: '#E5C866',  // pressed/hover state of primary
  coral: '#C5A028',       // secondary accent
  emerald: '#10B981',
  cyan: '#00E5FF',
 
  foil1: '#C5A028',
  foil2: '#00E5FF',
  foil3: '#D4AF37',
};
 
// Overlay tint used behind the glass tab bar blur.
export const glassOverlay = {
  dark: 'rgba(21, 20, 40, 0.45)',
  light: 'rgba(255, 255, 255, 0.45)',
};
