/**
 * ThemeRepositoryImpl
 * Implementation of IThemeRepository
 */

import {IThemeRepository} from '../../domain/repositories/IThemeRepository';
import {Settings} from '../../core/types';
import {GameConstants} from '../../core/constants/GameConstants';
import {AsyncStorageDataSource} from '../datasources/AsyncStorageDataSource';

const {STORAGE_KEYS} = GameConstants;

const defaultSettings: Settings = {
  soundEnabled: true,
  hapticEnabled: true,
  themeId: 'classic',
};

export class ThemeRepositoryImpl implements IThemeRepository {
  private dataSource: AsyncStorageDataSource;

  constructor(dataSource: AsyncStorageDataSource) {
    this.dataSource = dataSource;
  }

  async saveThemeId(themeId: string): Promise<void> {
    try {
      await this.dataSource.save(STORAGE_KEYS.THEME, themeId);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }

  async loadThemeId(): Promise<string | null> {
    try {
      return await this.dataSource.load(STORAGE_KEYS.THEME);
    } catch (error) {
      console.error('Error loading theme:', error);
      return null;
    }
  }

  async saveSettings(settings: Settings): Promise<void> {
    try {
      const json = JSON.stringify(settings);
      await this.dataSource.save(STORAGE_KEYS.SETTINGS, json);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  async loadSettings(): Promise<Settings> {
    try {
      const json = await this.dataSource.load(STORAGE_KEYS.SETTINGS);
      if (json) {
        return JSON.parse(json) as Settings;
      }
      return defaultSettings;
    } catch (error) {
      console.error('Error loading settings:', error);
      return defaultSettings;
    }
  }
}

export default ThemeRepositoryImpl;
