/**
 * GameState Entity
 * Domain entity representing the complete game state
 * Single Responsibility: Encapsulates all game state data
 */

import {GridCell, GameState as IGameState, GameMoveHistory} from '../../core/types';
import {Grid} from './Grid';

export class GameState {
  public grid: Grid;
  public score: number;
  public bestScore: number;
  public isGameOver: boolean;
  public isWon: boolean;
  public canUndo: boolean;
  private previousState: GameMoveHistory | null;

  constructor(
    grid?: Grid,
    score: number = 0,
    bestScore: number = 0,
    isGameOver: boolean = false,
    isWon: boolean = false,
  ) {
    this.grid = grid || new Grid();
    this.score = score;
    this.bestScore = bestScore;
    this.isGameOver = isGameOver;
    this.isWon = isWon;
    this.canUndo = false;
    this.previousState = null;
  }

  /**
   * Saves current state for undo
   */
  savePreviousState(): void {
    this.previousState = {
      grid: this.grid.clone().toArray(),
      score: this.score,
    };
    this.canUndo = true;
  }

  /**
   * Restores previous state
   */
  restorePreviousState(): boolean {
    if (!this.previousState) {
      return false;
    }

    this.grid = new Grid(this.previousState.grid);
    this.score = this.previousState.score;
    this.previousState = null;
    this.canUndo = false;
    this.isGameOver = false;

    return true;
  }

  /**
   * Clears undo history
   */
  clearUndo(): void {
    this.previousState = null;
    this.canUndo = false;
  }

  /**
   * Updates the score
   */
  updateScore(points: number): void {
    this.score += points;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
    }
  }

  /**
   * Sets game over state
   */
  setGameOver(): void {
    this.isGameOver = true;
    this.clearUndo();
  }

  /**
   * Sets won state
   */
  setWon(): void {
    this.isWon = true;
  }

  /**
   * Resets the game state
   */
  reset(keepBestScore: boolean = true): void {
    this.grid = new Grid();
    this.score = 0;
    if (!keepBestScore) {
      this.bestScore = 0;
    }
    this.isGameOver = false;
    this.isWon = false;
    this.clearUndo();
  }

  /**
   * Converts to plain object
   */
  toPlainObject(): IGameState {
    return {
      grid: this.grid.toArray(),
      score: this.score,
      bestScore: this.bestScore,
      isGameOver: this.isGameOver,
      isWon: this.isWon,
      canUndo: this.canUndo,
    };
  }

  /**
   * Creates GameState from plain object
   */
  static fromPlainObject(state: IGameState): GameState {
    const gameState = new GameState(
      new Grid(state.grid),
      state.score,
      state.bestScore,
      state.isGameOver,
      state.isWon,
    );
    gameState.canUndo = state.canUndo;
    return gameState;
  }
}

export default GameState;
