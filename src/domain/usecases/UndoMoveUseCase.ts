/**
 * UndoMoveUseCase
 * Single Responsibility: Handles undo functionality
 */

import {GameState} from '../entities/GameState';

export class UndoMoveUseCase {
  /**
   * Undoes the last move
   */
  execute(gameState: GameState): boolean {
    return gameState.restorePreviousState();
  }
}

export default UndoMoveUseCase;
