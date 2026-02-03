// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var gameManager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  var uiManager = new UIManager(gameManager);
  
  // Make game manager globally accessible for debugging
  window.gameManager = gameManager;
  window.uiManager = uiManager;
});
