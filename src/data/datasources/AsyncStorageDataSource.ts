/**
 * AsyncStorageDataSource
 * Low-level data access using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageDataSource {
  /**
   * Saves a value to AsyncStorage
   */
  async save(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  }

  /**
   * Loads a value from AsyncStorage
   */
  async load(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      return null;
    }
  }

  /**
   * Removes a value from AsyncStorage
   */
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  /**
   * Clears all data from AsyncStorage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      throw error;
    }
  }
}

export default AsyncStorageDataSource;
