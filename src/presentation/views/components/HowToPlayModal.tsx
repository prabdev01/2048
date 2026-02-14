/**
 * HowToPlayModal Component
 * Displays game instructions
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import {ThemeColors} from '../../../core/constants/ColorSchemes';

interface HowToPlayModalProps {
  visible: boolean;
  onClose: () => void;
  theme: ThemeColors;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  visible,
  onClose,
  theme,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, {backgroundColor: theme.background}]}>
          <Text style={[styles.title, {color: theme.text}]}>How To Play</Text>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={[styles.heading, {color: theme.text}]}>Goal</Text>
            <Text style={[styles.text, {color: theme.text}]}>
              Join the numbers and get to the 2048 tile!
            </Text>

            <Text style={[styles.heading, {color: theme.text}]}>How to Play</Text>
            <Text style={[styles.text, {color: theme.text}]}>
              Swipe (Up, Down, Left, Right) to move the tiles. When two tiles
              with the same number touch, they merge into one!
            </Text>

            <Text style={[styles.heading, {color: theme.text}]}>Tips</Text>
            <Text style={[styles.text, {color: theme.text}]}>
              • Keep your highest tile in a corner{'\n'}
              • Build up numbers in one direction{'\n'}
              • Think ahead before each move{'\n'}
              • Use the undo button wisely{'\n'}
              • Don't fill up the board too quickly
            </Text>

            <Text style={[styles.heading, {color: theme.text}]}>Themes</Text>
            <Text style={[styles.text, {color: theme.text}]}>
              Tap the palette icon to choose from 7 beautiful themes!
            </Text>
          </ScrollView>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.buttonBackground}]}
            onPress={onClose}
            activeOpacity={0.8}>
            <Text style={[styles.buttonText, {color: theme.buttonText}]}>
              Got It!
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
    width: Dimensions.get('window').width * 0.85,
    maxWidth: 450,
    maxHeight: Dimensions.get('window').height * 0.7,
    padding: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HowToPlayModal;
