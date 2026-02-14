/**
 * IGameRepository Interface
 * Interface Segregation Principle: Small, focused interface for game operations
 * Dependency Inversion: High-level modules depend on this abstraction
 */

import {GameState as IGameState} from '../../core/types';

export interface IGameRepository {
  /**
   * Saves the current game state
   */
  saveGameState(state: IGameState): Promise<void>;

  /**
   * Loads the saved game state
   */
  loadGameState(): Promise<IGameState | null>;

  /**
   * Clears the saved game state
   */
  clearGameState(): Promise<void>;
}

export default IGameRepository;
