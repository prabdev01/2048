function GameManager(size, InputManager, Actuator, StorageManager) {
  this.size           = size; // Size of the grid
  this.inputManager   = new InputManager;
  this.storageManager = new StorageManager;
  this.actuator       = new Actuator;

  this.startTiles     = 2;
  
  // Game mode and features
  this.gameMode       = this.storageManager.getGameMode() || 'standard';
  this.moveHistory    = []; // For undo functionality
  this.maxHistorySize = 20;
  
  // Powerups
  this.powerups = {
    shuffle: 3,
    remove: 2,
    undo: 5
  };

  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));
  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));
  this.inputManager.on("undo", this.undo.bind(this));

  this.setup();
}

// Restart the game
GameManager.prototype.restart = function () {
  this.storageManager.clearGameState();
  this.actuator.continueGame(); // Clear the game won/lost message
  this.moveHistory = [];
  
  // Reset powerups based on game mode
  if (this.gameMode === 'standard') {
    this.powerups = { shuffle: 3, remove: 2, undo: 5 };
  } else if (this.gameMode === 'plus') {
    this.powerups = { shuffle: 5, remove: 4, undo: 10 };
  } else {
    this.powerups = { shuffle: 0, remove: 0, undo: 0 };
  }
  
  this.setup();
};

// Set game mode
GameManager.prototype.setGameMode = function (mode) {
  this.gameMode = mode;
  this.storageManager.setGameMode(mode);
  this.restart();
};

// Undo last move
GameManager.prototype.undo = function () {
  if (this.gameMode === 'classic') {
    return; // No undo in classic mode
  }
  
  if (this.moveHistory.length === 0) {
    return;
  }
  
  var previousState = this.moveHistory.pop();
  this.grid = new Grid(previousState.grid.size, previousState.grid.cells);
  this.score = previousState.score;
  this.over = previousState.over;
  this.won = previousState.won;
  
  this.actuate();
};

// Save current state for undo
GameManager.prototype.saveState = function () {
  if (this.gameMode === 'classic') {
    return; // Don't save history in classic mode
  }
  
  this.moveHistory.push({
    grid: {
      size: this.grid.size,
      cells: this.grid.serialize().cells
    },
    score: this.score,
    over: this.over,
    won: this.won
  });
  
  // Limit history size
  if (this.moveHistory.length > this.maxHistorySize) {
    this.moveHistory.shift();
  }
};

// Keep playing after winning (allows going over 2048)
GameManager.prototype.keepPlaying = function () {
  this.keepPlaying = true;
  this.actuator.continueGame(); // Clear the game won/lost message
};

// Return true if the game is lost, or has won and the user hasn't kept playing
GameManager.prototype.isGameTerminated = function () {
  return this.over || (this.won && !this.keepPlaying);
};

// Set up the game
GameManager.prototype.setup = function () {
  var previousState = this.storageManager.getGameState();

  // Reload the game from a previous game if present
  if (previousState) {
    this.grid        = new Grid(previousState.grid.size,
                                previousState.grid.cells); // Reload grid
    this.score       = previousState.score;
    this.over        = previousState.over;
    this.won         = previousState.won;
    this.keepPlaying = previousState.keepPlaying;
  } else {
    this.grid        = new Grid(this.size);
    this.score       = 0;
    this.over        = false;
    this.won         = false;
    this.keepPlaying = false;

    // Add the initial tiles
    this.addStartTiles();
  }

  // Update the actuator
  this.actuate();
};

// Set up the initial tiles to start the game with
GameManager.prototype.addStartTiles = function () {
  for (var i = 0; i < this.startTiles; i++) {
    this.addRandomTile();
  }
};

// Adds a tile in a random position
GameManager.prototype.addRandomTile = function () {
  if (this.grid.cellsAvailable()) {
    var value = Math.random() < 0.9 ? 2 : 4;
    var tile = new Tile(this.grid.randomAvailableCell(), value);

    this.grid.insertTile(tile);
  }
};

// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
  if (this.storageManager.getBestScore() < this.score) {
    this.storageManager.setBestScore(this.score);
  }

  // Clear the state when the game is over (game over only, not win)
  if (this.over) {
    this.storageManager.clearGameState();
  } else {
    this.storageManager.setGameState(this.serialize());
  }

  this.actuator.actuate(this.grid, {
    score:      this.score,
    over:       this.over,
    won:        this.won,
    bestScore:  this.storageManager.getBestScore(),
    terminated: this.isGameTerminated()
  });

};

// Represent the current game as an object
GameManager.prototype.serialize = function () {
  return {
    grid:        this.grid.serialize(),
    score:       this.score,
    over:        this.over,
    won:         this.won,
    keepPlaying: this.keepPlaying
  };
};

