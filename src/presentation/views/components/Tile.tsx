/**
 * Tile Component
 * Displays an individual tile with animations
 */

import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {TileData} from '../../../core/types';
import {ThemeColors} from '../../../core/constants/ColorSchemes';

interface TileProps {
  tile: TileData;
  theme: ThemeColors;
  tileSize: number;
  gap: number;
}

const Tile: React.FC<TileProps> = ({tile, theme, tileSize, gap}) => {
  const scale = useSharedValue(tile.isNew ? 0 : 1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (tile.isNew) {
      scale.value = withSpring(1, {
        damping: 12,
        stiffness: 200,
        mass: 0.8,
      });
    }

    if (tile.mergedFrom) {
      scale.value = withSpring(1.1, {
        damping: 15,
        stiffness: 150,
      });
      setTimeout(() => {
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 150,
        });
      }, 100);
    }
  }, [tile.isNew, tile.mergedFrom]);

  const animatedStyle = useAnimatedStyle(() => {
    const left = tile.position.col * (tileSize + gap) + gap;
    const top = tile.position.row * (tileSize + gap) + gap;

    return {
      transform: [
        {
          translateX: withTiming(left, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          }),
        },
        {
          translateY: withTiming(top, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          }),
        },
        {scale: scale.value},
      ],
    };
  });

  const tileColor = theme.tiles[tile.value] || theme.tiles[2048];
  const textColor = tile.value <= 4 ? theme.tileText : theme.tileTextDark;
  const fontSize = tile.value >= 1000 ? tileSize * 0.35 : tileSize * 0.45;

  return (
    <Animated.View
      style={[
        styles.tile,
        {
          width: tileSize,
          height: tileSize,
          backgroundColor: tileColor,
        },
        animatedStyle,
      ]}>
      <Text style={[styles.tileText, {color: textColor, fontSize}]}>
        {tile.value}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  tileText: {
    fontWeight: 'bold',
  },
});

export default Tile;
