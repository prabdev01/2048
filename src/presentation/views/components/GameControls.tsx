/**
 * GameControls Component
 * Displays New Game and Undo buttons
 */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ThemeColors} from '../../../core/constants/ColorSchemes';

interface GameControlsProps {
  onNewGame: () => void;
  onUndo: () => void;
  canUndo: boolean;
  theme: ThemeColors;
}

const GameControls: React.FC<GameControlsProps> = ({
  onNewGame,
  onUndo,
  canUndo,
  theme,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.buttonBackground}]}
        onPress={onNewGame}
        activeOpacity={0.7}>
        <Text style={[styles.buttonText, {color: theme.buttonText}]}>
          New Game
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: canUndo
              ? theme.buttonBackground
              : theme.cellBackground,
          },
        ]}
        onPress={onUndo}
        disabled={!canUndo}
        activeOpacity={0.7}>
        <Text
          style={[
            styles.buttonText,
            {color: canUndo ? theme.buttonText : theme.text},
          ]}>
          Undo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GameControls;
