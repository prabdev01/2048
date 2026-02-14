/**
 * ScoreBoard Component
 * Displays current score and best score
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ThemeColors} from '../../../core/constants/ColorSchemes';

interface ScoreBoardProps {
  score: number;
  bestScore: number;
  theme: ThemeColors;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({score, bestScore, theme}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.scoreBox, {backgroundColor: theme.scoreBackground}]}>
        <Text style={[styles.label, {color: theme.tileTextDark}]}>SCORE</Text>
        <Text style={[styles.score, {color: theme.tileTextDark}]}>{score}</Text>
      </View>
      <View style={[styles.scoreBox, {backgroundColor: theme.scoreBackground}]}>
        <Text style={[styles.label, {color: theme.tileTextDark}]}>BEST</Text>
        <Text style={[styles.score, {color: theme.tileTextDark}]}>{bestScore}</Text>
      </View>
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
  scoreBox: {
    minWidth: 100,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ScoreBoard;
