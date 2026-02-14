# React Native 2048 Game

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.73-blue.svg" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue.svg" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" />
</p>

A production-ready, feature-rich React Native implementation of the classic 2048 game with **Clean Architecture**, **MVVM pattern**, and **SOLID principles**. Built for both iOS and Android with smooth animations, multiple themes, and Google AdMob integration.

## 🎮 Features

### Core Gameplay
- ✅ Classic 2048 game mechanics (4x4 grid)
- ✅ Swipe gestures (up, down, left, right)
- ✅ Tile merging logic (2+2=4, 4+4=8, etc.)
- ✅ Random tile generation (90% chance of 2, 10% chance of 4)
- ✅ Score tracking with current and best scores
- ✅ Game over detection
- ✅ Win condition (reaching 2048 tile)
- ✅ Continue playing after winning
- ✅ Undo functionality
- ✅ New game/restart functionality

### Visual & UX
- ✅ 7 beautiful themes (Classic, Dark, Ocean, Sunset, Forest, Neon, Pastel)
- ✅ Smooth animations using react-native-reanimated
  - Tile slide animations
  - Tile merge animations (scale effect)
  - New tile appearance (pop-in animation)
  - Score increment animations
  - Theme transition animations
- ✅ Clean, minimal interface matching the original 2048 aesthetic
- ✅ Color-coded tiles for different values
- ✅ Professional typography
- ✅ Responsive design for different screen sizes
- ✅ Victory and game over modals
- ✅ "How to Play" instructions

### Data Persistence
- ✅ Best score persistence using AsyncStorage
- ✅ Game state auto-save (resume functionality)
- ✅ Theme preference persistence
- ✅ Game statistics tracking

### Platform Features
- ✅ Haptic feedback on iOS and Android
- ✅ Safe area handling (iOS)
- ✅ Back button handling (Android)
- ✅ Cross-platform compatibility

### AdMob Integration (Ready)
- ⚙️ Banner Ads (bottom of game screen)
- ⚙️ Interstitial Ads (on game over)
- ⚙️ Rewarded Ads (extra undo or continue)
- ⚙️ Test/Production Ad Unit IDs configuration

## 🏗️ Architecture

This project follows **Clean Architecture** principles with **MVVM (Model-View-ViewModel)** pattern and implements **SOLID principles** throughout.

### Project Structure

```
src/
├── presentation/          # Presentation Layer (MVVM)
│   ├── viewmodels/       # ViewModels for business logic coordination
│   │   ├── GameViewModel.ts      # Game state management
│   │   ├── ThemeViewModel.ts     # Theme switching logic
│   │   └── AdViewModel.ts        # Ad display logic
│   └── views/            # UI Components
│       ├── GameScreen.tsx        # Main game screen
│       ├── components/           # Reusable UI components
│       │   ├── Grid.tsx
│       │   ├── Tile.tsx
│       │   ├── ScoreBoard.tsx
│       │   ├── GameControls.tsx
│       │   ├── GameOverModal.tsx
│       │   ├── WinModal.tsx
│       │   └── HowToPlayModal.tsx
│       └── theme/
│           └── ThemeSelector.tsx
├── domain/                # Domain Layer (Business Logic)
│   ├── entities/         # Core business entities
│   │   ├── Tile.ts
│   │   ├── Grid.ts
│   │   └── GameState.ts
│   ├── usecases/         # Business use cases
│   │   ├── MoveTilesUseCase.ts
│   │   ├── MergeTilesUseCase.ts
│   │   ├── GenerateTileUseCase.ts
│   │   ├── CheckGameOverUseCase.ts
│   │   ├── CalculateScoreUseCase.ts
│   │   └── UndoMoveUseCase.ts
│   └── repositories/     # Repository interfaces
│       ├── IGameRepository.ts
│       ├── IScoreRepository.ts
│       └── IThemeRepository.ts
├── data/                 # Data Layer
│   ├── repositories/     # Repository implementations
│   │   ├── GameRepositoryImpl.ts
│   │   ├── ScoreRepositoryImpl.ts
│   │   └── ThemeRepositoryImpl.ts
│   └── datasources/      # Data sources
│       ├── AsyncStorageDataSource.ts
│       └── LocalStorageDataSource.ts
└── core/                 # Core utilities and constants
    ├── constants/
    │   ├── GameConstants.ts
    │   └── ColorSchemes.ts    # 7 theme definitions
    ├── utils/
    │   ├── GridUtils.ts
    │   └── AnimationUtils.ts
    └── types/
        └── index.ts
```

### SOLID Principles Implementation

#### 1. Single Responsibility Principle (SRP)
Each class has one reason to change:
- `Tile.ts` - Only manages tile data
- `Grid.ts` - Only manages grid structure
- `GameViewModel.ts` - Only coordinates game logic
- `MoveTilesUseCase.ts` - Only handles tile movement

#### 2. Open/Closed Principle (OCP)
Open for extension, closed for modification:
- Theme system: Add new themes without modifying existing code
- Use cases: Add new game rules without changing core logic

#### 3. Liskov Substitution Principle (LSP)
All repository implementations can be substituted:
```typescript
// Can swap AsyncStorageDataSource with any other storage
const dataSource = new AsyncStorageDataSource();
const gameRepository = new GameRepositoryImpl(dataSource);
```

#### 4. Interface Segregation Principle (ISP)
Small, focused interfaces:
- `IGameRepository` - Only game persistence methods
- `IScoreRepository` - Only score-related methods
- `IThemeRepository` - Only theme-related methods

