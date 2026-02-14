/**
 * Grid Utility Functions
 * Helper functions for grid manipulation and traversal
 */

import {GridCell, Position, Direction} from '../types';
import {GameConstants} from '../constants/GameConstants';

const {GRID_SIZE} = GameConstants;

/**
 * Creates an empty grid
 */
export const createEmptyGrid = (): GridCell[][] => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
};

/**
 * Deep clones a grid
 */
export const cloneGrid = (grid: GridCell[][]): GridCell[][] => {
  return grid.map(row =>
    row.map(cell => (cell ? {...cell, mergedFrom: cell.mergedFrom?.map(t => ({...t}))} : null)),
  );
};

/**
 * Gets available cells in the grid
 */
export const getAvailableCells = (grid: GridCell[][]): Position[] => {
  const cells: Position[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!grid[row][col]) {
        cells.push({row, col});
      }
    }
  }
  return cells;
};

/**
 * Checks if a cell is within grid bounds
 */
export const isWithinBounds = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < GRID_SIZE && pos.col >= 0 && pos.col < GRID_SIZE;
};

/**
 * Gets cell at position
 */
export const getCellAt = (grid: GridCell[][], pos: Position): GridCell => {
  if (!isWithinBounds(pos)) {
    return null;
  }
  return grid[pos.row][pos.col];
};

/**
 * Sets cell at position
 */
export const setCellAt = (grid: GridCell[][], pos: Position, tile: GridCell): void => {
  if (isWithinBounds(pos)) {
    grid[pos.row][pos.col] = tile;
    if (tile) {
      tile.position = pos;
    }
  }
};

/**
 * Removes cell at position
 */
export const removeCellAt = (grid: GridCell[][], pos: Position): void => {
  if (isWithinBounds(pos)) {
    grid[pos.row][pos.col] = null;
  }
};

/**
 * Gets the vector for a direction
 */
export const getVector = (direction: Direction): Position => {
  const map = {
    [Direction.UP]: {row: -1, col: 0},
    [Direction.DOWN]: {row: 1, col: 0},
    [Direction.LEFT]: {row: 0, col: -1},
    [Direction.RIGHT]: {row: 0, col: 1},
  };
  return map[direction];
};

/**
 * Builds traversal order for a direction
 */
export const buildTraversals = (direction: Direction): {rows: number[]; cols: number[]} => {
  const traversals = {
    rows: Array.from({length: GRID_SIZE}, (_, i) => i),
    cols: Array.from({length: GRID_SIZE}, (_, i) => i),
  };

  // Always traverse from the farthest cell in the chosen direction
  if (direction === Direction.DOWN) {
    traversals.rows.reverse();
  }
  if (direction === Direction.RIGHT) {
    traversals.cols.reverse();
  }

  return traversals;
};

/**
 * Finds the farthest available position in a direction
 */
export const findFarthestPosition = (
  grid: GridCell[][],
  position: Position,
  vector: Position,
): {farthest: Position; next: Position} => {
  let previous: Position = position;
  let next: Position = {row: position.row + vector.row, col: position.col + vector.col};

  // Progress towards the vector direction until an obstacle is found
  while (isWithinBounds(next) && !getCellAt(grid, next)) {
    previous = next;
    next = {row: next.row + vector.row, col: next.col + vector.col};
  }

  return {
    farthest: previous,
    next: next,
  };
};

/**
 * Checks if any moves are available
 */
export const movesAvailable = (grid: GridCell[][]): boolean => {
  // Check for empty cells
  if (getAvailableCells(grid).length > 0) {
    return true;
  }

  // Check for possible merges
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const tile = grid[row][col];
      if (tile) {
        // Check adjacent cells
        const directions = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
        for (const direction of directions) {
          const vector = getVector(direction);
          const adjacent = {row: row + vector.row, col: col + vector.col};
          const adjacentTile = getCellAt(grid, adjacent);

          if (adjacentTile && adjacentTile.value === tile.value) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

/**
 * Compares two positions for equality
 */
export const positionsEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.row === pos2.row && pos1.col === pos2.col;
};

export default {
  createEmptyGrid,
  cloneGrid,
  getAvailableCells,
  isWithinBounds,
  getCellAt,
  setCellAt,
  removeCellAt,
  getVector,
  buildTraversals,
  findFarthestPosition,
  movesAvailable,
  positionsEqual,
};
