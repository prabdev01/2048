/**
 * App.tsx
 * Main Application Component
 * Sets up providers and navigation
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import GameScreen from './src/presentation/views/GameScreen';
import {ThemeColors, getThemeById} from './src/core/constants/ColorSchemes';

// Dependency Injection: Create instances
import {AsyncStorageDataSource} from './src/data/datasources/AsyncStorageDataSource';
import {GameRepositoryImpl} from './src/data/repositories/GameRepositoryImpl';
import {ScoreRepositoryImpl} from './src/data/repositories/ScoreRepositoryImpl';
import {ThemeRepositoryImpl} from './src/data/repositories/ThemeRepositoryImpl';

// Create singleton instances
const dataSource = new AsyncStorageDataSource();
const gameRepository = new GameRepositoryImpl(dataSource);
const scoreRepository = new ScoreRepositoryImpl(dataSource);
const themeRepository = new ThemeRepositoryImpl(dataSource);

function App(): React.JSX.Element {
  const [theme, setTheme] = useState<ThemeColors>(getThemeById('classic'));

  useEffect(() => {
    // Load saved theme on app start
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedThemeId = await themeRepository.loadThemeId();
      if (savedThemeId) {
        setTheme(getThemeById(savedThemeId));
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.background}
        />
        <GameScreen
          gameRepository={gameRepository}
          scoreRepository={scoreRepository}
          themeRepository={themeRepository}
          theme={theme}
          onThemeChange={setTheme}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
