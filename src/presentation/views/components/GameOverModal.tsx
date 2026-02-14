/**
 * GameOverModal Component
 * Displays when the game is over
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import {ThemeColors} from '../../../core/constants/ColorSchemes';

interface GameOverModalProps {
  visible: boolean;
  score: number;
  bestScore: number;
  onNewGame: () => void;
  theme: ThemeColors;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  visible,
  score,
  bestScore,
  onNewGame,
  theme,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onNewGame}>
      <View style={styles.overlay}>
        <View style={[styles.modal, {backgroundColor: theme.background}]}>
          <Text style={[styles.title, {color: theme.text}]}>Game Over!</Text>
          
          <View style={styles.scoreContainer}>
            <View style={styles.scoreRow}>
              <Text style={[styles.scoreLabel, {color: theme.text}]}>
                Score:
              </Text>
              <Text style={[styles.scoreValue, {color: theme.text}]}>
                {score}
              </Text>
            </View>
            
            <View style={styles.scoreRow}>
              <Text style={[styles.scoreLabel, {color: theme.text}]}>
                Best:
              </Text>
              <Text style={[styles.scoreValue, {color: theme.text}]}>
                {bestScore}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.buttonBackground}]}
            onPress={onNewGame}
            activeOpacity={0.8}>
            <Text style={[styles.buttonText, {color: theme.buttonText}]}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: Dimensions.get('window').width * 0.8,
    maxWidth: 400,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  scoreContainer: {
    width: '100%',
    marginBottom: 32,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOverModal;
