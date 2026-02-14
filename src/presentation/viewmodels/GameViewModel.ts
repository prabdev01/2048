/**
 * GameViewModel
 * MVVM Pattern: ViewModel for game logic and state management
 * Single Responsibility: Manages game state and coordinates use cases
 */

import {GameState} from '../../domain/entities/GameState';
import {Grid} from '../../domain/entities/Grid';
import {Direction, GameStatistics} from '../../core/types';
import {GameConstants} from '../../core/constants/GameConstants';
import {GenerateTileUseCase} from '../../domain/usecases/GenerateTileUseCase';
import {MoveTilesUseCase} from '../../domain/usecases/MoveTilesUseCase';
import {CalculateScoreUseCase} from '../../domain/usecases/CalculateScoreUseCase';
import {CheckGameOverUseCase} from '../../domain/usecases/CheckGameOverUseCase';
import {UndoMoveUseCase} from '../../domain/usecases/UndoMoveUseCase';
import {IGameRepository} from '../../domain/repositories/IGameRepository';
import {IScoreRepository} from '../../domain/repositories/IScoreRepository';

const {WINNING_TILE_VALUE, INITIAL_TILES} = GameConstants;

export class GameViewModel {
  private gameState: GameState;
  private gameRepository: IGameRepository;
  private scoreRepository: IScoreRepository;

  // Use cases (Dependency Injection)
  private generateTileUseCase: GenerateTileUseCase;
  private moveTilesUseCase: MoveTilesUseCase;
  private calculateScoreUseCase: CalculateScoreUseCase;
  private checkGameOverUseCase: CheckGameOverUseCase;
  private undoMoveUseCase: UndoMoveUseCase;

  // Callbacks for UI updates
  private onStateChangeCallback?: (state: GameState) => void;

  constructor(gameRepository: IGameRepository, scoreRepository: IScoreRepository) {
    this.gameRepository = gameRepository;
    this.scoreRepository = scoreRepository;

    // Initialize use cases
    this.generateTileUseCase = new GenerateTileUseCase();
    this.moveTilesUseCase = new MoveTilesUseCase();
    this.calculateScoreUseCase = new CalculateScoreUseCase();
    this.checkGameOverUseCase = new CheckGameOverUseCase();
    this.undoMoveUseCase = new UndoMoveUseCase();

    // Initialize game state
    this.gameState = new GameState();
  }

  /**
   * Sets the callback for state changes
   */
  setOnStateChange(callback: (state: GameState) => void): void {
    this.onStateChangeCallback = callback;
  }

  /**
   * Notifies observers of state change
   */
  private notifyStateChange(): void {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(this.gameState);
    }
  }

  /**
   * Initializes a new game
   */
  async newGame(): Promise<void> {
    // Load best score
    const bestScore = await this.scoreRepository.loadBestScore();
    
    // Reset game state
    this.gameState = new GameState(new Grid(), 0, bestScore);

    // Add initial tiles
    for (let i = 0; i < INITIAL_TILES; i++) {
      this.generateTileUseCase.execute(this.gameState.grid);
    }

    // Save state
    await this.saveGame();
    this.notifyStateChange();
  }

  /**
   * Loads saved game
   */
  async loadGame(): Promise<boolean> {
    const savedState = await this.gameRepository.loadGameState();
    if (savedState) {
      this.gameState = GameState.fromPlainObject(savedState);
      this.notifyStateChange();
      return true;
    }
    return false;
  }

  /**
   * Saves current game
   */
  async saveGame(): Promise<void> {
    await this.gameRepository.saveGameState(this.gameState.toPlainObject());
    await this.scoreRepository.saveBestScore(this.gameState.bestScore);
  }

  /**
   * Moves tiles in the specified direction
   */
  async move(direction: Direction): Promise<boolean> {
    if (this.gameState.isGameOver) {
      return false;
    }

    // Save previous state for undo
    this.gameState.savePreviousState();

    // Execute move
    const result = this.moveTilesUseCase.execute(this.gameState.grid, direction);

    if (!result.moved) {
      // No tiles moved, clear undo
      this.gameState.clearUndo();
      return false;
    }

    // Calculate and update score
    const scoreIncrement = this.calculateScoreUseCase.execute(result.mergedTiles);
    this.gameState.updateScore(scoreIncrement);

    // Check for win condition
    const tiles = this.gameState.grid.getAllTiles();
    const hasWinningTile = tiles.some(tile => tile.value >= WINNING_TILE_VALUE);
    if (hasWinningTile && !this.gameState.isWon) {
      this.gameState.setWon();
    }

    // Generate new tile
    this.generateTileUseCase.execute(this.gameState.grid);

    // Check game over
    const isGameOver = this.checkGameOverUseCase.execute(this.gameState.grid);
    if (isGameOver) {
      this.gameState.setGameOver();
      await this.updateStatistics(false);
    }

    // Save and notify
    await this.saveGame();
    this.notifyStateChange();

    return true;
  }

  /**
   * Undoes the last move
   */
  async undo(): Promise<boolean> {
    const success = this.undoMoveUseCase.execute(this.gameState);
    if (success) {
      await this.saveGame();
      this.notifyStateChange();
    }
    return success;
  }

  /**
   * Continues playing after win
   */
  continueGame(): void {
    // Allow continuing after winning
    this.notifyStateChange();
  }

  /**
   * Gets current game state
   */
  getState(): GameState {
    return this.gameState;
  }

  /**
   * Updates game statistics
   */
  private async updateStatistics(won: boolean): Promise<void> {
    const stats = await this.scoreRepository.loadStatistics();
    
    stats.gamesPlayed += 1;
    if (won) {
      stats.gamesWon += 1;
    }
    stats.totalScore += this.gameState.score;

    // Update highest tile
    const tiles = this.gameState.grid.getAllTiles();
    const maxTile = Math.max(...tiles.map(t => t.value), 0);
    if (maxTile > stats.highestTile) {
      stats.highestTile = maxTile;
    }

    await this.scoreRepository.saveStatistics(stats);
  }

  /**
   * Gets game statistics
   */
  async getStatistics(): Promise<GameStatistics> {
    return await this.scoreRepository.loadStatistics();
  }

  /**
   * Resets statistics
   */
  async resetStatistics(): Promise<void> {
    await this.scoreRepository.resetStatistics();
  }
}

export default GameViewModel;
