// Import CSS
import './main.css';

// Import all game modules in the correct order
import './bind_polyfill.js';
import './classlist_polyfill.js';
import './animframe_polyfill.js';
import './keyboard_input_manager.js';
import './html_actuator.js';
import './grid.js';
import './tile.js';
import './local_storage_manager.js';
import './game_manager.js';
import './application.js';

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Add enhanced keyboard controls
document.addEventListener('DOMContentLoaded', () => {
  // Detect if user is on desktop
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  
  if (isDesktop) {
    // Show desktop hints
    const hints = document.querySelectorAll('.desktop-hint');
    hints.forEach(hint => hint.style.display = 'inline');
  }
});

console.log('2048 Game loaded successfully!');
