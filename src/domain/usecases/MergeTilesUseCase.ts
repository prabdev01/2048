/**
 * MergeTilesUseCase
 * Single Responsibility: Handles tile merging logic
 * (Currently integrated into MoveTilesUseCase, but separated for SOLID principles)
 */

import {Tile} from '../entities/Tile';
import {Position} from '../../core/types';

export class MergeTilesUseCase {
  /**
   * Merges two tiles into one
   */
  execute(tile1: Tile, tile2: Tile, position: Position): Tile {
    const mergedValue = tile1.value + tile2.value;
    const mergedTile = new Tile(position, mergedValue);
    mergedTile.setMergedFrom([tile1, tile2]);
    return mergedTile;
  }

  /**
   * Checks if two tiles can be merged
   */
  canMerge(tile1: Tile | null, tile2: Tile | null): boolean {
    if (!tile1 || !tile2) {
      return false;
    }
    return tile1.value === tile2.value && !tile1.mergedFrom && !tile2.mergedFrom;
  }
}

export default MergeTilesUseCase;
