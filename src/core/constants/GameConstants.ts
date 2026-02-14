/**
 * Game Constants
 * Core configuration values for the 2048 game
 */

export const GameConstants = {
  GRID_SIZE: 4,
  INITIAL_TILES: 2,
  WINNING_TILE_VALUE: 2048,
  
  // Probability for new tiles
  TILE_TWO_PROBABILITY: 0.9,
  TILE_FOUR_PROBABILITY: 0.1,
  
  // Animation durations (ms)
  TILE_MOVE_DURATION: 200,
  TILE_MERGE_DURATION: 150,
  TILE_APPEAR_DURATION: 200,
  
  // Storage keys
  STORAGE_KEYS: {
    BEST_SCORE: '@2048:bestScore',
    GAME_STATE: '@2048:gameState',
    THEME: '@2048:theme',
    STATISTICS: '@2048:statistics',
    SETTINGS: '@2048:settings',
  },
  
  // Ad Configuration
  AD_CONFIG: {
    INTERSTITIAL_FREQUENCY: 3, // Show every N game overs
    MAX_INTERSTITIAL_PER_SESSION: 5,
  },
} as const;

export default GameConstants;
