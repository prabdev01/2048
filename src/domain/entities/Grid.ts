/**
 * Grid Entity
 * Domain entity representing the game grid
 * Single Responsibility: Manages the grid structure and tile operations
 */

import {GridCell, Position} from '../../core/types';
import {GameConstants} from '../../core/constants/GameConstants';
import {createEmptyGrid, getCellAt, setCellAt, removeCellAt} from '../../core/utils/GridUtils';
import {Tile} from './Tile';

const {GRID_SIZE} = GameConstants;

export class Grid {
  public cells: GridCell[][];

  constructor(cells?: GridCell[][]) {
    this.cells = cells || createEmptyGrid();
  }

  /**
   * Gets a cell at the specified position
   */
  getCellContent(position: Position): GridCell {
    return getCellAt(this.cells, position);
  }

  /**
   * Sets a cell at the specified position
   */
  setCellContent(position: Position, tile: GridCell): void {
    setCellAt(this.cells, position, tile);
  }

  /**
   * Removes a cell at the specified position
   */
  removeCellContent(position: Position): void {
    removeCellAt(this.cells, position);
  }

  /**
   * Inserts a tile at a random available position
   */
  insertTile(tile: Tile): void {
    this.setCellContent(tile.position, tile.toData());
  }

  /**
   * Removes a tile from the grid
   */
  removeTile(tile: Tile): void {
    this.removeCellContent(tile.position);
  }

  /**
   * Gets all available cells
   */
  availableCells(): Position[] {
    const cells: Position[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!this.cells[row][col]) {
          cells.push({row, col});
        }
      }
    }
    return cells;
  }

  /**
   * Gets all tiles on the grid
   */
  getAllTiles(): Tile[] {
    const tiles: Tile[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const cell = this.cells[row][col];
        if (cell) {
          tiles.push(Tile.fromData(cell));
        }
      }
    }
    return tiles;
  }

  /**
   * Checks if the grid is full
   */
  isFull(): boolean {
    return this.availableCells().length === 0;
  }

  /**
   * Creates a clone of the grid
   */
  clone(): Grid {
    const clonedCells = this.cells.map(row =>
      row.map(cell => (cell ? Tile.fromData(cell).toData() : null)),
    );
    return new Grid(clonedCells);
  }

  /**
   * Converts grid to plain array
   */
  toArray(): GridCell[][] {
    return this.cells.map(row => row.map(cell => cell));
  }
}

export default Grid;