#### 5. Dependency Inversion Principle (DIP)
Depend on abstractions, not concretions:
```typescript
// ViewModel depends on interface, not implementation
constructor(gameRepository: IGameRepository, scoreRepository: IScoreRepository)
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- React Native development environment setup
  - For iOS: Xcode 12+ and CocoaPods
  - For Android: Android Studio and JDK 11+

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/prabdev01/2048.git
cd 2048
```

2. **Install dependencies**
```bash
npm install
```

3. **Install iOS dependencies (macOS only)**
```bash
cd ios && pod install && cd ..
```

4. **Setup environment variables (Optional - for AdMob)**
```bash
cp .env.example .env
# Edit .env with your AdMob App IDs and Ad Unit IDs
```

### Running the App

#### iOS
```bash
npm run ios
# or
npx react-native run-ios
```

#### Android
```bash
npm run android
# or
npx react-native run-android
```

### Development Commands

```bash
# Start Metro bundler
npm start

# Run TypeScript type checking
npm run type-check

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run tests
npm test
```

## 🎨 Themes

The app includes 7 beautiful, professionally designed themes:

1. **Classic** - Original 2048 colors
2. **Dark Mode** - Dark background with neon tiles
3. **Ocean** - Blue/aqua gradient theme
4. **Sunset** - Orange/pink/purple palette
5. **Forest** - Green/earth tones
6. **Neon** - Vibrant neon colors on dark background
7. **Pastel** - Soft pastel colors

### Adding New Themes

To add a new theme, edit `src/core/constants/ColorSchemes.ts`:

```typescript
export const MyCustomTheme: ThemeColors = {
  id: 'custom',
  name: 'My Custom Theme',
  background: '#FFFFFF',
  gridBackground: '#BBADA0',
  cellBackground: '#CDC1B4',
  scoreBackground: '#BBADA0',
  buttonBackground: '#8F7A66',
  buttonText: '#F9F6F2',
  text: '#776E65',
  tileText: '#776E65',
  tileTextDark: '#F9F6F2',
  tiles: {
    2: '#EEE4DA',
    4: '#EDE0C8',
    // ... add colors for all tile values
  },
};

// Add to Themes array
export const Themes: ThemeColors[] = [
  // ... existing themes
  MyCustomTheme,
];
```

## 📱 AdMob Integration

### Setup AdMob (Optional)

#### 1. Get AdMob App ID and Ad Unit IDs

1. Create an account at [AdMob](https://admob.google.com/)
2. Create an app for iOS and Android
3. Create ad units (Banner, Interstitial, Rewarded)
4. Copy the App IDs and Ad Unit IDs

#### 2. Configure iOS

Edit `ios/ReactNative2048/Info.plist`:
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX</string>
```

Add SKAdNetwork items (see AdMob documentation)

#### 3. Configure Android

Edit `android/app/src/main/AndroidManifest.xml`:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"/>
```

#### 4. Update Environment Variables

Edit `.env` with your actual Ad Unit IDs:
```
IOS_BANNER_AD_UNIT_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
ANDROID_BANNER_AD_UNIT_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
# ... etc
```

**Note:** The current implementation uses test Ad Unit IDs. For production, replace them with your actual IDs.

## 🎯 Game Rules

### Objective
Join the numbers and get to the **2048 tile**!

### How to Play
1. Swipe (Up, Down, Left, Right) to move the tiles
2. When two tiles with the same number touch, they **merge into one**
3. After each move, a new tile (2 or 4) appears randomly
4. Keep playing to reach higher numbers!

### Tips
- Keep your highest tile in a corner
- Build up numbers in one direction
- Think ahead before each move
- Use the undo button wisely
- Don't fill up the board too quickly

## 🛠️ Technologies Used

- **React Native** 0.73.6 - Cross-platform mobile framework
- **TypeScript** 5.3.3 - Type-safe JavaScript
- **React Native Reanimated** 3.6.3 - High-performance animations
- **React Native Gesture Handler** 2.14.1 - Touch gesture handling
- **AsyncStorage** 1.21.0 - Data persistence
- **React Native Haptic Feedback** 2.2.0 - Haptic feedback
- **React Native Google Mobile Ads** 13.2.1 - AdMob integration (ready)

## 🧪 Testing

The project is set up for testing with Jest. Run tests with:

```bash
npm test
```

### Testing Architecture Layers

- **Domain Layer Tests**: Test use cases and entities
- **ViewModel Tests**: Test business logic coordination
- **Component Tests**: Test UI components

## 📦 Build for Production

### iOS

```bash
# Build release version
npx react-native run-ios --configuration Release
```

For App Store submission, open `ios/ReactNative2048.xcworkspace` in Xcode and use Archive.

### Android

```bash
# Generate release APK
cd android
./gradlew assembleRelease

# Generate release AAB (for Play Store)
./gradlew bundleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## 🐛 Troubleshooting

### Common Issues

#### Metro bundler issues
```bash
# Clear Metro cache
npx react-native start --reset-cache
```

#### iOS build issues
```bash
# Clean and reinstall pods
cd ios
rm -rf Pods Podfile.lock
pod install --repo-update
cd ..
```

#### Android build issues
```bash
# Clean gradle
cd android
./gradlew clean
cd ..
```

#### TypeScript errors
```bash
# Rebuild TypeScript
npm run type-check
```

### Known Limitations

- AdMob integration requires additional native configuration (detailed above)
- Haptic feedback intensity varies by device
- Some older Android devices may have performance issues with animations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🙏 Acknowledgments

- Original 2048 game by [Gabriele Cirulli](https://github.com/gabrielecirulli/2048)
- Inspired by [1024](https://play.google.com/store/apps/details?id=com.veewo.a1024) and [Threes](https://asherv.com/threes/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ using React Native and Clean Architecture**
