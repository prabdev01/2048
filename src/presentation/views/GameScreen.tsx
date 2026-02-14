/**
 * GameScreen
 * Main game screen component
 * MVVM Pattern: View layer that interacts with ViewModels
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {ThemeColors} from '../../core/constants/ColorSchemes';
import {Direction} from '../../core/types';
import {GameState} from '../../domain/entities/GameState';
import {GameViewModel} from '../viewmodels/GameViewModel';
import {ThemeViewModel} from '../viewmodels/ThemeViewModel';

import {IGameRepository} from '../../domain/repositories/IGameRepository';
import {IScoreRepository} from '../../domain/repositories/IScoreRepository';
import {IThemeRepository} from '../../domain/repositories/IThemeRepository';

import Grid from './components/Grid';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';
import GameOverModal from './components/GameOverModal';
import WinModal from './components/WinModal';
import HowToPlayModal from './components/HowToPlayModal';
import ThemeSelector from './theme/ThemeSelector';

interface GameScreenProps {
  gameRepository: IGameRepository;
  scoreRepository: IScoreRepository;
  themeRepository: IThemeRepository;
  theme: ThemeColors;
  onThemeChange: (theme: ThemeColors) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  gameRepository,
  scoreRepository,
  themeRepository,
  theme,
  onThemeChange,
}) => {
  // ViewModels (Dependency Injection)
  const [gameViewModel] = useState(
    () => new GameViewModel(gameRepository, scoreRepository),
  );
  const [themeViewModel] = useState(() => new ThemeViewModel(themeRepository));

  // State
  const [gameState, setGameState] = useState<GameState>(new GameState());
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [hasShownWin, setHasShownWin] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
    
    // Handle Android back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      'Exit Game',
      'Are you sure you want to exit?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ],
    );
    return true;
  };

  const initializeGame = async () => {
    // Setup ViewModel callbacks
    gameViewModel.setOnStateChange((state: GameState) => {
      setGameState(state);
      
      // Show modals
      if (state.isGameOver && !showGameOver) {
        setShowGameOver(true);
      }
      
      if (state.isWon && !hasShownWin) {
        setShowWin(true);
        setHasShownWin(true);
      }
    });

    themeViewModel.setOnThemeChange((newTheme: ThemeColors) => {
      onThemeChange(newTheme);
    });

    // Load saved theme
    await themeViewModel.loadTheme();

    // Try to load saved game, otherwise start new game
    const loaded = await gameViewModel.loadGame();
    if (!loaded) {
      await gameViewModel.newGame();
    }
  };

  const handleNewGame = async () => {
    setShowGameOver(false);
    setShowWin(false);
    setHasShownWin(false);
    await gameViewModel.newGame();
    triggerHaptic();
  };

  const handleMove = async (direction: Direction) => {
    const moved = await gameViewModel.move(direction);
    if (moved) {
      triggerHaptic();
    }
  };

  const handleUndo = async () => {
    await gameViewModel.undo();
    triggerHaptic();
  };

  const handleContinue = () => {
    setShowWin(false);
    gameViewModel.continueGame();
  };

  const handleThemeChange = async (themeId: string) => {
    await themeViewModel.changeTheme(themeId);
    triggerHaptic();
  };

  const triggerHaptic = () => {
    ReactNativeHapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  };

  // Gesture handlers
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(() => {
      handleMove(Direction.UP);
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onEnd(() => {
      handleMove(Direction.DOWN);
    });

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      handleMove(Direction.LEFT);
    });

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      handleMove(Direction.RIGHT);
    });

  const composedGestures = Gesture.Exclusive(
    flingUp,
    flingDown,
    flingLeft,
    flingRight,
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.text}]}>2048</Text>
        
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[styles.iconButton, {backgroundColor: theme.scoreBackground}]}
            onPress={() => setShowHowToPlay(true)}
            activeOpacity={0.7}>
            <Text style={[styles.iconText, {color: theme.tileTextDark}]}>?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.iconButton, {backgroundColor: theme.scoreBackground}]}
            onPress={() => setShowThemeSelector(true)}
            activeOpacity={0.7}>
            <Text style={[styles.iconText, {color: theme.tileTextDark}]}>🎨</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Score Board */}
      <ScoreBoard
        score={gameState.score}
        bestScore={gameState.bestScore}
        theme={theme}
      />

      {/* Game Controls */}
      <GameControls
        onNewGame={handleNewGame}
        onUndo={handleUndo}
        canUndo={gameState.canUndo}
        theme={theme}
      />

      {/* Grid with Gesture Detection */}
      <View style={styles.gridWrapper}>
        <GestureDetector gesture={composedGestures}>
          <View>
            <Grid grid={gameState.grid.cells} theme={theme} />
          </View>
        </GestureDetector>
      </View>

      {/* Instructions */}
      <Text style={[styles.instructions, {color: theme.text}]}>
        Swipe to move tiles. Join numbers to get 2048!
      </Text>

      {/* Modals */}
      <GameOverModal
        visible={showGameOver}
        score={gameState.score}
        bestScore={gameState.bestScore}
        onNewGame={handleNewGame}
        theme={theme}
      />

      <WinModal
        visible={showWin}
        score={gameState.score}
        onContinue={handleContinue}
        onNewGame={handleNewGame}
        theme={theme}
      />

      <HowToPlayModal
        visible={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
        theme={theme}
      />

      <ThemeSelector
        visible={showThemeSelector}
        currentTheme={theme}
        onSelectTheme={handleThemeChange}
        onClose={() => setShowThemeSelector(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gridWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    opacity: 0.7,
  },
});

export default GameScreen;
