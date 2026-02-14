# Troubleshooting Guide - React Native 2048

## Common Issues and Solutions

### Installation Issues

#### Issue: `npm install` fails
**Symptoms**: Errors during dependency installation

**Solutions**:
```bash
# 1. Clear npm cache
npm cache clean --force

# 2. Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Try with yarn instead
npm install -g yarn
yarn install

# 4. Check Node version (requires >= 18)
node --version
```

#### Issue: `pod install` fails (iOS)
**Symptoms**: CocoaPods installation errors

**Solutions**:
```bash
# 1. Update CocoaPods
sudo gem install cocoapods

# 2. Clean and reinstall
cd ios
rm -rf Pods Podfile.lock
pod deintegrate
pod install --repo-update
cd ..

# 3. If still failing, try
cd ios
pod cache clean --all
pod install --verbose
cd ..
```

### Build Issues

#### Issue: Metro bundler won't start
**Symptoms**: `npm start` hangs or fails

**Solutions**:
```bash
# 1. Reset Metro cache
npm start -- --reset-cache

# 2. Kill existing Metro processes
lsof -ti:8081 | xargs kill -9
npm start

# 3. Clean watchman cache
watchman watch-del-all
npm start
```

#### Issue: iOS build fails in Xcode
**Symptoms**: Build errors in Xcode

**Solutions**:
```bash
# 1. Clean build folder
# In Xcode: Product > Clean Build Folder (Cmd+Shift+K)

# 2. Clean derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# 3. Reinstall pods
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# 4. Check Xcode version (requires 12.0+)
xcodebuild -version
```

#### Issue: Android build fails
**Symptoms**: Gradle build errors

**Solutions**:
```bash
# 1. Clean gradle
cd android
./gradlew clean
cd ..

# 2. Clear gradle cache
cd android
./gradlew cleanBuildCache
rm -rf .gradle
cd ..

# 3. Invalidate caches in Android Studio
# File > Invalidate Caches / Restart

# 4. Check Java version (requires JDK 11)
java -version
```

### Runtime Issues

#### Issue: App crashes on launch
**Symptoms**: White screen or immediate crash

**Solutions**:
```bash
# 1. Ensure dependencies are installed
npm install
cd ios && pod install && cd ..

# 2. Reset Metro cache
npm start -- --reset-cache

# 3. Rebuild app
# iOS: npm run ios
# Android: npm run android

# 4. Check logs
# iOS: Open Xcode and check console
# Android: adb logcat
```

#### Issue: "Unable to resolve module" error
**Symptoms**: Metro bundler can't find modules

**Solutions**:
```bash
# 1. Clear Metro cache
npm start -- --reset-cache

# 2. Reinstall dependencies
rm -rf node_modules
npm install

# 3. Clear watchman
watchman watch-del-all

# 4. Restart packager
npm start
```

#### Issue: Gestures not working
**Symptoms**: Swipes don't move tiles

**Solutions**:
1. Ensure `react-native-gesture-handler` is properly installed
2. Check that `GestureHandlerRootView` wraps the app in App.tsx
3. For iOS: Check if pods are installed
4. For Android: Check if native dependencies are linked

```bash
# Reinstall gesture handler
npm install react-native-gesture-handler
cd ios && pod install && cd ..
```

#### Issue: Animations are choppy
**Symptoms**: Low FPS, laggy animations

**Solutions**:
1. Enable Hermes (already enabled in package.json)
2. Use release build for testing performance
3. Check device performance capabilities
4. Reduce number of concurrent animations

```bash
# Run in release mode
# iOS:
npx react-native run-ios --configuration Release

# Android:
cd android
./gradlew installRelease
cd ..
```

### TypeScript Issues

#### Issue: TypeScript errors
**Symptoms**: Red squiggly lines, build errors

**Solutions**:
```bash
# 1. Check TypeScript version
npm list typescript

# 2. Run type checking
npm run type-check

# 3. Rebuild TypeScript
npx tsc --build --clean
npx tsc --build

# 4. Restart TypeScript server (VS Code)
# Cmd+Shift+P > "TypeScript: Restart TS Server"
```

### AdMob Issues

#### Issue: AdMob not initializing
**Symptoms**: Ads not loading

**Solutions**:
1. Check AdMob App ID in Info.plist (iOS)
2. Check AdMob App ID in AndroidManifest.xml (Android)
3. Verify Ad Unit IDs in .env file
4. Use test Ad Unit IDs for testing
5. Check internet connection

```typescript
// Initialize AdMob (add to App.tsx if needed)
import mobileAds from 'react-native-google-mobile-ads';

useEffect(() => {
  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      console.log('AdMob initialized:', adapterStatuses);
    });
}, []);
```

#### Issue: Test ads not showing
**Symptoms**: Blank ad space

**Solutions**:
1. Ensure using test Ad Unit IDs from .env.example
2. Wait a few seconds for ads to load
3. Check console for error messages
4. Verify internet connection
5. Try on real device (not simulator)

