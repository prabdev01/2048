/**
 * Animation Utility Functions
 * Helper functions for creating consistent animations
 */

import {withTiming, withSpring, Easing} from 'react-native-reanimated';
import {GameConstants} from '../constants/GameConstants';

const {TILE_MOVE_DURATION, TILE_MERGE_DURATION, TILE_APPEAR_DURATION} = GameConstants;

/**
 * Creates a slide animation configuration
 */
export const slideAnimation = (toValue: number) => {
  return withTiming(toValue, {
    duration: TILE_MOVE_DURATION,
    easing: Easing.out(Easing.ease),
  });
};

/**
 * Creates a merge/scale animation configuration
 */
export const mergeAnimation = (toValue: number) => {
  return withSpring(toValue, {
    damping: 15,
    stiffness: 150,
    mass: 1,
  });
};

/**
 * Creates an appear animation configuration
 */
export const appearAnimation = (toValue: number) => {
  return withSpring(toValue, {
    damping: 12,
    stiffness: 200,
    mass: 0.8,
  });
};

/**
 * Creates a fade animation configuration
 */
export const fadeAnimation = (toValue: number, duration: number = 300) => {
  return withTiming(toValue, {
    duration,
    easing: Easing.inOut(Easing.ease),
  });
};

/**
 * Creates a score increment animation
 */
export const scoreAnimation = (toValue: number) => {
  return withSpring(toValue, {
    damping: 10,
    stiffness: 100,
  });
};

export default {
  slideAnimation,
  mergeAnimation,
  appearAnimation,
  fadeAnimation,
  scoreAnimation,
};
