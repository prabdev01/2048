/**
 * WinModal Component
 * Displays when the player reaches 2048
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

interface WinModalProps {
  visible: boolean;
  score: number;
  onContinue: () => void;
  onNewGame: () => void;
  theme: ThemeColors;
}

const WinModal: React.FC<WinModalProps> = ({
  visible,
  score,
  onContinue,
  onNewGame,
  theme,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onContinue}>
      <View style={styles.overlay}>
        <View style={[styles.modal, {backgroundColor: theme.background}]}>
          <Text style={[styles.title, {color: theme.text}]}>You Win!</Text>
          
          <Text style={[styles.subtitle, {color: theme.text}]}>
            You reached 2048!
          </Text>

          <Text style={[styles.score, {color: theme.text}]}>
            Score: {score}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: theme.buttonBackground}]}
              onPress={onContinue}
              activeOpacity={0.8}>
              <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                Keep Playing
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.secondaryButton,
                {borderColor: theme.buttonBackground},
              ]}
              onPress={onNewGame}
              activeOpacity={0.8}>
              <Text style={[styles.buttonText, {color: theme.buttonBackground}]}>
                New Game
              </Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  score: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WinModal;