### Storage Issues

#### Issue: Best score not persisting
**Symptoms**: Score resets on app restart

**Solutions**:
1. Check AsyncStorage is properly initialized
2. Verify permissions (Android)
3. Check console for storage errors

```bash
# Clear AsyncStorage (for testing)
# iOS:
xcrun simctl get_app_container booted com.prabdev.rn2048 data

# Android:
adb shell run-as com.prabdev.rn2048
cd /data/data/com.prabdev.rn2048/databases
rm -rf *
```

### Theme Issues

#### Issue: Theme not persisting
**Symptoms**: Theme resets to Classic

**Solutions**:
1. Check ThemeRepository implementation
2. Verify AsyncStorage is working
3. Check console for errors

```typescript
// Test theme persistence manually
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save theme
await AsyncStorage.setItem('@2048:theme', 'dark');

// Load theme
const theme = await AsyncStorage.getItem('@2048:theme');
console.log('Saved theme:', theme);
```

## Platform-Specific Issues

### iOS Specific

#### Issue: Xcode command line tools not found
```bash
# Install Xcode command line tools
xcode-select --install

# Set path
sudo xcode-select --switch /Applications/Xcode.app
```

#### Issue: Signing issues
**Solution**: Configure signing in Xcode
1. Open ios/ReactNative2048.xcworkspace
2. Select project > Signing & Capabilities
3. Select your team
4. Enable "Automatically manage signing"

#### Issue: Simulator not found
```bash
# List available simulators
xcrun simctl list devices

# Boot specific simulator
xcrun simctl boot "iPhone 14"

# Run app on specific simulator
npx react-native run-ios --simulator="iPhone 14"
```

### Android Specific

#### Issue: ANDROID_HOME not set
```bash
# Add to ~/.bash_profile or ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Reload shell
source ~/.bash_profile  # or source ~/.zshrc
```

#### Issue: Emulator not starting
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd Pixel_4_API_30

# Or create new AVD in Android Studio:
# Tools > AVD Manager > Create Virtual Device
```

#### Issue: Build fails with "Unsupported class file major version"
**Solution**: Update Java version
```bash
# Check Java version (requires JDK 11)
java -version

# Install JDK 11
# macOS: brew install openjdk@11
# Windows: Download from Oracle or adopt OpenJDK
```

## Performance Optimization

### Tips for Better Performance

1. **Enable Hermes** (already enabled):
   - Faster startup time
   - Lower memory usage
   - Better performance

2. **Use Release Build for Testing**:
   ```bash
   # iOS
   npx react-native run-ios --configuration Release
   
   # Android
   cd android && ./gradlew installRelease && cd ..
   ```

3. **Optimize Images**:
   - Use appropriate image sizes
   - Compress images
   - Use WebP format

4. **Reduce Re-renders**:
   - Use React.memo
   - Optimize useEffect dependencies
   - Use useCallback and useMemo

5. **Profile Performance**:
   - Use React DevTools Profiler
   - Monitor using Xcode Instruments (iOS)
   - Use Android Profiler (Android)

## Getting Help

### Before Asking for Help

1. ✅ Check this troubleshooting guide
2. ✅ Search GitHub issues
3. ✅ Check console logs
4. ✅ Try cleaning and rebuilding
5. ✅ Verify all dependencies installed

### Where to Get Help

- **GitHub Issues**: [prabdev01/2048/issues](https://github.com/prabdev01/2048/issues)
- **React Native Docs**: https://reactnative.dev/
- **Stack Overflow**: Tag with `react-native`
- **React Native Community**: https://www.reactnative.dev/community/overview

### When Reporting Issues

Include:
1. **Error message** (full stack trace)
2. **Platform** (iOS/Android)
3. **OS version**
4. **Node version** (`node --version`)
5. **React Native version**
6. **Steps to reproduce**
7. **Expected vs actual behavior**

## FAQ

**Q: Why is the app slow in debug mode?**
A: Debug mode includes development tools. Use release build for performance testing.

**Q: Can I use this in production?**
A: Yes! The core game is production-ready. Add AdMob UI components if needed.

**Q: How do I add more themes?**
A: Edit `src/core/constants/ColorSchemes.ts` and add your theme to the Themes array.

**Q: How do I change the grid size?**
A: Modify `GRID_SIZE` in `src/core/constants/GameConstants.ts` (requires logic adjustments).

**Q: Is AdMob required?**
A: No, it's optional. The game works perfectly without ads.

**Q: Can I remove themes?**
A: Yes, remove from `ColorSchemes.ts` Themes array.

**Q: How do I change the app name?**
A: Update in `app.json`, Info.plist (iOS), and strings.xml (Android).

**Q: Can I deploy to web?**
A: Possible with react-native-web but requires additional setup.

---

**Still having issues?** Open an issue on GitHub with detailed information!
