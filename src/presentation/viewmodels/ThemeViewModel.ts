/**
 * ThemeViewModel
 * MVVM Pattern: ViewModel for theme management
 * Single Responsibility: Manages theme selection and persistence
 * Open/Closed Principle: Open for extension (new themes), closed for modification
 */

import {ThemeColors, getThemeById, Themes} from '../../core/constants/ColorSchemes';
import {IThemeRepository} from '../../domain/repositories/IThemeRepository';

export class ThemeViewModel {
  private currentTheme: ThemeColors;
  private themeRepository: IThemeRepository;
  private onThemeChangeCallback?: (theme: ThemeColors) => void;

  constructor(themeRepository: IThemeRepository) {
    this.themeRepository = themeRepository;
    this.currentTheme = getThemeById('classic'); // Default theme
  }

  /**
   * Sets the callback for theme changes
   */
  setOnThemeChange(callback: (theme: ThemeColors) => void): void {
    this.onThemeChangeCallback = callback;
  }

  /**
   * Notifies observers of theme change
   */
  private notifyThemeChange(): void {
    if (this.onThemeChangeCallback) {
      this.onThemeChangeCallback(this.currentTheme);
    }
  }

  /**
   * Loads saved theme
   */
  async loadTheme(): Promise<void> {
    const themeId = await this.themeRepository.loadThemeId();
    if (themeId) {
      this.currentTheme = getThemeById(themeId);
    }
    this.notifyThemeChange();
  }

  /**
   * Changes the current theme
   */
  async changeTheme(themeId: string): Promise<void> {
    this.currentTheme = getThemeById(themeId);
    await this.themeRepository.saveThemeId(themeId);
    this.notifyThemeChange();
  }

  /**
   * Gets the current theme
   */
  getCurrentTheme(): ThemeColors {
    return this.currentTheme;
  }

  /**
   * Gets all available themes
   */
  getAllThemes(): ThemeColors[] {
    return Themes;
  }
}

export default ThemeViewModel;
