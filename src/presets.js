export function invalidatePresetCacheIfNeeded() {
  if (localStorage.getItem('presetVersion') !== PRESET_VERSION) {
    localStorage.clear();
    localStorage.setItem('presetVersion', PRESET_VERSION);
  }
}

export const PRESET_VERSION = '2';

export const DEFAULT_PRESET = {
  name: 'default',
  seed: 1234,
  stars: 30000,
  spaceColor: '#020e26',
  starColor: ['#EEEDBE', '#0388A6', '#E9F2EB'],
  density: 'inQuad',
  spread: 700,
  spreadShape: 'inCubic',
  sideShape: 'outCubic',
  heightSpread: 0.1,
  height: 25,
  cameraX: 0.5,
  cameraY: 1,
  cameraZ: 2,
  luminance: '0.1',
  animated: false,
  animSpeed: 20,
  type: 'spiral',
  layers: [
    { blur: 10, blend: 'source-over', type: 'glow' },
    { blur: 5, blend: 'screen', type: 'glow' },
    { blur: 10, blend: 'lighten', type: 'glow' },
    { blur: '3', blend: 'source-over', type: 'glow' },
    { blur: 30, blend: 'overlay', type: 'core', size: 300, color: '#c5e2e3' },
    { blur: 30, blend: 'lighter', type: 'core', size: '80', color: '#c5e2e3' },
    { type: 'glow', blend: 'color-dodge', blur: '0' },
  ],
  arms: 2,
  armsCurve: 0.275,
  watermark: true,
  version: PRESET_VERSION,
};

export const CAMERA_PRESETS = {
  topDown: {
    cameraX: 0.0,
    cameraY: 0.0,
    cameraZ: 0.0,
  },
  sideways: {
    cameraX: Math.PI / 2,
    cameraY: Math.PI / 2,
    cameraZ: 0.0,
  },
  tilted: {
    cameraX: 2.25,
    cameraY: 2.25,
    cameraZ: 0.0,
  },
  semiSideways: {
    cameraX: 2.7,
    cameraY: 1.7,
    cameraZ: 1.3,
  },
  nice: {
    cameraX: 0.5,
    cameraY: 1.0,
    cameraZ: 2.0,
  },
};

export const EFFECT_PRESETS = {
  angelic: {
    spaceColor: '#030A23',
    starColor: ['#EEEDBE', '#0388A6', '#E9F2EB'],
    luminance: 0.1,
    layers: [
      { blur: 10, blend: 'source-over', type: 'glow' },
      { blur: 5, blend: 'screen', type: 'glow' },
      { blur: 10, blend: 'lighten', type: 'glow' },
      { blur: '3', blend: 'source-over', type: 'glow' },
      { blur: 30, blend: 'overlay', type: 'core', size: 300, color: '#c5e2e3' },
      { blur: 30, blend: 'lighter', type: 'core', size: '80', color: '#c5e2e3' },
      { type: 'glow', blend: 'color-dodge', blur: '1' },
    ],
  },
  milky: {
    spaceColor: '#030207',
    starColor: ['#ddebe1', '#f9d972', '#61acf8'],
    luminance: 0.7,
    layers: [
      { blur: '50', blend: 'source-over', type: 'glow' },
      { type: 'glow', blend: 'lighter', blur: '20' },
      { blur: '120', blend: 'screen', type: 'core', size: '200', color: '#f4710d' },
      { type: 'glow', blend: 'screen', blur: '20' },
      { type: 'glow', blend: 'screen', blur: '20' },
      { type: 'glow', blend: 'lighter', blur: '1' },
    ],
  },
  sauron: {
    spaceColor: '#120926',
    starColor: ['#ff1c00', '#ffaa85', '#e1f200'],
    luminance: 0.45,
    layers: [
      { blur: '20', blend: 'source-over', type: 'glow' },
      { type: 'glow', blend: 'lighter', blur: '4' },
      { blur: '50', blend: 'overlay', type: 'core', size: '700', color: '#f55009' },
      { blur: '30', blend: 'lighter', type: 'core', size: '300', color: '#f55009' },
      { blur: '30', blend: 'color-dodge', type: 'core', size: '100', color: '#d8e300' },
      { type: 'glow', blend: 'lighter', blur: '1' },
    ],
  },
  negativeZone: {
    spaceColor: '#ffffff',
    starColor: ['#000000', '#000000', '#000000'],
    luminance: '0.7',
    layers: [
      { blur: '10', blend: 'source-over', type: 'glow' },
      { blur: '0', blend: 'multiply', type: 'glow' },
      { blur: '3', blend: 'color-burn', type: 'glow' },
      { blur: '100', blend: 'difference', type: 'core', size: '1500', color: '#000000' },
    ],
  },
  jewel: {
    spaceColor: '#1c2427',
    starColor: ['#ee8d11', '#f48823', '#4b584d', '#252327'],
    luminance: '1',
    layers: [
      { blur: '1', blend: 'source-over', type: 'glow' },
      { blur: '10', blend: 'luminosity', type: 'glow' },
      { blur: '10', blend: 'color-dodge', type: 'glow' },
      { blur: '10', blend: 'color-dodge', type: 'glow' },
      { blur: '12', blend: 'color-dodge', type: 'glow' },
      { blur: '10', blend: 'color-dodge', type: 'core', size: '100', color: '#f46400' },
    ],
  },
  occult: {
    spaceColor: '#040904',
    starColor: ['#000ceb', '#d181de', '#503c6b', '#110614'],
    luminance: '0.65',
    layers: [
      { blur: '20', blend: 'source-over', type: 'glow' },
      { blur: '2', blend: 'source-over', type: 'glow' },
      { blur: '50', blend: 'soft-light', type: 'core', size: '1000', color: '#5a0060' },
      { blur: '20', blend: 'luminosity', type: 'glow' },
      { blur: '20', blend: 'color-dodge', type: 'glow' },
      { blur: '50', blend: 'color-dodge', type: 'core', size: '500', color: '#d800da' },
    ],
  },
};