// Save all tile positions and remove merger info
GameManager.prototype.prepareTiles = function () {
  this.grid.eachCell(function (x, y, tile) {
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
};

// Move a tile and its representation
GameManager.prototype.moveTile = function (tile, cell) {
  this.grid.cells[tile.x][tile.y] = null;
  this.grid.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);
};

// Move tiles on the grid in the specified direction
GameManager.prototype.move = function (direction) {
  // 0: up, 1: right, 2: down, 3: left
  var self = this;

  if (this.isGameTerminated()) return; // Don't do anything if the game's over

  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved      = false;

  // Save state for undo before making the move
  this.saveState();

  // Save the current tile positions and remove merger information
  this.prepareTiles();

  // Traverse the grid in the right direction and move tiles
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next      = self.grid.cellContent(positions.next);

        // Only one merger per row traversal?
        if (next && next.value === tile.value && !next.mergedFrom) {
          var merged = new Tile(positions.next, tile.value * 2);
          merged.mergedFrom = [tile, next];

          self.grid.insertTile(merged);
          self.grid.removeTile(tile);

          // Converge the two tiles' positions
          tile.updatePosition(positions.next);

          // Update the score
          self.score += merged.value;

          // The mighty 2048 tile
          if (merged.value === 2048) self.won = true;
        } else {
          self.moveTile(tile, positions.farthest);
        }

        if (!self.positionsEqual(cell, tile)) {
          moved = true; // The tile moved from its original cell!
        }
      }
    });
  });

  if (moved) {
    this.addRandomTile();

    if (!this.movesAvailable()) {
      this.over = true; // Game over!
    }

    this.actuate();
  }
};

// Get the vector representing the chosen direction
GameManager.prototype.getVector = function (direction) {
  // Vectors representing tile movement
  var map = {
    0: { x: 0,  y: -1 }, // Up
    1: { x: 1,  y: 0 },  // Right
    2: { x: 0,  y: 1 },  // Down
    3: { x: -1, y: 0 }   // Left
  };

  return map[direction];
};

// Build a list of positions to traverse in the right order
GameManager.prototype.buildTraversals = function (vector) {
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < this.size; pos++) {
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  // Always traverse from the farthest cell in the chosen direction
  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

GameManager.prototype.findFarthestPosition = function (cell, vector) {
  var previous;

  // Progress towards the vector direction until an obstacle is found
  do {
    previous = cell;
    cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
  } while (this.grid.withinBounds(cell) &&
           this.grid.cellAvailable(cell));

  return {
    farthest: previous,
    next: cell // Used to check if a merge is required
  };
};

GameManager.prototype.movesAvailable = function () {
  return this.grid.cellsAvailable() || this.tileMatchesAvailable();
};

// Check for available matches between tiles (more expensive check)
GameManager.prototype.tileMatchesAvailable = function () {
  var self = this;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.grid.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell   = { x: x + vector.x, y: y + vector.y };

          var other  = self.grid.cellContent(cell);

          if (other && other.value === tile.value) {
            return true; // These two tiles can be merged
          }
        }
      }
    }
  }

  return false;
};

GameManager.prototype.positionsEqual = function (first, second) {
  return first.x === second.x && first.y === second.y;
};

// Powerup: Shuffle tiles
GameManager.prototype.shuffleTiles = function () {
  if (this.powerups.shuffle <= 0 || this.gameMode === 'classic') return false;
  
  var tiles = [];
  var positions = [];
  
  // Collect all tiles and positions
  this.grid.eachCell(function (x, y, tile) {
    if (tile) {
      tiles.push(tile.value);
      positions.push({ x: x, y: y });
    }
  });
  
  if (tiles.length === 0) return false;
  
  // Shuffle tiles array
  for (var i = tiles.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = temp;
  }
  
  // Clear grid and place shuffled tiles
  this.grid.cells = this.grid.empty();
  for (var k = 0; k < positions.length; k++) {
    var tile = new Tile(positions[k], tiles[k]);
    this.grid.insertTile(tile);
  }
  
  this.powerups.shuffle--;
  this.actuate();
  return true;
};

// Powerup: Remove a tile
GameManager.prototype.removeTile = function () {
  if (this.powerups.remove <= 0 || this.gameMode === 'classic') return false;
  
  var tiles = [];
  
  // Collect all tiles
  this.grid.eachCell(function (x, y, tile) {
    if (tile) {
      tiles.push(tile);
    }
  });
  
  if (tiles.length === 0) return false;
  
  // Remove a random tile (prefer lower value tiles)
  tiles.sort(function(a, b) { return a.value - b.value; });
  var tileToRemove = tiles[Math.floor(Math.random() * Math.min(tiles.length, 3))];
  
  this.grid.removeTile(tileToRemove);
  this.powerups.remove--;
  this.actuate();
  return true;
};

// Powerup: Undo using powerup
GameManager.prototype.usePowerupUndo = function () {
  if (this.powerups.undo <= 0 || this.gameMode === 'classic') return false;
  
  this.powerups.undo--;
  this.undo();
  return true;
};
