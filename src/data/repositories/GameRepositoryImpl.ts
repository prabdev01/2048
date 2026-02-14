/**
 * GameRepositoryImpl
 * Implementation of IGameRepository
 * Dependency Inversion: Implements the interface defined in domain layer
 */

import {IGameRepository} from '../../domain/repositories/IGameRepository';
import {GameState as IGameState} from '../../core/types';
import {GameConstants} from '../../core/constants/GameConstants';
import {AsyncStorageDataSource} from '../datasources/AsyncStorageDataSource';

const {STORAGE_KEYS} = GameConstants;

export class GameRepositoryImpl implements IGameRepository {
  private dataSource: AsyncStorageDataSource;

  constructor(dataSource: AsyncStorageDataSource) {
    this.dataSource = dataSource;
  }

  async saveGameState(state: IGameState): Promise<void> {
    try {
      const json = JSON.stringify(state);
      await this.dataSource.save(STORAGE_KEYS.GAME_STATE, json);
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }

  async loadGameState(): Promise<IGameState | null> {
    try {
      const json = await this.dataSource.load(STORAGE_KEYS.GAME_STATE);
      if (json) {
        return JSON.parse(json) as IGameState;
      }
      return null;
    } catch (error) {
      console.error('Error loading game state:', error);
      return null;
    }
  }

  async clearGameState(): Promise<void> {
    try {
      await this.dataSource.remove(STORAGE_KEYS.GAME_STATE);
    } catch (error) {
      console.error('Error clearing game state:', error);
    }
  }
}

export default GameRepositoryImpl;
