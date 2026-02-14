# Android APK Build Guide

This guide will help you build an Android APK for the 2048 React Native game.

## Prerequisites

Before building the APK, ensure you have the following installed:

1. **Node.js** (>= 18)
2. **Java Development Kit (JDK)** 17 or higher
3. **Android SDK** (optional for building, required for running on device)

## Quick Start - Build APK

### Option 1: Using npm scripts (Recommended)

```bash
# Install dependencies first
npm install

# Build Release APK (optimized, smaller size)
npm run android:build

# OR Build Debug APK (larger, includes debugging symbols)
npm run android:build-debug
```

### Option 2: Using Gradle directly

```bash
cd android

# Build Release APK
./gradlew assembleRelease

# Build Debug APK
./gradlew assembleDebug

# Clean build files
./gradlew clean
```

## APK Output Locations

After successful build, find your APK files at:

**Release APK:**
```
android/app/build/outputs/apk/release/app-release.apk
```

**Debug APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Build Types Explained

### Debug APK
- **Purpose:** Testing and development
- **Size:** Larger (~30-50MB)
- **Performance:** Slightly slower
- **Signing:** Signed with debug keystore (pre-configured)
- **Usage:** Install directly on any Android device for testing

### Release APK
- **Purpose:** Production distribution
- **Size:** Smaller (~20-35MB)
- **Performance:** Optimized
- **Signing:** Currently signed with debug key (see below for production signing)
- **Minification:** ProGuard enabled (code shrinking)

## Installation on Android Device

### Method 1: ADB (Android Debug Bridge)

```bash
# Make sure device is connected via USB with USB debugging enabled
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Method 2: Direct Transfer

1. Copy the APK file to your device
2. Open the APK file on your device
3. Allow "Install from Unknown Sources" if prompted
4. Install the app

## Production Signing (Optional)

For production release on Google Play Store, you need to sign with a production keystore.

### Step 1: Generate a Keystore

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

You'll be prompted for:
- Keystore password
- Key password
- Your name, organization, etc.

### Step 2: Configure Gradle

Edit `android/gradle.properties` and add:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your-keystore-password
MYAPP_RELEASE_KEY_PASSWORD=your-key-password
```

### Step 3: Update build.gradle

Edit `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            ...
        }
    }
}
```

### Step 4: Build Signed APK

```bash
npm run android:build
```

## Troubleshooting

### Build Fails with "SDK not found"

If you get Android SDK errors but only want to build (not run), the build should still work with JDK alone. If issues persist:

```bash
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Android/Sdk  # Linux/Mac
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk  # Windows
```

### "Execution failed for task ':app:packageRelease'"

Try cleaning and rebuilding:

```bash
npm run android:clean
npm run android:build
```

### Out of Memory Error

Edit `android/gradle.properties` and add:

```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

### Permission Denied on gradlew

Make the script executable:

```bash
chmod +x android/gradlew
```

## APK Size Optimization

The current build already includes:
- ✅ ProGuard minification
- ✅ Code shrinking
- ✅ Resource shrinking

To further reduce size:

1. **Enable R8**: Already enabled by default
2. **Use App Bundles**: For Play Store, build AAB instead of APK:
   ```bash
   cd android && ./gradlew bundleRelease
   ```
   Output: `android/app/build/outputs/bundle/release/app-release.aab`

3. **Split APKs by ABI**: Edit `android/app/build.gradle`:
   ```gradle
   splits {
       abi {
           enable true
           reset()
           include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
           universalApk false
       }
   }
   ```

## Verification

After building, verify your APK:

```bash
# Check APK size
ls -lh android/app/build/outputs/apk/release/app-release.apk

# Analyze APK contents
unzip -l android/app/build/outputs/apk/release/app-release.apk | head -20
```

## App Information

- **Package Name:** `com.prabdev.rn2048`
- **App Name:** 2048
- **Min SDK:** Android 6.0 (API 23)
- **Target SDK:** Android 14 (API 34)
- **Version Code:** 1
- **Version Name:** 1.0

## Next Steps

1. **Test the APK** on multiple Android devices
2. **Check app performance** and functionality
3. **Update version** in `android/app/build.gradle` for new releases
4. **Submit to Play Store** (requires production signing)

## Support

For issues:
- Check the [React Native documentation](https://reactnative.dev/docs/signed-apk-android)
- Review Android build logs in `android/app/build/`
- Ensure all dependencies are installed: `npm install`

---

**Quick Reference:**

```bash
# One-command build
npm install && npm run android:build

# Find APK
ls android/app/build/outputs/apk/release/
```
