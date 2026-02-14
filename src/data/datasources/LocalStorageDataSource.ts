/**
 * LocalStorageDataSource (Alternative for web)
 * Note: This is included for completeness but AsyncStorage is the primary data source
 */

export class LocalStorageDataSource {
  /**
   * Saves a value to localStorage
   */
  save(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  }

  /**
   * Loads a value from localStorage
   */
  load(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      return null;
    }
  }

  /**
   * Removes a value from localStorage
   */
  remove(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  }

  /**
   * Clears all data from localStorage
   */
  clear(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

export default LocalStorageDataSource;
