/**
 * Grid Component
 * Displays the game grid with cells and tiles
 */

import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {GridCell} from '../../../core/types';
import {ThemeColors} from '../../../core/constants/ColorSchemes';
import {GameConstants} from '../../../core/constants/GameConstants';
import Tile from './Tile';

const {GRID_SIZE} = GameConstants;
const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_PADDING = 16;
const GRID_GAP = 8;
const GRID_WIDTH = Math.min(SCREEN_WIDTH - GRID_PADDING * 2, 500);
const TILE_SIZE = (GRID_WIDTH - GRID_GAP * (GRID_SIZE + 1)) / GRID_SIZE;

interface GridProps {
  grid: GridCell[][];
  theme: ThemeColors;
}

const Grid: React.FC<GridProps> = ({grid, theme}) => {
  // Create grid cells background
  const renderGridCells = () => {
    const cells = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        cells.push(
          <View
            key={`cell-${row}-${col}`}
            style={[
              styles.cell,
              {
                width: TILE_SIZE,
                height: TILE_SIZE,
                backgroundColor: theme.cellBackground,
                top: row * (TILE_SIZE + GRID_GAP) + GRID_GAP,
                left: col * (TILE_SIZE + GRID_GAP) + GRID_GAP,
              },
            ]}
          />,
        );
      }
    }
    return cells;
  };

  // Render tiles
  const renderTiles = () => {
    const tiles: React.ReactElement[] = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          tiles.push(
            <Tile
              key={cell.id}
              tile={cell}
              theme={theme}
              tileSize={TILE_SIZE}
              gap={GRID_GAP}
            />,
          );
        }
      });
    });
    return tiles;
  };

  return (
    <View
      style={[
        styles.gridContainer,
        {
          width: GRID_WIDTH,
          height: GRID_WIDTH,
          backgroundColor: theme.gridBackground,
        },
      ]}>
      {renderGridCells()}
      {renderTiles()}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    position: 'relative',
    borderRadius: 12,
    padding: 0,
  },
  cell: {
    position: 'absolute',
    borderRadius: 6,
  },
});

export {GRID_WIDTH};
export default Grid;
