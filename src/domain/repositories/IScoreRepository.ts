/**
 * IScoreRepository Interface
 * Interface for score persistence operations
 */

import {GameStatistics} from '../../core/types';

export interface IScoreRepository {
  /**
   * Saves the best score
   */
  saveBestScore(score: number): Promise<void>;

  /**
   * Loads the best score
   */
  loadBestScore(): Promise<number>;

  /**
   * Saves game statistics
   */
  saveStatistics(stats: GameStatistics): Promise<void>;

  /**
   * Loads game statistics
   */
  loadStatistics(): Promise<GameStatistics>;

  /**
   * Resets statistics
   */
  resetStatistics(): Promise<void>;
}

export default IScoreRepository;
