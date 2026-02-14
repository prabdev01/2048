/**
 * Tile Entity
 * Domain entity representing a game tile
 * Single Responsibility: Encapsulates tile data and behavior
 */

import {Position, TileData} from '../../core/types';

export class Tile {
  public id: string;
  public value: number;
  public position: Position;
  public mergedFrom?: Tile[];
  public isNew: boolean;

  constructor(position: Position, value: number = 2) {
    this.id = `${Date.now()}_${Math.random()}`;
    this.value = value;
    this.position = position;
    this.isNew = true;
  }

  /**
   * Updates the tile position
   */
  updatePosition(position: Position): void {
    this.position = position;
  }

  /**
   * Marks this tile as merged from other tiles
   */
  setMergedFrom(tiles: Tile[]): void {
    this.mergedFrom = tiles;
  }

  /**
   * Marks the tile as not new
   */
  clearNew(): void {
    this.isNew = false;
  }

  /**
   * Converts tile to plain data object
   */
  toData(): TileData {
    return {
      id: this.id,
      value: this.value,
      position: this.position,
      mergedFrom: this.mergedFrom?.map(t => t.toData()),
      isNew: this.isNew,
    };
  }

  /**
   * Creates a tile from data object
   */
  static fromData(data: TileData): Tile {
    const tile = new Tile(data.position, data.value);
    tile.id = data.id;
    tile.isNew = data.isNew || false;
    if (data.mergedFrom) {
      tile.mergedFrom = data.mergedFrom.map(t => Tile.fromData(t));
    }
    return tile;
  }

  /**
   * Creates a clone of the tile
   */
  clone(): Tile {
    const cloned = new Tile(this.position, this.value);
    cloned.id = this.id;
    cloned.isNew = this.isNew;
    if (this.mergedFrom) {
      cloned.mergedFrom = this.mergedFrom.map(t => t.clone());
    }
    return cloned;
  }
}

export default Tile;
