// UI Manager for handling menu, powerups, and tutorial
function UIManager(gameManager) {
  this.gameManager = gameManager;
  this.tutorialStep = 0;
  this.tutorialSteps = [
    {
      title: "Welcome to 2048!",
      text: "Use arrow keys to move tiles. When two tiles with the same number touch, they merge into one!"
    },
    {
      title: "Goal",
      text: "Try to create a tile with the number 2048. You can continue playing after reaching 2048 to get even higher scores!"
    },
    {
      title: "Strategy",
      text: "Keep your highest value tiles in one corner and build around them. Plan ahead to avoid filling up the board!"
    },
    {
      title: "Ready to Play!",
      text: "That's all you need to know. Have fun and good luck!"
    }
  ];
  
  this.setupEventListeners();
  this.updatePowerupsDisplay();
}

UIManager.prototype.setupEventListeners = function () {
  var self = this;
  
  // Menu buttons
  var menuButton = document.getElementById('menuButton');
  var menuClose = document.getElementById('menuClose');
  var menuOverlay = document.getElementById('menuOverlay');
  
  if (menuButton) {
    menuButton.addEventListener('click', function () {
      menuOverlay.classList.add('active');
    });
  }
  
  if (menuClose) {
    menuClose.addEventListener('click', function () {
      menuOverlay.classList.remove('active');
    });
  }
  
  // Close menu when clicking outside
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function (e) {
      if (e.target === menuOverlay) {
        menuOverlay.classList.remove('active');
      }
    });
  }
  
  // Game mode selection
  var modeItems = document.querySelectorAll('.mode-item');
  modeItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var mode = this.getAttribute('data-mode');
      self.setGameMode(mode);
      
      // Update active state
      modeItems.forEach(function (m) { m.classList.remove('active'); });
      this.classList.add('active');
      
      // Close menu
      menuOverlay.classList.remove('active');
    });
  });
  
  // Undo button
  var undoButton = document.getElementById('undoButton');
  if (undoButton) {
    undoButton.addEventListener('click', function () {
      self.gameManager.undo();
    });
  }
  
  // Powerup buttons
  var shuffleButton = document.getElementById('shufflePowerup');
  var removeButton = document.getElementById('removePowerup');
  var undoPowerupButton = document.getElementById('undoPowerup');
  
  if (shuffleButton) {
    shuffleButton.addEventListener('click', function () {
      if (self.gameManager.shuffleTiles()) {
        self.updatePowerupsDisplay();
      }
    });
  }
  
  if (removeButton) {
    removeButton.addEventListener('click', function () {
      if (self.gameManager.removeTile()) {
        self.updatePowerupsDisplay();
      }
    });
  }
  
  if (undoPowerupButton) {
    undoPowerupButton.addEventListener('click', function () {
      if (self.gameManager.usePowerupUndo()) {
        self.updatePowerupsDisplay();
      }
    });
  }
  
  // Dark theme toggle
  var darkThemeToggle = document.getElementById('darkThemeToggle');
  if (darkThemeToggle) {
    // Load saved preference
    var darkMode = localStorage.getItem('darkTheme') === 'true';
    darkThemeToggle.checked = darkMode;
    if (darkMode) {
      document.body.classList.add('dark-theme');
    }
    
    darkThemeToggle.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('darkTheme', 'true');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('darkTheme', 'false');
      }
    });
  }
  
  // Tutorial
  var tutorialNext = document.getElementById('tutorialNext');
  if (tutorialNext) {
    tutorialNext.addEventListener('click', function () {
      self.nextTutorialStep();
    });
  }
};

UIManager.prototype.setGameMode = function (mode) {
  this.gameManager.setGameMode(mode);
  
  // Show/hide powerups based on mode
  var powerupsPanel = document.getElementById('powerupsPanel');
  var undoButton = document.getElementById('undoButton');
  
  if (mode === 'standard' || mode === 'plus') {
    if (powerupsPanel) powerupsPanel.style.display = 'block';
    if (undoButton) undoButton.style.display = 'inline-block';
  } else {
    if (powerupsPanel) powerupsPanel.style.display = 'none';
    if (undoButton) undoButton.style.display = mode === 'classic' ? 'none' : 'inline-block';
  }
  
  // Start tutorial if tutorial mode
  if (mode === 'tutorial') {
    this.startTutorial();
  } else {
    this.endTutorial();
  }
  
  this.updatePowerupsDisplay();
};

UIManager.prototype.updatePowerupsDisplay = function () {
  var powerups = this.gameManager.powerups;
  
  var shuffleCount = document.querySelector('#shufflePowerup .powerup-count');
  var removeCount = document.querySelector('#removePowerup .powerup-count');
  var undoCount = document.querySelector('#undoPowerup .powerup-count');
  
  if (shuffleCount) shuffleCount.textContent = powerups.shuffle;
  if (removeCount) removeCount.textContent = powerups.remove;
  if (undoCount) undoCount.textContent = powerups.undo;
  
  // Disable buttons if no powerups left
  var shuffleButton = document.getElementById('shufflePowerup');
  var removeButton = document.getElementById('removePowerup');
  var undoPowerupButton = document.getElementById('undoPowerup');
  
  if (shuffleButton) {
    shuffleButton.disabled = powerups.shuffle <= 0;
  }
  if (removeButton) {
    removeButton.disabled = powerups.remove <= 0;
  }
  if (undoPowerupButton) {
    undoPowerupButton.disabled = powerups.undo <= 0;
  }
};

UIManager.prototype.startTutorial = function () {
  this.tutorialStep = 0;
  this.showTutorialStep();
};

UIManager.prototype.showTutorialStep = function () {
  var overlay = document.getElementById('tutorialOverlay');
  var title = document.getElementById('tutorialTitle');
  var text = document.getElementById('tutorialText');
  var button = document.getElementById('tutorialNext');
  
  if (!overlay || this.tutorialStep >= this.tutorialSteps.length) {
    this.endTutorial();
    return;
  }
  
  var step = this.tutorialSteps[this.tutorialStep];
  title.textContent = step.title;
  text.textContent = step.text;
  
  if (this.tutorialStep === this.tutorialSteps.length - 1) {
    button.textContent = 'Start Playing!';
  } else {
    button.textContent = 'Next';
  }
  
  overlay.style.display = 'flex';
};

UIManager.prototype.nextTutorialStep = function () {
  this.tutorialStep++;
  if (this.tutorialStep >= this.tutorialSteps.length) {
    this.endTutorial();
  } else {
    this.showTutorialStep();
  }
};

UIManager.prototype.endTutorial = function () {
  var overlay = document.getElementById('tutorialOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
};
