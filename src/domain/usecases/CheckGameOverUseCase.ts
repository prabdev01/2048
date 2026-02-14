/**
 * CheckGameOverUseCase
 * Single Responsibility: Determines if the game is over
 */

import {Grid} from '../entities/Grid';
import {movesAvailable} from '../../core/utils/GridUtils';

export class CheckGameOverUseCase {
  /**
   * Checks if the game is over (no moves available)
   */
  execute(grid: Grid): boolean {
    return !movesAvailable(grid.cells);
  }
}

export default CheckGameOverUseCase;
