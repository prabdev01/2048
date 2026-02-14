/**
 * Color Schemes for Different Themes
 * Each theme defines colors for tiles, background, and UI elements
 */

export interface TileColors {
  2: string;
  4: string;
  8: string;
  16: string;
  32: string;
  64: string;
  128: string;
  256: string;
  512: string;
  1024: string;
  2048: string;
  4096: string;
  8192: string;
  [key: number]: string;
}

export interface ThemeColors {
  id: string;
  name: string;
  background: string;
  gridBackground: string;
  cellBackground: string;
  scoreBackground: string;
  buttonBackground: string;
  buttonText: string;
  text: string;
  tileText: string;
  tileTextDark: string;
  tiles: TileColors;
}

// Classic Theme (Original 2048 colors)
export const ClassicTheme: ThemeColors = {
  id: 'classic',
  name: 'Classic',
  background: '#faf8ef',
  gridBackground: '#bbada0',
  cellBackground: '#cdc1b4',
  scoreBackground: '#bbada0',
  buttonBackground: '#8f7a66',
  buttonText: '#f9f6f2',
  text: '#776e65',
  tileText: '#776e65',
  tileTextDark: '#f9f6f2',
  tiles: {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
    4096: '#3c3a32',
    8192: '#3c3a32',
  },
};

// Dark Mode Theme
export const DarkTheme: ThemeColors = {
  id: 'dark',
  name: 'Dark Mode',
  background: '#1a1a2e',
  gridBackground: '#0f3460',
  cellBackground: '#16213e',
  scoreBackground: '#0f3460',
  buttonBackground: '#e94560',
  buttonText: '#eaeaea',
  text: '#eaeaea',
  tileText: '#eaeaea',
  tileTextDark: '#1a1a2e',
  tiles: {
    2: '#533483',
    4: '#6247aa',
    8: '#7251b5',
    16: '#815ac0',
    32: '#9163cb',
    64: '#a06cd5',
    128: '#b185db',
    256: '#c19ee0',
    512: '#d2b7e5',
    1024: '#e3d0ea',
    2048: '#f4e9ef',
    4096: '#ff6b9d',
    8192: '#c9184a',
  },
};

// Ocean Theme
export const OceanTheme: ThemeColors = {
  id: 'ocean',
  name: 'Ocean',
  background: '#e0f7fa',
  gridBackground: '#006064',
  cellBackground: '#00838f',
  scoreBackground: '#006064',
  buttonBackground: '#00acc1',
  buttonText: '#ffffff',
  text: '#004d40',
  tileText: '#004d40',
  tileTextDark: '#ffffff',
  tiles: {
    2: '#b2ebf2',
    4: '#80deea',
    8: '#4dd0e1',
    16: '#26c6da',
    32: '#00bcd4',
    64: '#00acc1',
    128: '#0097a7',
    256: '#00838f',
    512: '#006064',
    1024: '#004d40',
    2048: '#00251a',
    4096: '#1a237e',
    8192: '#0d47a1',
  },
};

// Sunset Theme
export const SunsetTheme: ThemeColors = {
  id: 'sunset',
  name: 'Sunset',
  background: '#fff3e0',
  gridBackground: '#bf360c',
  cellBackground: '#d84315',
  scoreBackground: '#bf360c',
  buttonBackground: '#ff6f00',
  buttonText: '#ffffff',
  text: '#3e2723',
  tileText: '#3e2723',
  tileTextDark: '#ffffff',
  tiles: {
    2: '#ffe0b2',
    4: '#ffcc80',
    8: '#ffb74d',
    16: '#ffa726',
    32: '#ff9800',
    64: '#fb8c00',
    128: '#f57c00',
    256: '#ef6c00',
    512: '#e65100',
    1024: '#d84315',
    2048: '#bf360c',
    4096: '#8e24aa',
    8192: '#6a1b9a',
  },
};

// Forest Theme
export const ForestTheme: ThemeColors = {
  id: 'forest',
  name: 'Forest',
  background: '#f1f8e9',
  gridBackground: '#33691e',
  cellBackground: '#558b2f',
  scoreBackground: '#33691e',
  buttonBackground: '#689f38',
  buttonText: '#ffffff',
  text: '#1b5e20',
  tileText: '#1b5e20',
  tileTextDark: '#ffffff',
  tiles: {
    2: '#dcedc8',
    4: '#c5e1a5',
    8: '#aed581',
    16: '#9ccc65',
    32: '#8bc34a',
    64: '#7cb342',
    128: '#689f38',
    256: '#558b2f',
    512: '#33691e',
    1024: '#1b5e20',
    2048: '#0d3f0d',
    4096: '#4a148c',
    8192: '#311b92',
  },
};

// Neon Theme
export const NeonTheme: ThemeColors = {
  id: 'neon',
  name: 'Neon',
  background: '#0a0a0a',
  gridBackground: '#1a1a1a',
  cellBackground: '#2a2a2a',
  scoreBackground: '#1a1a1a',
  buttonBackground: '#ff00ff',
  buttonText: '#ffffff',
  text: '#00ffff',
  tileText: '#ffffff',
  tileTextDark: '#000000',
  tiles: {
    2: '#00ffff',
    4: '#00ff00',
    8: '#ffff00',
    16: '#ff00ff',
    32: '#ff0080',
    64: '#ff4500',
    128: '#00bfff',
    256: '#7fff00',
    512: '#ff1493',
    1024: '#ffd700',
    2048: '#ff00ff',
    4096: '#00ff7f',
    8192: '#ff6347',
  },
};

// Pastel Theme
export const PastelTheme: ThemeColors = {
  id: 'pastel',
  name: 'Pastel',
  background: '#fef9f3',
  gridBackground: '#d4c5b9',
  cellBackground: '#e8ddd3',
  scoreBackground: '#d4c5b9',
  buttonBackground: '#b8a99a',
  buttonText: '#ffffff',
  text: '#6d5d52',
  tileText: '#6d5d52',
  tileTextDark: '#ffffff',
  tiles: {
    2: '#fde2e4',
    4: '#fad2e1',
    8: '#e2ece9',
    16: '#bee1e6',
    32: '#f0efeb',
    64: '#dfe7fd',
    128: '#cddafd',
    256: '#ffc8dd',
    512: '#ffafcc',
    1024: '#bde0fe',
    2048: '#a2d2ff',
    4096: '#cdb4db',
    8192: '#ffc6ff',
  },
};

// Export all themes
export const Themes: ThemeColors[] = [
  ClassicTheme,
  DarkTheme,
  OceanTheme,
  SunsetTheme,
  ForestTheme,
  NeonTheme,
  PastelTheme,
];

export const getThemeById = (id: string): ThemeColors => {
  return Themes.find(theme => theme.id === id) || ClassicTheme;
};

export default Themes;
