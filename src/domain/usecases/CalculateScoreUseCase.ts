/**
 * CalculateScoreUseCase
 * Single Responsibility: Calculates score from merged tiles
 */

import {Tile} from '../entities/Tile';

export class CalculateScoreUseCase {
  /**
   * Calculates the score increment from merged tiles
   */
  execute(mergedTiles: Tile[]): number {
    return mergedTiles.reduce((score, tile) => score + tile.value, 0);
  }
}

export default CalculateScoreUseCase;
