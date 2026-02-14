/**
 * IThemeRepository Interface
 * Interface for theme persistence operations
 */

import {Settings} from '../../core/types';

export interface IThemeRepository {
  /**
   * Saves the selected theme ID
   */
  saveThemeId(themeId: string): Promise<void>;

  /**
   * Loads the saved theme ID
   */
  loadThemeId(): Promise<string | null>;

  /**
   * Saves user settings
   */
  saveSettings(settings: Settings): Promise<void>;

  /**
   * Loads user settings
   */
  loadSettings(): Promise<Settings>;
}

export default IThemeRepository;
