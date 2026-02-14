# Quick Setup Guide - React Native 2048

## Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 8.x or **yarn** >= 1.22.x
- **Git** ([Download](https://git-scm.com/))

### For iOS Development (macOS only):
- **Xcode** 12.0 or later ([Mac App Store](https://apps.apple.com/us/app/xcode/id497799835))
- **CocoaPods** >= 1.10.0
  ```bash
  sudo gem install cocoapods
  ```

### For Android Development:
- **Android Studio** ([Download](https://developer.android.com/studio))
- **JDK** 11 or later
- **Android SDK** (API Level 23 or higher)
- Set `ANDROID_HOME` environment variable

## Installation Steps

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/prabdev01/2048.git
cd 2048

# Install Node dependencies
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

### 2. Environment Setup (Optional - for AdMob)

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your AdMob IDs (optional)
# For now, it uses test Ad Unit IDs
```

### 3. Run the App

#### iOS (macOS only):
```bash
npm run ios
```

Or open in Xcode:
```bash
open ios/ReactNative2048.xcworkspace
```

#### Android:
```bash
# Start Metro bundler
npm start

# In another terminal:
npm run android
```

Or open in Android Studio:
```bash
open -a "Android Studio" android/
```

## Common Commands

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Run tests
npm test
```

## Troubleshooting

### Metro bundler cache issues
```bash
npm start -- --reset-cache
```

### iOS build issues
```bash
cd ios
rm -rf Pods Podfile.lock
pod install --repo-update
cd ..
```

### Android build issues
```bash
cd android
./gradlew clean
cd ..
```

### Node modules issues
```bash
rm -rf node_modules
npm install
```

## What's Included

- ✅ Complete 2048 game logic
- ✅ 7 beautiful themes
- ✅ Smooth animations
- ✅ Score tracking & persistence
- ✅ Undo functionality
- ✅ Game state auto-save
- ✅ Haptic feedback
- ✅ AdMob integration (ready)
- ✅ Clean Architecture
- ✅ MVVM pattern
- ✅ TypeScript
- ✅ Comprehensive documentation

## Project Structure

```
├── src/
│   ├── core/              # Constants, types, utilities
│   ├── domain/            # Business logic (entities, use cases)
│   ├── data/              # Data persistence
│   └── presentation/      # UI components & ViewModels
├── android/               # Android native code
├── ios/                   # iOS native code
├── App.tsx                # Main app component
├── index.js               # Entry point
└── package.json           # Dependencies
```

## Next Steps

1. **Play the game!** - Swipe to move tiles
2. **Try different themes** - Tap the 🎨 icon
3. **Read the documentation**:
   - [README_REACT_NATIVE.md](./README_REACT_NATIVE.md) - Full documentation
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture details
4. **Configure AdMob** (optional):
   - Get your AdMob App ID and Ad Unit IDs
   - Update `.env` file
   - Update `ios/ReactNative2048/Info.plist`
   - Update `android/app/src/main/AndroidManifest.xml`

## Support

- **Issues**: [GitHub Issues](https://github.com/prabdev01/2048/issues)
- **Documentation**: See `README_REACT_NATIVE.md` and `ARCHITECTURE.md`

## License

MIT License - See [LICENSE.txt](./LICENSE.txt)

---

Happy coding! 🎮
