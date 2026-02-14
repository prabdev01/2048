/**
 * MoveTilesUseCase
 * Single Responsibility: Handles tile movement logic
 * Core game logic for moving tiles in a given direction
 */

import {Direction, Position} from '../../core/types';
import {Grid} from '../entities/Grid';
import {Tile} from '../entities/Tile';
import {
  getVector,
  buildTraversals,
  findFarthestPosition,
  positionsEqual,
} from '../../core/utils/GridUtils';

export interface MoveResult {
  moved: boolean;
  mergedTiles: Tile[];
}

export class MoveTilesUseCase {
  /**
   * Executes the move operation
   */
  execute(grid: Grid, direction: Direction): MoveResult {
    const vector = getVector(direction);
    const traversals = buildTraversals(direction);
    let moved = false;
    const mergedTiles: Tile[] = [];

    // Clear merged flags
    grid.getAllTiles().forEach(tile => {
      tile.mergedFrom = undefined;
    });

    // Traverse in the right order
    traversals.rows.forEach(row => {
      traversals.cols.forEach(col => {
        const position: Position = {row, col};
        const tile = grid.getCellContent(position);

        if (tile) {
          const tileObj = Tile.fromData(tile);
          const positions = findFarthestPosition(grid.cells, position, vector);
          const nextTile = grid.getCellContent(positions.next);

          // Check if we can merge with the next tile
          if (nextTile && nextTile.value === tileObj.value && !nextTile.mergedFrom) {
            // Merge tiles
            const mergedValue = tileObj.value * 2;
            const merged = new Tile(positions.next, mergedValue);
            merged.setMergedFrom([tileObj, Tile.fromData(nextTile)]);

            grid.removeCellContent(position);
            grid.setCellContent(positions.next, merged.toData());

            tileObj.updatePosition(positions.next);
            mergedTiles.push(merged);
            moved = true;
          } else {
            // Move tile to farthest position
            if (!positionsEqual(position, positions.farthest)) {
              grid.removeCellContent(position);
              grid.setCellContent(positions.farthest, tileObj.toData());
              tileObj.updatePosition(positions.farthest);
              moved = true;
            }
          }
        }
      });
    });

    return {moved, mergedTiles};
  }
}

export default MoveTilesUseCase;
