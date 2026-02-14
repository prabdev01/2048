/**
 * ScoreRepositoryImpl
 * Implementation of IScoreRepository
 */

import {IScoreRepository} from '../../domain/repositories/IScoreRepository';
import {GameStatistics} from '../../core/types';
import {GameConstants} from '../../core/constants/GameConstants';
import {AsyncStorageDataSource} from '../datasources/AsyncStorageDataSource';

const {STORAGE_KEYS} = GameConstants;

const defaultStatistics: GameStatistics = {
  gamesPlayed: 0,
  gamesWon: 0,
  highestTile: 0,
  totalScore: 0,
};

export class ScoreRepositoryImpl implements IScoreRepository {
  private dataSource: AsyncStorageDataSource;

  constructor(dataSource: AsyncStorageDataSource) {
    this.dataSource = dataSource;
  }

  async saveBestScore(score: number): Promise<void> {
    try {
      await this.dataSource.save(STORAGE_KEYS.BEST_SCORE, score.toString());
    } catch (error) {
      console.error('Error saving best score:', error);
    }
  }

  async loadBestScore(): Promise<number> {
    try {
      const score = await this.dataSource.load(STORAGE_KEYS.BEST_SCORE);
      return score ? parseInt(score, 10) : 0;
    } catch (error) {
      console.error('Error loading best score:', error);
      return 0;
    }
  }

  async saveStatistics(stats: GameStatistics): Promise<void> {
    try {
      const json = JSON.stringify(stats);
      await this.dataSource.save(STORAGE_KEYS.STATISTICS, json);
    } catch (error) {
      console.error('Error saving statistics:', error);
    }
  }

  async loadStatistics(): Promise<GameStatistics> {
    try {
      const json = await this.dataSource.load(STORAGE_KEYS.STATISTICS);
      if (json) {
        return JSON.parse(json) as GameStatistics;
      }
      return defaultStatistics;
    } catch (error) {
      console.error('Error loading statistics:', error);
      return defaultStatistics;
    }
  }

  async resetStatistics(): Promise<void> {
    try {
      await this.saveStatistics(defaultStatistics);
    } catch (error) {
      console.error('Error resetting statistics:', error);
    }
  }
}

export default ScoreRepositoryImpl;
