/**
 * GenerateTileUseCase
 * Single Responsibility: Generates a new random tile
 * Business logic for tile generation with 90% chance of 2, 10% chance of 4
 */

import {GameConstants} from '../../core/constants/GameConstants';
import {Grid} from '../entities/Grid';
import {Tile} from '../entities/Tile';

const {TILE_TWO_PROBABILITY} = GameConstants;

export class GenerateTileUseCase {
  /**
   * Generates a random tile value (2 or 4)
   */
  private generateValue(): number {
    return Math.random() < TILE_TWO_PROBABILITY ? 2 : 4;
  }

  /**
   * Gets a random position from available cells
   */
  private getRandomPosition(availableCells: {row: number; col: number}[]): {
    row: number;
    col: number;
  } | null {
    if (availableCells.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    return availableCells[randomIndex];
  }

  /**
   * Executes the use case: adds a random tile to the grid
   */
  execute(grid: Grid): Tile | null {
    const availableCells = grid.availableCells();
    const position = this.getRandomPosition(availableCells);

    if (!position) {
      return null;
    }

    const value = this.generateValue();
    const tile = new Tile(position, value);
    grid.insertTile(tile);

    return tile;
  }
}

export default GenerateTileUseCase;
