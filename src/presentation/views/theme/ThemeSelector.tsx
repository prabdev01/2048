/**
 * ThemeSelector Component
 * Allows user to select different color themes
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
import {ThemeColors, Themes} from '../../../core/constants/ColorSchemes';

interface ThemeSelectorProps {
  visible: boolean;
  currentTheme: ThemeColors;
  onSelectTheme: (themeId: string) => void;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  visible,
  currentTheme,
  onSelectTheme,
  onClose,
}) => {
  const handleSelect = (themeId: string) => {
    onSelectTheme(themeId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, {backgroundColor: currentTheme.background}]}>
          <Text style={[styles.title, {color: currentTheme.text}]}>
            Choose Theme
          </Text>

          <ScrollView
            style={styles.themeList}
            showsVerticalScrollIndicator={false}>
            {Themes.map(theme => (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.themeItem,
                  {
                    backgroundColor: theme.gridBackground,
                    borderColor:
                      currentTheme.id === theme.id
                        ? theme.buttonBackground
                        : 'transparent',
                    borderWidth: currentTheme.id === theme.id ? 3 : 0,
                  },
                ]}
                onPress={() => handleSelect(theme.id)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.themeName,
                    {color: theme.tileTextDark},
                  ]}>
                  {theme.name}
                </Text>

                <View style={styles.colorPreview}>
                  {[2, 4, 8, 16, 32].map(value => (
                    <View
                      key={value}
                      style={[
                        styles.colorSwatch,
                        {backgroundColor: theme.tiles[value]},
                      ]}
                    />
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.closeButton,
              {backgroundColor: currentTheme.buttonBackground},
            ]}
            onPress={onClose}
            activeOpacity={0.8}>
            <Text style={[styles.closeButtonText, {color: currentTheme.buttonText}]}>
              Close
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
    justifyContent: 'flex-end',
  },
  modal: {
    maxHeight: Dimensions.get('window').height * 0.7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  themeList: {
    marginBottom: 16,
  },
  themeItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  themeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  colorPreview: {
    flexDirection: 'row',
    gap: 6,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  closeButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThemeSelector;
