/**
 * Core Type Definitions
 * Central type definitions used throughout the application
 */

import {ThemeColors} from '../constants/ColorSchemes';

// Direction enum for tile movements
export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

// Position on the grid
export interface Position {
  row: number;
  col: number;
}

// Tile data structure
export interface TileData {
  id: string;
  value: number;
  position: Position;
  mergedFrom?: TileData[];
  isNew?: boolean;
}

// Grid cell type
export type GridCell = TileData | null;

// Game state
export interface GameState {
  grid: GridCell[][];
  score: number;
  bestScore: number;
  isGameOver: boolean;
  isWon: boolean;
  canUndo: boolean;
}

// Game move history for undo
export interface GameMoveHistory {
  grid: GridCell[][];
  score: number;
}

// Game statistics
export interface GameStatistics {
  gamesPlayed: number;
  gamesWon: number;
  highestTile: number;
  totalScore: number;
}

// Settings
export interface Settings {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  themeId: string;
}

// Theme context type
export interface ThemeContextType {
  theme: ThemeColors;
  changeTheme: (themeId: string) => void;
}

// Ad types
export enum AdType {
  BANNER = 'BANNER',
  INTERSTITIAL = 'INTERSTITIAL',
  REWARDED = 'REWARDED',
}

// Ad reward type
export interface AdReward {
  type: 'undo' | 'continue';
}

export default {
  Direction,
  AdType,
};
